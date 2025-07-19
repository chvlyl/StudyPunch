export default function AuthError() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-4">
          There was an error authenticating your account.
        </p>
        <p className="mt-2">
          Please try signing in again or contact support if the problem persists.
        </p>
      </div>
    </div>
  )
} 