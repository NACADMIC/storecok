import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import { diagnosisReportSchema } from "@/lib/diagnosis-schema";
import { getOpenAIEnv } from "@/lib/env";
import type { DiagnosisFormValues, DiagnosisReport } from "@/lib/types";

function buildPrompt(values: DiagnosisFormValues) {
  return [
    "당신은 '매장콕'이라는 서비스의 AI 운영 컨설턴트다.",
    "대상은 요식업 자영업자다.",
    "말투는 쉽고 현실적이어야 하며, 바로 실행 가능한 조언 중심으로 작성한다.",
    "지나치게 추상적인 컨설팅 표현은 피한다.",
    "점수와 문제점은 입력값 기준으로 보수적으로 판단한다.",
    "리뷰 답글 예시, 홍보 문구는 한국어로 자연스럽고 실제 매장에 바로 쓸 수 있어야 한다.",
    "7일 실행 플랜은 매일 1개씩 구체적인 행동을 준다.",
    "",
    `매장명: ${values.storeName}`,
    `업종: ${values.category}`,
    `지역: ${values.location}`,
    `주요 메뉴: ${values.mainMenu}`,
    `평균 객단가: ${values.averageOrderPrice}`,
    `선택한 진단 방식: ${values.diagnosisType || "없음"}`,
    `운영 형태: ${values.operationMode || "없음"}`,
    `지금 가장 급한 문제: ${values.priorityAreas?.join(", ") || "없음"}`,
    `원하는 결과 톤: ${values.reportStyle || "없음"}`,
    `배달앱 사용 여부: ${values.usesDeliveryApps}`,
    `사용 중인 배달앱: ${values.deliveryApps || "없음"}`,
    `최근 리뷰 문제: ${values.reviewIssues}`,
    `매출 고민: ${values.salesConcerns}`,
    `홍보 고민: ${values.marketingConcerns}`,
    `사장님의 목표: ${values.ownerGoal}`,
    `기타 특이사항: ${values.extraNotes || "없음"}`,
  ].join("\n");
}

export async function generateDiagnosisReport(
  values: DiagnosisFormValues,
): Promise<DiagnosisReport> {
  const { apiKey, model } = getOpenAIEnv();
  const openai = new OpenAI({ apiKey });

  const response = await openai.responses.parse({
    model,
    input: [
      {
        role: "system",
        content:
          "당신은 음식점 사장님에게 현실적인 개선안을 제시하는 한국어 운영 코치다.",
      },
      {
        role: "user",
        content: buildPrompt(values),
      },
    ],
    text: {
      format: zodTextFormat(diagnosisReportSchema, "store_diagnosis_report"),
    },
  });

  if (!response.output_parsed) {
    throw new Error("AI 리포트 생성 결과를 해석하지 못했습니다.");
  }

  return response.output_parsed;
}
