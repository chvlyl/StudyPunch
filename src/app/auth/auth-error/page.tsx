export default function AuthError() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600">认证错误</h1>
        <p className="mt-4">
          您的账户认证时出现错误。
        </p>
        <p className="mt-2">
          请重试登录，如果问题持续存在，请联系技术支持。
        </p>
      </div>
    </div>
  );
} 