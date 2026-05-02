import Link from "next/link";

import { ReportView } from "@/components/diagnosis/report-view";
import { Button } from "@/components/ui/button";
import { demoDiagnosisDetail } from "@/lib/demo-report";

export default function DemoReportPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="flex flex-col gap-4 rounded-[32px] border border-[#d8cab8] bg-[#fffaf4] px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
            데모 리포트
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            실제 보고서는 이런 식으로 나옵니다
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            앞부분은 공개로 보여드리고, 뒤쪽 실행안은 잠금 처리했습니다. 전체 리포트를
            보시려면 구독 후 바로 확인하실 수 있습니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="secondary" size="lg">
            <Link href="/">홈으로</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/pricing">구독하고 전체 보기</Link>
          </Button>
        </div>
      </div>

      <ReportView detail={demoDiagnosisDetail} preview />
    </main>
  );
}
