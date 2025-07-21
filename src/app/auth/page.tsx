'use client'

import { signInWithGoogle } from './actions';
import { Chrome } from 'lucide-react';

export default function LoginPage() {
  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-xl shadow-lg text-center max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">欢迎回来！</h1>
        <p className="text-gray-600 mb-8">
          请使用您的 Google 账户登录以继续。
        </p>
        <button
          onClick={handleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          <Chrome className="w-6 h-6" />
          使用 Google 登录
        </button>
      </div>
    </div>
  );
} 