"use client";

import { useActionState, useMemo, useState } from "react";
import type { ChangeEvent, ComponentType } from "react";
import {
  ArrowRight,
  Megaphone,
  MessageSquareText,
  ReceiptText,
  Store,
  Target,
} from "lucide-react";

import { createDiagnosisAction } from "@/app/diagnosis/new/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ActionState, DiagnosisFormValues } from "@/lib/types";
import { cn } from "@/lib/utils";

const initialState: ActionState = {};

const diagnosisTypes = [
  {
    value: "종합 진단",
    title: "종합 진단",
    description: "리뷰, 메뉴, 홍보, 매출 흐름까지 한 번에 봅니다.",
    icon: Store,
  },
  {
    value: "리뷰 집중",
    title: "리뷰 집중",
    description: "불만 리뷰, 답글 톤, 평점 방어 쪽을 더 세게 봅니다.",
    icon: MessageSquareText,
  },
  {
    value: "메뉴 집중",
    title: "메뉴 집중",
    description: "객단가, 세트 구성, 약한 메뉴 보완 쪽을 우선 봅니다.",
    icon: ReceiptText,
  },
  {
    value: "홍보 집중",
    title: "홍보 집중",
    description: "SNS, 전단, 신규 방문 전환 문구를 우선 뽑아드립니다.",
    icon: Megaphone,
  },
] as const;

const operationModes = [
  { value: "홀 중심", title: "홀 중심", description: "매장 방문 손님이 중심입니다." },
  { value: "배달 중심", title: "배달 중심", description: "배달앱과 배달 매출 비중이 큽니다." },
  { value: "홀+배달 함께", title: "홀+배달 함께", description: "두 채널을 같이 운영합니다." },
] as const;

const reportStyles = [
  {
    value: "핵심만 빠르게",
    title: "핵심만 빠르게",
    description: "지금 바로 손볼 것부터 짧고 강하게 정리합니다.",
  },
  {
    value: "균형 있게 전체",
    title: "균형 있게 전체",
    description: "전반적인 문제와 실행안을 고르게 봅니다.",
  },
  {
    value: "매출 우선",
    title: "매출 우선",
    description: "매출에 바로 연결될 항목부터 우선순위를 잡습니다.",
  },
] as const;

const priorityAreas = [
  { value: "리뷰 관리", title: "리뷰 관리", description: "불만 리뷰, 답글 속도, 평점 관리" },
  { value: "메뉴 구성", title: "메뉴 구성", description: "객단가, 세트, 대표 메뉴 정리" },
  { value: "홍보 문구", title: "홍보 문구", description: "SNS, 전단, 배달앱 소개 문구" },
  { value: "저녁 매출", title: "저녁 매출", description: "한산한 시간대 보완과 재방문 유도" },
  { value: "재방문율", title: "재방문율", description: "한 번 온 손님이 다시 오게 만들기" },
  { value: "배달 전환", title: "배달 전환", description: "배달앱 주문 전환과 메뉴 노출" },
] as const;

const initialValues: DiagnosisFormValues = {
  storeName: "",
  category: "",
  location: "",
  mainMenu: "",
  averageOrderPrice: "",
  diagnosisType: "종합 진단",
  operationMode: "홀+배달 함께",
  reportStyle: "핵심만 빠르게",
  priorityAreas: ["리뷰 관리", "홍보 문구"],
  usesDeliveryApps: "예",
  deliveryApps: "",
  reviewIssues: "",
  salesConcerns: "",
  marketingConcerns: "",
  ownerGoal: "",
  extraNotes: "",
};

function Field({
  label,
  name,
  required,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: keyof DiagnosisFormValues;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-brand-600">*</span> : null}
      </label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function TextField({
  label,
  name,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: keyof DiagnosisFormValues;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-brand-600">*</span> : null}
      </label>
      <Textarea
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SelectCard({
  title,
  description,
  selected,
  onClick,
  icon: Icon,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[24px] border px-4 py-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
        selected
          ? "border-slate-950 bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
          : "border-border bg-white text-slate-950 hover:-translate-y-0.5 hover:border-[#d8cab8] hover:bg-[#fffaf4]",
      )}
    >
      <div className="flex items-start gap-3">
        {Icon ? (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[16px]",
              selected ? "bg-white/10 text-white" : "bg-[#fff2a8] text-slate-950",
            )}
          >
            <Icon className="size-4" />
          </div>
        ) : null}
        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <p className={cn("mt-1 text-sm leading-6", selected ? "text-white/78" : "text-muted-foreground")}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

export function DiagnosisForm() {
  const [state, formAction, isPending] = useActionState(
    createDiagnosisAction,
    initialState,
  );
  const [formValues, setFormValues] = useState(initialValues);

  const selectedPriorityLabels = useMemo(
    () => formValues.priorityAreas?.filter(Boolean) ?? [],
    [formValues.priorityAreas],
  );

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormValues((current) => {
      const key = name as keyof DiagnosisFormValues;

      return {
        ...current,
        [key]: value,
      };
    });
  }

  function handleDiagnosisTypeChange(value: string) {
    setFormValues((current) => ({ ...current, diagnosisType: value }));
  }

  function handleOperationModeChange(value: string) {
    setFormValues((current) => ({ ...current, operationMode: value }));
  }

  function handleReportStyleChange(value: string) {
    setFormValues((current) => ({ ...current, reportStyle: value }));
  }

  function togglePriorityArea(value: string) {
    setFormValues((current) => {
      const currentAreas = current.priorityAreas ?? [];
      const nextAreas = currentAreas.includes(value)
        ? currentAreas.filter((item) => item !== value)
        : [...currentAreas, value];

      return {
        ...current,
        priorityAreas: nextAreas,
      };
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">카드 먼저 고르고 진단 시작하기</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            지금 필요한 진단 방향을 먼저 고르면, 결과도 그쪽에 맞춰 더 세게 정리됩니다.
          </p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">
            <input type="hidden" name="diagnosisType" value={formValues.diagnosisType} />
            <input type="hidden" name="operationMode" value={formValues.operationMode} />
            <input type="hidden" name="reportStyle" value={formValues.reportStyle} />
            <input
              type="hidden"
              name="priorityAreas"
              value={selectedPriorityLabels.join("||")}
            />

            <section className="space-y-4">
              <div className="space-y-1">
                <Badge>1. 진단 방식</Badge>
                <h3 className="text-lg font-semibold">어떤 식으로 보고 싶으신가요?</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {diagnosisTypes.map((option) => (
                  <SelectCard
                    key={option.value}
                    title={option.title}
                    description={option.description}
                    icon={option.icon}
                    selected={formValues.diagnosisType === option.value}
                    onClick={() => handleDiagnosisTypeChange(option.value)}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="space-y-1">
                <Badge>2. 운영 형태</Badge>
                <h3 className="text-lg font-semibold">매장을 주로 어떻게 운영하고 계신가요?</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {operationModes.map((option) => (
                  <SelectCard
                    key={option.value}
                    title={option.title}
                    description={option.description}
                    selected={formValues.operationMode === option.value}
                    onClick={() => handleOperationModeChange(option.value)}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="space-y-1">
                <Badge>3. 지금 가장 급한 문제</Badge>
                <h3 className="text-lg font-semibold">우선순위로 잡을 항목을 골라주세요</h3>
                <p className="text-sm text-muted-foreground">
                  여러 개 골라도 됩니다. 선택한 항목을 기준으로 리포트가 더 구체적으로 나옵니다.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {priorityAreas.map((option) => (
                  <SelectCard
                    key={option.value}
                    title={option.title}
                    description={option.description}
                    selected={selectedPriorityLabels.includes(option.value)}
                    onClick={() => togglePriorityArea(option.value)}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="space-y-1">
                <Badge>4. 결과 톤</Badge>
                <h3 className="text-lg font-semibold">어떤 식으로 정리해드리면 좋을까요?</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {reportStyles.map((option) => (
                  <SelectCard
                    key={option.value}
                    title={option.title}
                    description={option.description}
                    selected={formValues.reportStyle === option.value}
                    onClick={() => handleReportStyleChange(option.value)}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <div className="space-y-1">
                <Badge>5. 매장 기본 정보</Badge>
                <h3 className="text-lg font-semibold">기본 정보만 정확히 적어주시면 됩니다</h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="매장명"
                  name="storeName"
                  required
                  placeholder="예: 성수칼국수"
                  value={formValues.storeName}
                  onChange={handleInputChange}
                />
                <Field
                  label="업종"
                  name="category"
                  required
                  placeholder="예: 칼국수, 분식, 고깃집"
                  value={formValues.category}
                  onChange={handleInputChange}
                />
                <Field
                  label="지역"
                  name="location"
                  required
                  placeholder="예: 서울 성동구 성수동"
                  value={formValues.location}
                  onChange={handleInputChange}
                />
                <Field
                  label="평균 객단가"
                  name="averageOrderPrice"
                  required
                  placeholder="예: 12000원"
                  value={formValues.averageOrderPrice}
                  onChange={handleInputChange}
                />
              </div>

              <Field
                label="주요 메뉴"
                name="mainMenu"
                required
                placeholder="예: 멸치칼국수, 비빔국수, 수육"
                value={formValues.mainMenu}
                onChange={handleInputChange}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    배달앱 사용 여부<span className="ml-1 text-brand-600">*</span>
                  </label>
                  <select
                    name="usesDeliveryApps"
                    required
                    value={formValues.usesDeliveryApps}
                    onChange={handleInputChange}
                    className="flex h-11 w-full rounded-xl border border-border bg-white px-4 py-2 text-sm text-foreground outline-none transition focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-ring/40"
                  >
                    <option value="예">예</option>
                    <option value="아니오">아니오</option>
                  </select>
                </div>

                <Field
                  label="사용 중인 배달앱"
                  name="deliveryApps"
                  placeholder="예: 배민, 쿠팡이츠"
                  value={formValues.deliveryApps}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            <section className="space-y-5">
              <div className="space-y-1">
                <Badge>6. 지금 상황</Badge>
                <h3 className="text-lg font-semibold">요즘 겪는 문제를 있는 그대로 적어주세요</h3>
              </div>
              <TextField
                label="최근 리뷰 문제"
                name="reviewIssues"
                required
                placeholder="예: 리뷰 수는 늘었는데 답글이 늦고, 친절도 관련 지적이 반복됩니다."
                value={formValues.reviewIssues}
                onChange={handleInputChange}
              />
              <TextField
                label="매출 고민"
                name="salesConcerns"
                required
                placeholder="예: 점심은 괜찮지만 저녁 회전율이 낮고 재방문율이 떨어집니다."
                value={formValues.salesConcerns}
                onChange={handleInputChange}
              />
              <TextField
                label="홍보 고민"
                name="marketingConcerns"
                required
                placeholder="예: 인스타는 하고 있지만 실제 방문이나 주문 전환이 약합니다."
                value={formValues.marketingConcerns}
                onChange={handleInputChange}
              />
              <TextField
                label="사장님의 목표"
                name="ownerGoal"
                required
                placeholder="예: 2개월 안에 평일 저녁 매출 20% 올리기"
                value={formValues.ownerGoal}
                onChange={handleInputChange}
              />
              <TextField
                label="기타 특이사항"
                name="extraNotes"
                placeholder="예: 최근 메뉴판 교체 예정, 홀 인력이 부족함"
                value={formValues.extraNotes}
                onChange={handleInputChange}
              />
            </section>

            {state.error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {state.error}
              </p>
            ) : null}

            <Button className="w-full" size="lg" type="submit" disabled={isPending}>
              {isPending ? "진단 내용 정리하는 중..." : "이 내용으로 보고서 만들기"}
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <Card className="paper-panel border-[#d8cab8] bg-[#fffaf4]">
          <CardHeader>
            <CardTitle className="text-lg">이렇게 진행됩니다</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <StepItem
              step="1"
              title="카드로 진단 방향 선택"
              description="무슨 문제를 먼저 볼지 먼저 고릅니다."
            />
            <StepItem
              step="2"
              title="매장 상황 입력"
              description="매장 기본 정보와 현재 고민을 적습니다."
            />
            <StepItem
              step="3"
              title="바로 실행할 리포트 받기"
              description="우선순위, 답글, 홍보 문구, 7일 실행안까지 받습니다."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">선택한 진단 요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <SummaryBlock label="진단 방식" value={formValues.diagnosisType || "선택 전"} />
            <SummaryBlock label="운영 형태" value={formValues.operationMode || "선택 전"} />
            <SummaryBlock label="결과 톤" value={formValues.reportStyle || "선택 전"} />

            <div className="space-y-2">
              <div className="text-sm font-semibold text-slate-950">지금 가장 급한 문제</div>
              <div className="flex flex-wrap gap-2">
                {selectedPriorityLabels.length ? (
                  selectedPriorityLabels.map((item) => (
                    <Badge key={item} className="bg-[#fff2a8] text-slate-950">
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">아직 선택 전</span>
                )}
              </div>
            </div>

            <div className="rounded-[22px] border border-border bg-muted/60 px-4 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <Target className="size-4 text-brand-600" />
                제출 전 체크
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>매장명과 업종이 정확한지</li>
                <li>지금 제일 급한 문제를 골랐는지</li>
                <li>사장님 목표를 숫자 기준으로 적었는지</li>
              </ul>
            </div>

            <div className="rounded-[22px] border border-border bg-white px-4 py-4">
              <div className="text-sm font-semibold text-slate-950">이번 진단 한 줄 요약</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {formValues.storeName || "매장명 미입력"}의{" "}
                {formValues.diagnosisType || "진단"}을 {formValues.reportStyle || "핵심만 빠르게"} 톤으로
                정리합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StepItem({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-[20px] border border-[#e4d9cc] bg-white px-4 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
        {step}
      </div>
      <div>
        <div className="font-semibold text-slate-950">{title}</div>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function SummaryBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold text-slate-950">{label}</div>
      <p className="text-sm leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}
