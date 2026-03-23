'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { getSession, type AuthUser } from '@/lib/auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.replace('/login')
      return
    }
    setUser(session)
    setChecked(true)
  }, [router])

  if (!checked || !user) return null

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F2EDEC' }}>
      <Sidebar role={user.role} userName={user.name} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar role={user.role} userName={user.name} />
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
