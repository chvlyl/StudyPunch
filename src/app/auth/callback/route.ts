import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('AuthCallback: 处理认证回调');
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const error = searchParams.get('error');

  // 检查是否有OAuth错误
  if (error) {
    console.error('AuthCallback: OAuth错误:', error);
    return NextResponse.redirect(`${origin}/auth/auth-error?error=${error}`);
  }

  if (code) {
    console.log('AuthCallback: 交换授权码为会话');
    
    // 为 OAuth 回调创建特殊的 Supabase 客户端，允许检测 URL 中的会话
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Server Component 中调用 setAll 可能会失败，但可以忽略
            }
          },
        },
        auth: {
          detectSessionInUrl: true,  // 关键：允许检测 URL 中的认证信息
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );
    
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('AuthCallback: 交换会话失败:', exchangeError);
        
        // 如果是 PKCE 相关错误，尝试刷新页面或重定向到登录
        if (exchangeError.message?.includes('code verifier') || exchangeError.message?.includes('PKCE')) {
          console.log('AuthCallback: 检测到 PKCE 错误，重定向到登录页面');
          return NextResponse.redirect(`${origin}/auth?message=请重新登录`);
        }
        
        return NextResponse.redirect(`${origin}/auth/auth-error?error=session-exchange-failed`);
      }
      
      if (data?.user) {
        console.log('AuthCallback: 认证成功，用户:', data.user.id);
        console.log('AuthCallback: 重定向到:', next);
        return NextResponse.redirect(`${origin}${next}`);
      }
      
    } catch (error) {
      console.error('AuthCallback: 回调处理异常:', error);
      return NextResponse.redirect(`${origin}/auth/auth-error?error=callback-exception`);
    }
  }

  console.log('AuthCallback: 未找到授权码，重定向到错误页面');
  return NextResponse.redirect(`${origin}/auth/auth-error?error=missing-code`);
} 