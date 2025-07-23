import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase 配置错误：请检查环境变量 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY 是否已设置');
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        // 自动刷新会话
        autoRefreshToken: true,
        // 持久化会话
        persistSession: true,
        // 检测会话恢复和OAuth回调
        detectSessionInUrl: true,
        // 确保正确处理OAuth流程
        flowType: 'pkce'
      }
    }
  )
} 