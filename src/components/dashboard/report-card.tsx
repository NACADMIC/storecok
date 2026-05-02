import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { DashboardDiagnosisCard } from "@/lib/types";

export function ReportCard({ diagnosis }: { diagnosis: DashboardDiagnosisCard }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{diagnosis.storeName}</CardTitle>
            <CardDescription className="mt-1">
              {diagnosis.category} · {diagnosis.location}
            </CardDescription>
          </div>
          <Badge>{diagnosis.overallScore}점</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {diagnosis.summary}
        </p>
        <div className="rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
          생성일 {formatDate(diagnosis.createdAt)}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/diagnosis/${diagnosis.id}`}>리포트 상세보기</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
