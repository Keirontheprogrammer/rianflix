'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-xl font-medium text-white mb-3">Check your email</h1>
          <p className="text-gray-400 text-sm mb-6">
            If an account exists for <span className="text-white">{email}</span>, 
            you will receive a password reset link shortly.
          </p>
          
          <Link
            href="/login"
            className="text-brand-yellow text-sm hover:underline flex items-center justify-center gap-1"
          >
            <ArrowLeft size={14} />
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-brand-card border border-brand-border rounded-2xl p-8">
        
        <Link
          href="/login"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-300 text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>

        <h1 className="text-2xl font-medium text-white mb-2">Reset password</h1>
        <p className="text-gray-400 text-sm mb-8">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full bg-black/40 border border-brand-border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  )
}