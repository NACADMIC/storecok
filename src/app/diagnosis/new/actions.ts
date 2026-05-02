"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { hasOpenAIEnv, hasSupabaseEnv } from "@/lib/env";
import { generateDiagnosisReport } from "@/lib/openai";
import type { ActionState, DiagnosisFormValues } from "@/lib/types";
import { getRequiredUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function getValue(formData: FormData, key: keyof DiagnosisFormValues) {
  return formData.get(key)?.toString().trim() ?? "";
}

function getListValue(formData: FormData, key: keyof DiagnosisFormValues) {
  return (
    formData
      .get(key)
      ?.toString()
      .split("||")
      .map((item) => item.trim())
      .filter(Boolean) ?? []
  );
}

function parseDiagnosisForm(formData: FormData): DiagnosisFormValues {
  return {
    storeName: getValue(formData, "storeName"),
    category: getValue(formData, "category"),
    location: getValue(formData, "location"),
    mainMenu: getValue(formData, "mainMenu"),
    averageOrderPrice: getValue(formData, "averageOrderPrice"),
    diagnosisType: getValue(formData, "diagnosisType"),
    operationMode: getValue(formData, "operationMode"),
    reportStyle: getValue(formData, "reportStyle"),
    priorityAreas: getListValue(formData, "priorityAreas"),
    usesDeliveryApps: getValue(formData, "usesDeliveryApps"),
    deliveryApps: getValue(formData, "deliveryApps"),
    reviewIssues: getValue(formData, "reviewIssues"),
    salesConcerns: getValue(formData, "salesConcerns"),
    marketingConcerns: getValue(formData, "marketingConcerns"),
    ownerGoal: getValue(formData, "ownerGoal"),
    extraNotes: getValue(formData, "extraNotes"),
  };
}

function validateInput(values: DiagnosisFormValues) {
  const requiredFields: Array<[keyof DiagnosisFormValues, string]> = [
    ["storeName", "매장명"],
    ["category", "업종"],
    ["location", "지역"],
    ["mainMenu", "주요 메뉴"],
    ["averageOrderPrice", "평균 객단가"],
    ["diagnosisType", "진단 방식"],
    ["operationMode", "운영 형태"],
    ["reportStyle", "원하는 결과 톤"],
    ["usesDeliveryApps", "배달앱 사용 여부"],
    ["reviewIssues", "최근 리뷰 문제"],
    ["salesConcerns", "매출 고민"],
    ["marketingConcerns", "홍보 고민"],
    ["ownerGoal", "사장님의 목표"],
  ];

  for (const [field, label] of requiredFields) {
    if (!values[field]) {
      return `${label}을 입력해 주세요.`;
    }
  }

  if (!values.priorityAreas?.length) {
    return "지금 가장 급한 문제를 한 개 이상 골라 주세요.";
  }

  return null;
}

export async function createDiagnosisAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase 환경변수를 먼저 설정해 주세요." };
  }

  if (!hasOpenAIEnv()) {
    return { error: "OPENAI_API_KEY 환경변수를 먼저 설정해 주세요." };
  }

  const user = await getRequiredUser();
  const values = parseDiagnosisForm(formData);
  const validationError = validateInput(values);

  if (validationError) {
    return { error: validationError };
  }

  try {
    const report = await generateDiagnosisReport(values);
    const supabase = await createClient();

    const { data: store, error: storeError } = await supabase
      .from("stores")
      .insert({
        user_id: user.id,
        store_name: values.storeName,
        category: values.category,
        location: values.location,
        main_menu: values.mainMenu,
        average_order_price: values.averageOrderPrice,
        delivery_apps:
          values.usesDeliveryApps === "예" ? values.deliveryApps || "미입력" : "사용 안 함",
      })
      .select("id")
      .single();

    if (storeError || !store) {
      return { error: "매장 정보를 저장하지 못했습니다." };
    }

    const { data: diagnosis, error: diagnosisError } = await supabase
      .from("diagnoses")
      .insert({
        user_id: user.id,
        store_id: store.id,
        input_data: values,
        ai_result: report,
        overall_score: report.storeScore.score,
      })
      .select("id")
      .single();

    if (diagnosisError || !diagnosis) {
      return { error: "진단 리포트를 저장하지 못했습니다." };
    }

    revalidatePath("/dashboard");
    redirect(`/diagnosis/${diagnosis.id}`);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "AI 진단을 생성하는 중 문제가 발생했습니다.",
    };
  }
}
