import Link from "next/link";

import { signOutAction } from "@/app/actions/auth";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { getOptionalUser } from "@/lib/auth";

export async function SiteHeader() {
  const user = await getOptionalUser();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0 shrink">
          <BrandLogo />
        </Link>

        <div className="ml-3 flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/dashboard">대시보드</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/diagnosis/new">새 진단</Link>
              </Button>
              <form action={signOutAction}>
                <Button variant="secondary" size="sm" type="submit">
                  로그아웃
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/login">무료 진단 시작하기</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
