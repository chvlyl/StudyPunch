'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 获取重定向参数
  const redirectTo = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      console.log("用户已登录，重定向到:", redirectTo);
      router.replace(redirectTo);
    }
  }, [user, router, redirectTo]);

  const handleSubmit = async (email: string, password: string, isSignUp: boolean) => {
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await signUpWithEmail(email, password);
        if (error) throw error;
        
        // 检查用户是否需要验证邮箱
        if (data?.user && !data.user.email_confirmed_at) {
          router.replace(`/auth/verify-email?email=${encodeURIComponent(email)}`);
          return;
        }
        
        router.replace(redirectTo);
      } else {
        await signInWithEmail(email, password);
        router.replace(redirectTo);
      }
    } catch (error) {
      console.error("认证错误:", error);
      if (error instanceof Error) {
        // 将英文错误消息转换为中文
        let errorMessage = error.message;
        if (errorMessage.includes('Invalid login credentials')) {
          errorMessage = '邮箱或密码错误，请检查后重试';
        } else if (errorMessage.includes('Email not confirmed')) {
          errorMessage = '请先验证您的邮箱地址';
        } else if (errorMessage.includes('Password should be at least')) {
          errorMessage = '密码至少需要6个字符';
        } else if (errorMessage.includes('User already registered')) {
          errorMessage = '该邮箱已注册，请直接登录';
        }
        setError(errorMessage);
      } else {
        setError('登录失败，请稍后重试');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google登录错误:", error);
      setError('Google登录失败，请稍后重试');
      setIsLoading(false);
    }
  };

  // 如果用户已登录，显示加载状态
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">正在跳转...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <LoginForm
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
} 