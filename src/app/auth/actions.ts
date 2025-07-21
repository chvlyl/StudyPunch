"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const supabase = await createClient();
  
  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not set. Please add it to your .env.local file.');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    redirect("/auth/auth-error");
  }

  if (data.url) {
    redirect(data.url);
  }
} 