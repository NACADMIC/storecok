import { z } from "zod";

export const diagnosisReportSchema = z.object({
  overallSummary: z.string().min(1),
  storeScore: z.object({
    score: z.number().int().min(0).max(100),
    reason: z.string().min(1),
  }),
  topProblems: z
    .array(
      z.object({
        title: z.string().min(1),
        reason: z.string().min(1),
        impact: z.string().min(1),
      }),
    )
    .length(3),
  prioritizedActions: z
    .array(
      z.object({
        priority: z.enum(["높음", "중간", "낮음"]),
        title: z.string().min(1),
        action: z.string().min(1),
        expectedEffect: z.string().min(1),
      }),
    )
    .min(3)
    .max(5),
  reviewReplyExamples: z
    .array(
      z.object({
        situation: z.string().min(1),
        reply: z.string().min(1),
      }),
    )
    .min(2)
    .max(3),
  menuImprovementIdeas: z
    .array(
      z.object({
        idea: z.string().min(1),
        detail: z.string().min(1),
      }),
    )
    .min(2)
    .max(4),
  snsPromotionCopy: z.array(z.string().min(1)).min(2).max(3),
  flyerPromotionCopy: z.array(z.string().min(1)).min(2).max(3),
  sevenDayPlan: z
    .array(
      z.object({
        day: z.string().min(1),
        task: z.string().min(1),
      }),
    )
    .length(7),
  cautions: z.array(z.string().min(1)).min(2).max(4),
});
