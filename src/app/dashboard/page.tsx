import Link from "next/link";

import { ReportCard } from "@/components/dashboard/report-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { getDashboardDiagnoses } from "@/lib/queries";

export default async function DashboardPage() {
  const user = await getRequiredUser();
  const diagnoses = await getDashboardDiagnoses(user.id);

  const averageScore = diagnoses.length
    ? Math.round(
        diagnoses.reduce((sum, diagnosis) => sum + diagnosis.overallScore, 0) /
          diagnoses.length,
      )
    : 0;

  const latestCreatedAt = diagnoses[0]?.createdAt;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardContent className="px-6 py-8 sm:px-8 sm:py-10">
            <Badge>내 대시보드</Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {user.email?.split("@")[0] ?? "사장님"}님의 진단 기록
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              지난 진단 내용을 다시 보고, 어떤 문제부터 손봐야 할지 빠르게 확인할 수
              있습니다.
            </p>
            <div className="mt-7">
              <Button asChild size="lg">
                <Link href="/diagnosis/new">새 진단 시작하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <StatCard label="누적 리포트" value={`${diagnoses.length}개`} />
          <StatCard label="평균 점수" value={`${averageScore}점`} />
          <StatCard
            label="최근 생성일"
            value={latestCreatedAt ? formatDate(latestCreatedAt) : "아직 없음"}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">최근 생성된 리포트</h2>
          {diagnoses.length ? (
            <p className="text-sm text-muted-foreground">최근에 만든 순서대로 보여드립니다.</p>
          ) : null}
        </div>

        {diagnoses.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {diagnoses.map((diagnosis) => (
              <ReportCard key={diagnosis.id} diagnosis={diagnosis} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="px-6 py-10 text-center sm:px-8">
              <h3 className="text-xl font-semibold">아직 만든 진단이 없습니다.</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                매장 정보와 고민을 적어주시면 리뷰, 메뉴, 홍보 쪽에서 뭘 먼저 손봐야
                하는지 바로 정리해드립니다.
              </p>
              <Button asChild className="mt-6">
                <Link href="/diagnosis/new">진단 시작하기</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
}
