'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User, Session, SupabaseClient } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  supabase: SupabaseClient;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{
    user: User | null;
    session: Session | null;
  }>;
  signOut: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ 
    data: { user: User | null } | null; 
    error: Error | null;
  }>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    console.log("AuthContext - 初始化认证系统");
    
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        console.log("AuthContext - 开始初始化认证");

        // 获取初始会话
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !mounted) {
          console.error("AuthContext - 获取会话失败:", error);
          setIsLoading(false);
          return;
        }

        // 更新初始状态
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // 设置认证状态变化监听器
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            if (!mounted) return;
            
            console.log("AuthContext - 认证状态变化:", event);
            const newUser = newSession?.user ?? null;
            setSession(newSession);
            setUser(newUser);
          }
        );

        // 初始化完成
        if (mounted) setIsLoading(false);
        
        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("AuthContext - 初始化错误:", error);
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();
  }, [supabase]);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    supabase,
    signInWithGoogle: async () => {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/')}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error("Google 登录错误:", error);
        throw error;
      }
      
      // OAuth 会自动重定向，无需额外处理
      if (data.url) {
        window.location.href = data.url;
      }
    },
    signInWithEmail: async (email: string, password: string) => {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) {
        console.error("邮箱登录错误:", authError);
        throw authError;
      }

      return authData;
    },
    signOut: async () => {
      try {
        console.log("AuthContext - 开始登出");
        
        // 清理状态
        window.dispatchEvent(new Event('cleanup-before-logout'));
        
        // 等待清理完成
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 执行登出
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          console.error("登出错误:", error);
          throw error;
        }
        
        // 强制重定向到登录页
        window.location.assign('/auth');
      } catch (error) {
        console.error('登出时发生错误:', error);
        throw error;
      }
    },
    signUpWithEmail: async (email: string, password: string) => {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/')}`,
          captchaToken: undefined, // 确保不使用验证码
        }
      });
      
      if (error) {
        console.error("邮箱注册错误:", error);
        throw error;
      }
      
      return { data, error };
    },
    updatePassword: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        console.error("更新密码错误:", error);
        throw error;
      }
    },
    updateEmail: async (newEmail: string) => {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });
      
      if (error) {
        console.error("更新邮箱错误:", error);
        throw error;
      }
    },
    resetPassword: async (email: string) => {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/auth/update-password')}`,
        captchaToken: undefined,
      });
      
      if (error) {
        console.error("重置密码错误:", error);
        throw error;
      }
    },
    resendVerificationEmail: async (email: string) => {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/')}`,
          captchaToken: undefined,
        }
      });
      
      if (error) {
        console.error("重发验证邮件错误:", error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }
  return context;
}; 