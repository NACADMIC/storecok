import { Skeleton } from "@/components/ui/skeleton";

export default function DiagnosisDetailLoading() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-80 w-full" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-56 w-full" />
      </div>
      <Skeleton className="h-64 w-full" />
    </main>
  );
}
