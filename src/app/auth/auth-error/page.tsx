'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'access_denied':
        return '您取消了登录授权，请重试';
      case 'server_error':
        return '服务器错误，请稍后重试';
      case 'temporarily_unavailable':
        return '服务暂时不可用，请稍后重试';
      case 'invalid_request':
        return '登录请求无效，请重新尝试';
      case 'auth-failed':
        return '认证失败，请检查您的账户状态';
      default:
        return '登录时发生未知错误，请重试或联系支持';
    }
  };

  const handleRetry = () => {
    router.push('/auth');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">认证失败</h1>
          <p className="text-gray-600">
            {getErrorMessage(error)}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            重新登录
          </button>

          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
          >
            <Home className="w-5 h-5" />
            返回首页
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            如果问题持续存在，请联系技术支持
          </p>
        </div>
      </div>
    </div>
  );
} 