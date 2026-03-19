'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BP } from '@/lib/asset'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (email && password) {
      await new Promise(r => setTimeout(r, 600))
      router.push('/dashboard')
    } else {
      setError('Please enter email and password')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: '#F2EDEC' }}
    >
      {/* Ambient blob */}
      <div
        aria-hidden
        className="fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: '#6B3A3A', opacity: 0.06 }}
      />

      <div className="relative w-full max-w-sm space-y-7">

        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <img src={`${BP}/images/logo.svg`} alt="Happy English Center" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">Sign in to your student account</p>
        </div>

        {/* Card */}
        <Card className="border border-border/60 shadow-sm rounded-2xl bg-white">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="rounded-xl h-10"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="rounded-xl h-10"
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full font-medium h-11 rounded-xl mt-1" disabled={loading}>
                {loading ? 'Signing in…' : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer links */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground/60">
            Demo: any email + password will work
          </p>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
