import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-xl rounded-[32px] border border-border bg-card p-8 shadow-xl">
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">페이지를 찾을 수 없습니다.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          요청한 리포트가 없거나 접근 권한이 없습니다.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/dashboard">대시보드로 이동</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">홈으로 이동</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
