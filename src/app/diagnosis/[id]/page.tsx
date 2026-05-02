import Link from "next/link";
import { notFound } from "next/navigation";

import { ReportView } from "@/components/diagnosis/report-view";
import { Button } from "@/components/ui/button";
import { getRequiredUser } from "@/lib/auth";
import { getDiagnosisDetail } from "@/lib/queries";

export default async function DiagnosisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getRequiredUser();
  const detail = await getDiagnosisDetail(id, user.id);

  if (!detail) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI 진단 리포트 상세</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            저장된 리포트를 다시 확인하고 바로 실행에 옮기세요.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="secondary">
            <Link href="/dashboard">대시보드</Link>
          </Button>
          <Button asChild>
            <Link href="/diagnosis/new">새 진단</Link>
          </Button>
        </div>
      </div>

      <ReportView detail={detail} />
    </main>
  );
}
