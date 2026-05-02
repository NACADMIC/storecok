import { DiagnosisForm } from "@/components/diagnosis/diagnosis-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth";

export default async function NewDiagnosisPage() {
  await getRequiredUser();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Card className="paper-panel border-[#d8cab8] bg-[#fffaf4]">
        <CardContent className="px-6 py-8 sm:px-8 sm:py-10">
          <Badge>새 진단</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            카드로 고르고, 상황 적고, 바로 보고서 받기
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            막연하게 적는 방식이 아니라, 먼저 어떤 진단이 필요한지 고르고 시작합니다.
            지금 급한 문제를 짚어주시면 결과도 더 현실적으로 나옵니다.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <FlowCard
              title="1. 카드 선택"
              description="리뷰, 메뉴, 홍보, 매출 중 지금 급한 쪽을 먼저 고릅니다."
            />
            <FlowCard
              title="2. 상황 입력"
              description="매장 정보와 현재 문제를 적으면 진단 방향이 더 정확해집니다."
            />
            <FlowCard
              title="3. 보고서 생성"
              description="우선순위, 답글, 홍보 문구, 7일 실행안까지 한 번에 받습니다."
            />
          </div>
        </CardContent>
      </Card>

      <DiagnosisForm />
    </main>
  );
}

function FlowCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#e4d9cc] bg-white px-4 py-4">
      <div className="text-base font-semibold text-slate-950">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
