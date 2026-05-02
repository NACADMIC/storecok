import { diagnosisReportSchema } from "@/lib/diagnosis-schema";
import type { DashboardDiagnosisCard, DiagnosisDetail, DiagnosisFormValues } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

type DiagnosisRow = {
  id: string;
  store_id: string;
  overall_score: number;
  created_at: string;
  input_data: DiagnosisFormValues;
  ai_result: unknown;
};

type StoreRow = {
  id: string;
  store_name: string;
  category: string;
  location: string;
  main_menu: string;
  average_order_price: string;
  delivery_apps: string;
};

async function getStoresByIds(storeIds: string[]) {
  if (storeIds.length === 0) {
    return new Map<string, StoreRow>();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stores")
    .select(
      "id, store_name, category, location, main_menu, average_order_price, delivery_apps",
    )
    .in("id", storeIds);

  if (error) {
    throw new Error("매장 정보를 불러오지 못했습니다.");
  }

  return new Map((data as StoreRow[]).map((store) => [store.id, store]));
}

export async function getDashboardDiagnoses(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("diagnoses")
    .select("id, store_id, overall_score, created_at, ai_result")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("진단 목록을 불러오지 못했습니다.");
  }

  const rows = (data ?? []) as Array<Omit<DiagnosisRow, "input_data">>;
  const stores = await getStoresByIds(rows.map((row) => row.store_id));

  return rows.reduce<DashboardDiagnosisCard[]>((acc, row) => {
    const store = stores.get(row.store_id);
    const parsed = diagnosisReportSchema.safeParse(row.ai_result);

    if (!store || !parsed.success) {
      return acc;
    }

    acc.push({
      id: row.id,
      storeId: row.store_id,
      storeName: store.store_name,
      category: store.category,
      location: store.location,
      overallScore: row.overall_score,
      summary: parsed.data.overallSummary,
      createdAt: row.created_at,
    });

    return acc;
  }, []);
}

export async function getDiagnosisDetail(id: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("diagnoses")
    .select("id, store_id, input_data, ai_result, created_at")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("진단 상세를 불러오지 못했습니다.");
  }

  if (!data) {
    return null;
  }

  const diagnosis = data as Pick<
    DiagnosisRow,
    "id" | "store_id" | "input_data" | "ai_result" | "created_at"
  >;

  const stores = await getStoresByIds([diagnosis.store_id]);
  const store = stores.get(diagnosis.store_id);
  const report = diagnosisReportSchema.safeParse(diagnosis.ai_result);

  if (!store || !report.success) {
    return null;
  }

  return {
    id: diagnosis.id,
    createdAt: diagnosis.created_at,
    inputData: diagnosis.input_data,
    report: report.data,
    store: {
      id: store.id,
      storeName: store.store_name,
      category: store.category,
      location: store.location,
      mainMenu: store.main_menu,
      averageOrderPrice: store.average_order_price,
      deliveryApps: store.delivery_apps,
    },
  } satisfies DiagnosisDetail;
}
