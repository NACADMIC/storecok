import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const planItems = [
  "매장별 진단 리포트 무제한 생성",
  "리뷰 답글 예시와 홍보 문구 전체 열람",
  "7일 실행 플랜과 우선순위 개선안 저장",
  "지난 리포트 다시 보기",
];

export default function PricingPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Card className="paper-panel border-[#d8cab8] bg-[#fffaf4]">
        <CardContent className="px-6 py-8 sm:px-8 sm:py-10">
          <Badge>구독 안내</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            보고서 전체를 보려면 구독으로 이어가시면 됩니다
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            데모에서 가려진 실행안, 답글 예시, 홍보 문구, 7일 플랜까지 구독 후 바로
            열람할 수 있게 구성했습니다.
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-slate-950 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <CardTitle className="text-2xl text-white">매장콕 Pro</CardTitle>
              <p className="mt-2 text-sm leading-6 text-white/72">
                혼자 고민하던 운영 문제를 리포트로 정리해서 바로 실행하는 플랜
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">월 구독</div>
              <div className="mt-1 text-3xl font-semibold text-[#fff2a8]">39,000원</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-3">
            {planItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[20px] border border-border bg-white px-4 py-4">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff2a8] text-slate-950">
                  <Check className="size-4" />
                </div>
                <p className="text-sm leading-6 text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[220px]">
            <Button asChild size="lg">
              <Link href="/login">구독하고 시작하기</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/demo-report">데모 다시 보기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
