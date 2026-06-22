import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-medium text-white mb-3">Authentication Error</h1>
        <p className="text-gray-400 mb-8">
          The link you used is invalid or has expired. Please try again.
        </p>
        
        <Link
          href="/login"
          className="bg-brand-orange text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors inline-block"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}