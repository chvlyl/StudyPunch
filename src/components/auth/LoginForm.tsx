'use client';

import { useState } from 'react';
import { Chrome, Mail, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string, isSignUp: boolean) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function LoginForm({ 
  onSubmit, 
  onGoogleSignIn, 
  isLoading, 
  error 
}: LoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await onSubmit(email, password, isSignUp);
  };

  const handleGoogleSignIn = async () => {
    try {
      await onGoogleSignIn();
    } catch (error) {
      console.error('Google登录失败:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-3xl">📚</span>
          <h2 className="text-2xl font-bold text-gray-800">
            学霸打卡
          </h2>
        </div>
        <p className="text-gray-600">
          {isSignUp ? '创建新账户开始学习' : '欢迎回来！请登录继续'}
        </p>
      </div>

      {error && (
        <div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded-lg text-center text-sm">
          {error}
        </div>
      )}

      {/* Google 登录按钮 */}
      <div className="space-y-4">
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Chrome className="w-5 h-5" />
          使用 Google 账户{isSignUp ? '注册' : '登录'}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">或</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      {/* 邮箱登录表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              邮箱地址
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入您的邮箱"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? '设置密码（至少6位）' : '请输入密码'}
                required
                minLength={isSignUp ? 6 : undefined}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {!isSignUp && (
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              忘记密码？
            </button>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading || !email || !password}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              处理中...
            </div>
          ) : (
            `${isSignUp ? '注册' : '登录'}账户`
          )}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
          >
            {isSignUp ? '已有账户？点击登录' : '没有账户？点击注册'}
          </button>
        </div>
      </form>

      {/* 忘记密码提示 */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">重置密码</h3>
            <p className="text-gray-600 mb-4">
              忘记密码功能正在开发中，请联系管理员重置密码或使用 Google 登录。
            </p>
            <button
              onClick={() => setIsForgotPasswordOpen(false)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 