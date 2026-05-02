import { Skeleton } from "@/components/ui/skeleton";

export default function NewDiagnosisLoading() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-[820px] w-full" />
    </main>
  );
}
