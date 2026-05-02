import { redirect } from "next/navigation";

import { signInAction, signUpAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOptionalUser } from "@/lib/auth";
import { hasSupabaseEnv } from "@/lib/env";

export default async function LoginPage() {
  const user = await getOptionalUser();
  const isSupabaseConfigured = hasSupabaseEnv();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="paper-panel border-[#d8cab8] bg-[#fffaf4]">
          <CardHeader>
            <div className="inline-flex w-fit rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
              사장님 전용 진단 시작
            </div>
            <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
              사장님 고민부터 정리해볼까요?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-sm leading-7 text-muted-foreground">
            <p>
              한 번 진단해두면 나중에 다시 꺼내보고, 뭐가 문제였고 뭘 바꿨는지 흐름을
              계속 쌓아갈 수 있습니다.
            </p>
            <div className="rounded-[22px] border border-[#e4d9cc] bg-white px-5 py-5">
              <div className="font-semibold text-foreground">들어오시면 바로 할 수 있는 일</div>
              <ul className="mt-3 space-y-2">
                <li>매장 고민 진단</li>
                <li>결과 저장하고 다시 보기</li>
                <li>리뷰, 메뉴, 홍보 실행안 받기</li>
              </ul>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[#e4d9cc] bg-white px-5 py-4">
                <div className="text-xs font-semibold tracking-[0.14em] text-[#8a7a69]">
                  기록 관리
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-950">진단 결과 모아보기</div>
              </div>
              <div className="rounded-[22px] border border-[#e4d9cc] bg-white px-5 py-4">
                <div className="text-xs font-semibold tracking-[0.14em] text-[#8a7a69]">
                  바로 실행
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-950">답글과 홍보 문구 받기</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <AuthForm
            title="로그인"
            description="기존 계정이 있으면 바로 이어서 보시면 됩니다."
            submitLabel="로그인"
            action={signInAction}
            disabled={!isSupabaseConfigured}
            disabledMessage="지금은 화면만 먼저 보실 수 있습니다. 로그인 연결은 곧 열립니다."
          />
          <AuthForm
            title="회원가입"
            description="처음이면 계정부터 만들고 바로 시작하시면 됩니다."
            submitLabel="회원가입"
            action={signUpAction}
            disabled={!isSupabaseConfigured}
            disabledMessage="지금은 화면만 먼저 보실 수 있습니다. 회원가입 연결은 곧 열립니다."
          />
        </div>
      </section>
    </main>
  );
}
