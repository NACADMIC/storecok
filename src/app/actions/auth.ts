"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/env";
import type { ActionState } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

function getCredentials(formData: FormData) {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";

  return { email, password };
}

export async function signInAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase 환경변수를 먼저 설정해 주세요." };
  }

  const { email, password } = getCredentials(formData);

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 모두 입력해 주세요." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "로그인에 실패했습니다. 계정 정보를 다시 확인해 주세요." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUpAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return { error: "Supabase 환경변수를 먼저 설정해 주세요." };
  }

  const { email, password } = getCredentials(formData);

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 모두 입력해 주세요." };
  }

  if (password.length < 8) {
    return { error: "비밀번호는 8자 이상으로 입력해 주세요." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }

  if (!data.session) {
    return {
      success:
        "회원가입이 완료되었습니다. Supabase에서 이메일 확인을 켠 경우 메일 인증 후 로그인해 주세요.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOutAction() {
  if (!hasSupabaseEnv()) {
    redirect("/");
  }

  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
