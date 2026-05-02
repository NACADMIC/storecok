import Link from "next/link";
import type { ReactNode } from "react";
import { Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { DiagnosisDetail } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ReportView({
  detail,
  preview = false,
}: {
  detail: DiagnosisDetail;
  preview?: boolean;
}) {
  const { report, store, inputData } = detail;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="gap-4 border-b border-border bg-muted/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <Badge className="w-fit">{preview ? "데모 리포트" : "AI 진단 완료"}</Badge>
              <CardTitle className="text-2xl font-semibold md:text-3xl">{store.storeName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {store.category} · {store.location} · 생성일 {formatDate(detail.createdAt)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white px-5 py-4 text-center">
              <div className="text-xs font-semibold text-muted-foreground">매장 점수</div>
              <div className="mt-1 text-3xl font-bold text-brand-600">
                {report.storeScore.score}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-xl border border-border bg-white px-5 py-5">
            <div className="mb-2 text-sm font-semibold text-muted-foreground">전체 요약</div>
            <p className="text-sm leading-7 text-foreground">{report.overallSummary}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted px-5 py-5">
            <div className="mb-2 text-sm font-semibold text-foreground">점수 판단 근거</div>
            <p className="text-sm leading-7 text-muted-foreground">{report.storeScore.reason}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>이번 보고서 요청 방식</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InfoItem label="진단 방식" value={inputData.diagnosisType || "종합 진단"} />
          <InfoItem label="운영 형태" value={inputData.operationMode || "미입력"} />
          <InfoItem label="원하는 결과 톤" value={inputData.reportStyle || "미입력"} />
          <div className="rounded-xl border border-border bg-white px-5 py-5">
            <div className="mb-2 text-sm font-semibold text-muted-foreground">우선순위로 고른 문제</div>
            <div className="flex flex-wrap gap-2">
              {inputData.priorityAreas?.length ? (
                inputData.priorityAreas.map((item) => <Badge key={item}>{item}</Badge>)
              ) : (
                <p className="text-sm leading-6 text-foreground">선택 정보 없음</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {report.topProblems.map((problem, index) => (
          <Card key={problem.title}>
            <CardHeader>
              <Badge className="w-fit">문제 {index + 1}</Badge>
              <CardTitle>{problem.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>{problem.reason}</p>
              <div className="rounded-xl border border-border bg-muted px-4 py-3 text-foreground">
                {problem.impact}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>우선순위별 개선안</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {report.prioritizedActions.map((action) => (
            <div
              key={`${action.priority}-${action.title}`}
              className="rounded-xl border border-border bg-white px-5 py-5"
            >
              <div className="mb-2 flex items-center gap-3">
                <Badge>{action.priority}</Badge>
                <h3 className="font-semibold">{action.title}</h3>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{action.action}</p>
              <p className="mt-3 text-sm font-medium text-brand-600">
                기대 효과: {action.expectedEffect}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <LockedSection preview={preview}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>리뷰 답글 예시</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.reviewReplyExamples.map((example) => (
                <div key={example.situation} className="rounded-xl border border-border bg-white px-5 py-5">
                  <div className="mb-2 text-sm font-semibold text-muted-foreground">
                    상황: {example.situation}
                  </div>
                  <p className="text-sm leading-7 text-foreground">{example.reply}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>메뉴 개선 아이디어</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.menuImprovementIdeas.map((idea) => (
                <div key={idea.idea} className="rounded-xl border border-border bg-white px-5 py-5">
                  <div className="mb-2 font-semibold">{idea.idea}</div>
                  <p className="text-sm leading-6 text-muted-foreground">{idea.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </LockedSection>

      <LockedSection preview={preview} overlayOffset="top-[18%]">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>SNS 홍보 문구</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {report.snsPromotionCopy.map((copy) => (
                <div key={copy} className="rounded-xl border border-border bg-white px-5 py-4 text-sm leading-6">
                  {copy}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>전단 홍보 문구</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {report.flyerPromotionCopy.map((copy) => (
                <div key={copy} className="rounded-xl border border-border bg-white px-5 py-4 text-sm leading-6">
                  {copy}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </LockedSection>

      <LockedSection preview={preview} overlayOffset="top-[16%]">
        <Card>
          <CardHeader>
            <CardTitle>7일 실행 플랜</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {report.sevenDayPlan.map((item) => (
              <div key={item.day} className="rounded-xl border border-border bg-white px-5 py-5">
                <div className="mb-2 text-sm font-semibold text-brand-600">{item.day}</div>
                <p className="text-sm leading-6 text-foreground">{item.task}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </LockedSection>

      <LockedSection preview={preview} overlayOffset="top-[14%]">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>입력한 매장 정보</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <InfoItem label="주요 메뉴" value={store.mainMenu} />
              <InfoItem label="평균 객단가" value={store.averageOrderPrice} />
              <InfoItem label="배달앱" value={store.deliveryApps} />
              <InfoItem label="사장님의 목표" value={inputData.ownerGoal} />
              <InfoItem label="리뷰 문제" value={inputData.reviewIssues} />
              <InfoItem label="매출 고민" value={inputData.salesConcerns} />
              <InfoItem label="홍보 고민" value={inputData.marketingConcerns} />
              <InfoItem label="기타 특이사항" value={inputData.extraNotes || "없음"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>주의사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {report.cautions.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-muted px-5 py-4 text-sm leading-6 text-foreground"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </LockedSection>
    </div>
  );
}

function LockedSection({
  children,
  preview,
  overlayOffset = "top-[12%]",
}: {
  children: ReactNode;
  preview: boolean;
  overlayOffset?: string;
}) {
  if (!preview) {
    return <>{children}</>;
  }

  return (
    <div className="relative overflow-hidden rounded-[32px]">
      <div className="pointer-events-none select-none blur-[3px] opacity-55">{children}</div>
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-b from-[#faf5ee]/10 via-[#faf5ee]/85 to-[#faf5ee] px-6 pb-6 pt-20",
          overlayOffset,
        )}
      >
        <Card className="w-full max-w-xl border-[#d8cab8] bg-white/95 shadow-[0_24px_50px_rgba(69,47,28,0.14)] backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
                <Lock className="size-5" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">뒤 내용은 구독 후 바로 열립니다</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-center">
            <p className="text-sm leading-7 text-muted-foreground">
              실제 리포트에서는 리뷰 답글 예시, 메뉴 개선안, 홍보 문구, 7일 실행 플랜,
              주의사항까지 이어서 확인할 수 있습니다.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild size="lg">
                <Link href="/pricing">구독하고 전체 보기</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">로그인하고 시작하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white px-5 py-5">
      <div className="mb-2 text-sm font-semibold text-muted-foreground">{label}</div>
      <p className="text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}
