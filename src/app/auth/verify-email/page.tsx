'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';

function VerifyEmailContent() {
  const { user, resendVerificationEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  // 如果用户已经验证，重定向到主页
  useEffect(() => {
    if (user?.email_confirmed_at) {
      console.log('用户邮箱已验证，重定向到主页');
      router.replace('/');
    }
  }, [user, router]);

  // 倒计时定时器
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      await resendVerificationEmail(email);
      console.log('重新发送验证邮件到:', email);
      
      // 重置倒计时
      setCountdown(60);
    } catch (error) {
      console.error('重发验证邮件失败:', error);
      // 这里可以添加错误提示
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToAuth = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          {/* 邮箱图标 */}
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          
          {/* 标题 */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            请验证您的邮箱
          </h1>
          
          {/* 描述 */}
          <p className="text-gray-600">
            我们已向 {' '}
            <span className="font-medium text-gray-800">
              {email || '您的邮箱'}
            </span>
            {' '} 发送了验证链接
          </p>
        </div>

        <div className="space-y-6">
          {/* 说明文字 */}
          <div className="text-center text-sm text-gray-600 space-y-3">
            <p>
              请检查您的邮箱（包括垃圾邮件文件夹），点击验证链接以完成注册。
            </p>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="mb-2">没有收到邮件？</p>
              {countdown > 0 ? (
                <p className="text-gray-500">
                  请等待 {countdown} 秒后重新发送
                </p>
              ) : (
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      发送中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      重新发送验证邮件
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="text-center pt-4">
            <button
              onClick={handleBackToAuth}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回登录页面
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">正在加载...</div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
} 