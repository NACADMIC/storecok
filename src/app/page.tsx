import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Megaphone,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOptionalUser } from "@/lib/auth";

const features = [
  {
    icon: MessageSquareText,
    title: "리뷰 진단",
    description: "리뷰에서 반복되는 불만과 답글 흐름을 보고 먼저 손볼 부분을 짚어드립니다.",
  },
  {
    icon: ClipboardCheck,
    title: "메뉴 진단",
    description: "객단가와 재주문 흐름을 기준으로 메뉴 구성에서 약한 지점을 정리해드립니다.",
  },
  {
    icon: Megaphone,
    title: "홍보 진단",
    description:
      "배달앱, SNS, 전단 문구를 매장 상황에 맞게 정리해 여기서 바로 실행할 수 있게 돕습니다.",
  },
];

const miniStats = [
  { label: "긴급 진단", value: "3분" },
  { label: "진단 기준", value: "매장 상황 중심" },
  { label: "프리미엄 보고서", value: "2영업일 내" },
];

const outputPreview = [
  "가장 먼저 고쳐야 할 문제 3가지",
  "지금 바로 할 해결책",
  "리뷰 관리 + 리뷰 답글 달기",
  "매장 상황별 운영 매뉴얼",
  "배달 상황별 운영 매뉴얼",
  "셀프 마케팅/홍보 방법",
  "7일 실행 플랜",
  "프리미엄 진단보고서(결제 시 2영업일 내)",
];

const reasons = [
  {
    title: "우선순위를 먼저 확인",
    description:
      "긴 분석보다, 지금 당장 무엇부터 바꿔야 하는지 먼저 보여드립니다.",
  },
  {
    title: "어려운 용어 없이 쉽게 설명",
    description: "마케팅 용어보다, 오늘 무엇을 바꾸면 되는지 중심으로 알려드립니다.",
  },
  {
    title: "바로 붙여 넣어 쓸 수 있는 홍보 문구",
    description:
      "리뷰 답글, 배달앱 소개글, SNS 문구, 전단 문구까지 바로 사용할 수 있게 제공합니다.",
  },
  {
    title: "상황별 매뉴얼까지 한 번에",
    description:
      "매장 상황별 매뉴얼, 배달 상황별 매뉴얼, 셀프 마케팅 실행 순서까지 한 번에 정리해드립니다.",
  },
];

export default async function Home() {
  const user = await getOptionalUser();
  const primaryHref = user ? "/diagnosis/new" : "/login";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:gap-10 lg:py-12">
      <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <Card className="paper-panel border-[#d8cab8] bg-[#fffaf4]">
          <CardContent className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-white">사장님용 진단 + 해결책</Badge>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="size-3.5" />
                AI + 전문가 관점
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h1 className="max-w-[15ch] text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-[3rem] lg:text-[3.55rem]">
                <span className="block">매장 고민,</span>
                <span className="block whitespace-nowrap">감으로 버티지 말고</span>
                <span className="mt-1 block">
                  <span className="inline-block rounded-full bg-[#fff2a8] px-3 py-1 align-middle text-[0.56em] sm:px-4">
                    3분 만에
                  </span>
                  <span className="ml-2">진단하세요</span>
                </span>
              </h1>
              <div className="flex items-center gap-4 sm:flex-nowrap">
                <img
                  src="/logo2.png"
                  alt="매장콕"
                  className="h-auto w-full max-w-[150px] shrink-0 object-contain sm:max-w-[180px] lg:max-w-[210px]"
                />
                <div className="hidden h-px flex-1 bg-[#e4d9cc] sm:block" />
              </div>
            </div>

            <p className="mt-5 max-w-[34rem] text-sm leading-7 text-[#5f574e] sm:text-base sm:leading-8 lg:text-lg">
              리뷰가 문제인지, 메뉴가 약한지, 홍보 문구가 부족한지
              <br className="hidden sm:block" />
              매장 상황을 기준으로 먼저 손봐야 할 일과 맞춤형 전략, 마케팅, 홍보 방법을 정리해드립니다.
            </p>
            <p className="mt-3 max-w-[34rem] text-sm leading-7 text-[#5f574e] sm:text-base sm:leading-8">
              매장콕에서 홍보 방법을 실제로 바로 안내하고, 사장님이 직접 실행할 수 있게 정리해드립니다.
            </p>
            <p className="mt-3 max-w-[34rem] text-sm leading-7 text-[#5f574e] sm:text-base sm:leading-8">
              리뷰관리, 리뷰 답글 달기, 매장 상황별 매뉴얼, 배달 상황별 매뉴얼, 셀프
              마케팅 홍보 방법까지 매장콕에서 함께 지원합니다.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={primaryHref}>
                  무료 진단 시작하기
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/demo-report">결과 예시 보기</Link>
              </Button>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#5f574e]">
              긴급 진단은 3분 안에 확인할 수 있고, 프리미엄 결제 시 2영업일 내
              프리미엄 진단보고서를 받아보실 수 있습니다.
            </p>

            <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-3">
              {miniStats.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[112px] h-full flex-col justify-between rounded-[22px] border border-[#e4d9cc] bg-white px-4 py-4"
                >
                  <div className="text-xs font-semibold tracking-[0.08em] text-[#8a7a69]">
                    {item.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card className="bg-slate-950 text-white xl:min-h-[320px]">
            <CardContent className="px-5 py-6 sm:px-7 sm:py-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-[22rem]">
                  <div className="text-xs font-semibold tracking-[0.08em] text-white/55">
                    진단 예시
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    매장 상태를 한눈에 보고, 해결책까지 바로 실행할 수 있게 정리합니다
                  </h2>
                </div>
                <div className="w-fit rounded-[22px] bg-white/8 px-4 py-3 text-right">
                  <div className="text-[11px] font-semibold tracking-[0.08em] text-white/55">
                    매장 점수
                  </div>
                  <div className="mt-1 text-3xl font-semibold text-[#fff2a8]">78</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4">
                  <div className="text-sm font-semibold text-white">가장 큰 문제</div>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    리뷰 답글이 늦고, 신규 방문자에게 보이는 첫인상 관리가 약합니다.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4">
                  <div className="text-sm font-semibold text-white">우선 실행안</div>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    답글 템플릿 3종 정리, 저녁 세트 메뉴 재구성, 인스타 문구 교체부터
                    시작합니다.
                  </p>
                </div>
              </div>
              <Button asChild variant="secondary" className="mt-6 w-full sm:w-auto">
                <Link href="/demo-report">결과 예시 보기</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="xl:min-h-[240px]">
            <CardContent className="px-5 py-6 sm:px-7 sm:py-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <BadgeCheck className="size-4 text-brand-600" />
                진단 후 이런 내용을 받습니다
              </div>
              <div className="mt-5 grid gap-3">
                {outputPreview.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-[20px] border border-border bg-white px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-900">{item}</span>
                    <ArrowRight className="size-4 text-[#a29384]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex min-h-[232px] h-full flex-col bg-white/96">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-border bg-[#fff2a8] text-slate-950">
                <feature.icon className="size-5" />
              </div>
              <CardTitle className="mt-4 text-xl font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1">
              <p className="text-sm leading-7 text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid items-start gap-5 lg:grid-cols-2">
        <Card className="self-start bg-slate-950 text-white">
          <CardHeader>
            <Badge className="w-fit border-white/15 bg-white/8 text-white">
              신뢰 기준
            </Badge>
            <CardTitle className="text-2xl font-semibold text-white">
              AI와 전문가 관점으로 분석하고, 실제 장사 기준으로 정리합니다
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-white/70">
            <p>
              매장콕은 단순한 마케팅 문구 생성기가 아닙니다.
            </p>
            <p>
              리뷰, 메뉴, 홍보 상황을 함께 보고
              <br />
              사장님이 오늘 직접 실행할 해결책과 맞춤형 전략, 마케팅, 홍보 방법을 순서대로 제안합니다.
            </p>
            <p>
              리뷰관리, 리뷰 답글 달기, 매장/배달 상황별 매뉴얼, 셀프 마케팅 홍보 방법까지
              <br />
              사장님이 직접 운영할 수 있게 단계별로 안내합니다.
            </p>
            <p>
              매장콕 안에서 셀프 마케팅을 바로 돌릴 수 있게
              <br />
              문구, 실행 순서, 운영 기준을 현실적으로 정리해드립니다.
            </p>
            <div className="grid gap-2 pt-1 sm:grid-cols-3">
              <Badge className="justify-center border-white/15 bg-white/8 text-white">리뷰</Badge>
              <Badge className="justify-center border-white/15 bg-white/8 text-white">메뉴</Badge>
              <Badge className="justify-center border-white/15 bg-white/8 text-white">홍보</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="paper-panel border-[#d8cab8] bg-[#fffaf4]">
          <CardHeader>
            <Badge className="w-fit bg-white">왜 쓰는지 바로 보이게</Badge>
            <CardTitle className="text-2xl font-semibold">
              읽고 끝나는 리포트가 아니라, 바로 실행할 개선안
            </CardTitle>
          </CardHeader>
          <CardContent className="grid auto-rows-fr gap-4 md:grid-cols-2">
            {reasons.map((reason) => (
              <ReasonItem
                key={reason.title}
                title={reason.title}
                description={reason.description}
              />
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function ReasonItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[164px] h-full flex-col rounded-[22px] border border-[#e4d9cc] bg-white px-5 py-5">
      <div className="text-base font-semibold text-slate-950">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
