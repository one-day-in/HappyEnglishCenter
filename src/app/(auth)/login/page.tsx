'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowRight, UserCircle2 } from 'lucide-react'
import { BP } from '@/lib/asset'
import { login } from '@/lib/auth'

const ROLE_HINTS = [
  { username: 'admin',   label: 'Admin',   color: '#7C3AED' },
  { username: 'teacher', label: 'Teacher', color: '#0369A1' },
  { username: 'student', label: 'Student', color: '#6B3A3A' },
]

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    await new Promise(r => setTimeout(r, 500))

    const user = login(username, password)
    if (user) {
      router.push('/dashboard')
    } else {
      setError('Incorrect username or password')
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
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Card */}
        <Card className="border border-border/60 shadow-sm rounded-2xl bg-white">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <div className="relative">
                  <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin / teacher / student"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="rounded-xl h-10 pl-9"
                    autoComplete="username"
                    required
                  />
                </div>
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
                  autoComplete="current-password"
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

        {/* Role hints */}
        <div className="space-y-3">
          <p className="text-center text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">
            Demo accounts · password: 1234
          </p>
          <div className="grid grid-cols-3 gap-2">
            {ROLE_HINTS.map(({ username: u, label, color }) => (
              <button
                key={u}
                type="button"
                onClick={() => { setUsername(u); setPassword('1234'); setError('') }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border/60 bg-white hover:bg-primary/5 hover:border-primary/30 transition-all text-center"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: color }}
                >
                  {label[0]}
                </div>
                <span className="text-xs font-medium text-foreground">{label}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{u}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
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
