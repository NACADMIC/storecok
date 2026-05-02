"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-[28px] border border-border bg-card p-8 text-center shadow-xl">
          <p className="text-sm font-semibold text-brand-600">오류가 발생했습니다</p>
          <h2 className="mt-3 text-2xl font-bold">잠시 후 다시 시도해 주세요.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{error.message}</p>
          <Button className="mt-6" onClick={() => reset()}>
            다시 시도
          </Button>
        </div>
      </body>
    </html>
  );
}
