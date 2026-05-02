import type { z } from "zod";

import type { diagnosisReportSchema } from "@/lib/diagnosis-schema";

export type DiagnosisFormValues = {
  storeName: string;
  category: string;
  location: string;
  mainMenu: string;
  averageOrderPrice: string;
  diagnosisType?: string;
  operationMode?: string;
  reportStyle?: string;
  priorityAreas?: string[];
  usesDeliveryApps: string;
  deliveryApps: string;
  reviewIssues: string;
  salesConcerns: string;
  marketingConcerns: string;
  ownerGoal: string;
  extraNotes: string;
};

export type DiagnosisReport = z.infer<typeof diagnosisReportSchema>;

export type ActionState = {
  error?: string;
  success?: string;
};

export type DashboardDiagnosisCard = {
  id: string;
  storeId: string;
  storeName: string;
  category: string;
  location: string;
  overallScore: number;
  summary: string;
  createdAt: string;
};

export type DiagnosisDetail = {
  id: string;
  createdAt: string;
  inputData: DiagnosisFormValues;
  report: DiagnosisReport;
  store: {
    id: string;
    storeName: string;
    category: string;
    location: string;
    mainMenu: string;
    averageOrderPrice: string;
    deliveryApps: string;
  };
};
