"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ActionState } from "@/lib/types";

const initialState: ActionState = {};

type AuthFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  disabled?: boolean;
  disabledMessage?: string;
};

export function AuthForm({
  title,
  description,
  submitLabel,
  action,
  disabled = false,
  disabledMessage,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">이메일</label>
            <Input
              name="email"
              type="email"
              placeholder="owner@example.com"
              autoComplete="email"
              required
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">비밀번호</label>
            <Input
              name="password"
              type="password"
              placeholder="8자 이상 입력"
              autoComplete="current-password"
              required
              disabled={disabled}
            />
          </div>

          {disabled && disabledMessage ? (
            <p className="text-sm font-medium text-amber-700">{disabledMessage}</p>
          ) : null}

          {state.error ? (
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          ) : null}

          {state.success ? (
            <p className="text-sm font-medium text-success">{state.success}</p>
          ) : null}

          <Button className="w-full" type="submit" disabled={disabled || isPending}>
            {isPending ? "처리 중..." : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
