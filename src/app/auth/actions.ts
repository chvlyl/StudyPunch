"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const supabase = await createClient();
  
  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    throw new Error('NEXT_PUBLIC_SITE_URL 环境变量未设置，请检查配置文件');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/')}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    },
  });

  if (error) {
    console.error("Google 登录错误:", error);
    redirect("/auth/auth-error?error=google-auth-failed");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("邮箱登录错误:", error);
    throw new Error("登录失败：" + error.message);
  }

  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createClient();
  
  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    throw new Error('NEXT_PUBLIC_SITE_URL 环境变量未设置');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/')}`,
      captchaToken: undefined,
    },
  });

  if (error) {
    console.error("邮箱注册错误:", error);
    throw new Error("注册失败：" + error.message);
  }

  return data;
}

export async function resetPassword(email: string) {
  const supabase = await createClient();
  
  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    throw new Error('NEXT_PUBLIC_SITE_URL 环境变量未设置');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/auth/update-password')}`,
    captchaToken: undefined,
  });

  if (error) {
    console.error("重置密码错误:", error);
    throw new Error("重置密码失败：" + error.message);
  }
}

export async function signOut() {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("登出错误:", error);
    throw new Error("登出失败：" + error.message);
  }
  
  redirect("/auth");
} 