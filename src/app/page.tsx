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
    description: "반복 불만, 답글 톤, 평점에 영향을 주는 포인트를 먼저 정리합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "메뉴 진단",
    description: "객단가를 올릴 메뉴 조합과 약한 메뉴 보완 아이디어를 제안합니다.",
  },
  {
    icon: Megaphone,
    title: "홍보 진단",
    description: "SNS, 전단, 배달앱 문구까지 바로 올릴 수 있게 뽑아드립니다.",
  },
];

const miniStats = [
  { label: "입력 시간", value: "3분" },
  { label: "진단 방식", value: "맞춤 정리" },
  { label: "결과물", value: "7일 실행안" },
];

const outputPreview = [
  "가장 큰 문제 3개",
  "우선순위 개선안",
  "리뷰 답글 예시",
  "SNS/전단 홍보 문구",
  "7일 실행 플랜",
];

const reasons = [
  {
    title: "입력하면 바로 결과",
    description:
      "매장 상황과 고민만 적으면 지금 필요한 내용만 딱 뽑아서 정리해드립니다.",
  },
  {
    title: "사장님 말로 풀어줌",
    description: "어려운 말 말고, 오늘 뭘 해야 하는지 바로 읽히게 풀어서 써드립니다.",
  },
  {
    title: "복붙 가능한 결과물",
    description: "리뷰 답글, 홍보 문구, 실행안까지 바로 복붙해서 쓸 수 있게 드립니다.",
  },
  {
    title: "뭐부터 할지 먼저 정리",
    description:
      "내용만 길게 늘어놓지 않고, 뭘 먼저 바꿔야 매출과 리뷰에 도움이 되는지부터 짚어드립니다.",
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
              <Badge className="bg-white">사장님용 운영 진단</Badge>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="size-3.5" />
                실제 매장 기준으로
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h1 className="max-w-[13ch] text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-[3rem] lg:text-[3.55rem]">
                <span className="block">리뷰, 메뉴, 홍보</span>
                <span className="mt-1 block">
                  매출 고민을
                  <span className="ml-2 inline-block rounded-full bg-[#fff2a8] px-3 py-1 align-middle text-[0.56em] sm:px-4">
                    한 번에
                  </span>
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
              매장콕은 AI 분석에 현장 운영 감각을 더해
              <br className="hidden sm:block" />
              지금 뭘 먼저 손봐야 하는지 바로 보이게 정리해드립니다.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={primaryHref}>
                  무료 진단 시작하기
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/demo-report">데모 리포트 보기</Link>
              </Button>
            </div>

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
                    이런 식으로 정리해드립니다
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
                <Link href="/demo-report">데모 리포트 열어보기</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="xl:min-h-[240px]">
            <CardContent className="px-5 py-6 sm:px-7 sm:py-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <BadgeCheck className="size-4 text-brand-600" />
                리포트 포함 항목
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
              이렇게 도와드립니다
            </Badge>
            <CardTitle className="text-2xl font-semibold text-white">
              말만 많은 리포트 말고
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-white/70">
            <p>
              매장콕은 AI로 빠르게 정리하되, 실제 장사에서 통하는 기준을 같이 담아서
              지금 손대야 할 문제부터 먼저 보여드립니다.
            </p>
            <p>
              리뷰 답글 예시, 메뉴 보완안, SNS 문구, 전단 문구, 7일 실행 플랜까지
              바로 써먹을 수 있게 한 번에 정리해드립니다.
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
            <CardTitle className="text-2xl font-semibold">보고 끝나는 게 아니라</CardTitle>
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
