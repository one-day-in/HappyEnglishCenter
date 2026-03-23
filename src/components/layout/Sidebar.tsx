'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Calendar, BookOpen, FolderOpen,
  LogOut, ChevronLeft, UserCheck, MapPin,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BP } from '@/lib/asset'
import { logout } from '@/lib/auth'
import { BRANCHES } from '@/lib/mock-data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
}

interface SidebarProps {
  role?: string
  userName?: string
}

export function Sidebar({ role = 'student', userName = 'User' }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('schedule')

  // Detect branch from URL
  const branchMatch = pathname.match(/^\/admin\/branches\/([^/]+)/)
  const branchSlug = branchMatch?.[1]
  const currentBranch = branchSlug ? BRANCHES.find(b => b.id === branchSlug) : null

  // Read active tab from URL search params (client-side only)
  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get('tab') ?? 'schedule'
    setActiveTab(tab)
  }, [pathname, typeof window !== 'undefined' ? window.location.search : ''])

  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const navItems: NavItem[] = [
    { label: t.cabinet.home,      href: '/dashboard', icon: LayoutDashboard, roles: ['student'] },
    { label: t.cabinet.schedule,  href: '/schedule',  icon: Calendar,        roles: ['student', 'teacher'] },
    { label: t.cabinet.materials, href: '/materials', icon: FolderOpen,      roles: ['teacher'] },
    { label: t.cabinet.overview,  href: '/admin',     icon: LayoutDashboard, roles: ['admin'] },
  ]

  const branchNavItems = [
    { id: 'schedule', label: t.cabinet.schedule, icon: Calendar   },
    { id: 'homework', label: t.cabinet.homework, icon: BookOpen   },
    { id: 'staff',    label: t.cabinet.staff,    icon: UserCheck  },
  ]

  const visibleItems = navItems.filter(item => item.roles.includes(role))

  return (
    <aside
      className="hidden md:flex flex-col w-60 h-screen sticky top-0 border-r border-border"
      style={{ background: '#FDFAF9' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/">
          <img src={`${BP}/images/logo.svg`} alt="Happy English Center" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">

        {/* ── Branch mode ── */}
        {currentBranch && role === 'admin' ? (
          <>
            {/* Back to Overview */}
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-all mb-3"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.cabinet.backToOverview}
            </Link>

            {/* Branch name */}
            <div className="px-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: currentBranch.color }} />
                <p className="font-bold text-sm truncate">{currentBranch.name}</p>
              </div>
              <div className="flex items-center gap-1 mt-0.5 pl-[18px]">
                <MapPin className="w-2.5 h-2.5 text-muted-foreground/50" />
                <p className="text-[10px] text-muted-foreground/60 truncate">{currentBranch.address}</p>
              </div>
            </div>

            <div className="h-px bg-border/60 mb-3 mx-3" />

            {/* Branch nav items */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 px-3 mb-2">
              {t.cabinet.management}
            </p>
            {branchNavItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id
              return (
                <Link
                  key={id}
                  href={`/admin/branches/${currentBranch.id}?tab=${id}`}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground font-normal'
                  )}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                    isActive ? 'bg-primary/15' : ''
                  )}>
                    <Icon className={cn('w-4 h-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
                  </div>
                  {label}
                </Link>
              )
            })}
          </>
        ) : (
          /* ── Normal mode ── */
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 px-3 mb-2">
              {t.cabinet.menu}
            </p>
            {visibleItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground font-normal'
                  )}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                    isActive ? 'bg-primary/15' : ''
                  )}>
                    <Icon className={cn('w-4 h-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
                  </div>
                  {item.label}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-primary/5 transition-colors group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'rgba(107,58,58,0.12)', color: '#6B3A3A' }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate" style={{ letterSpacing: '-0.01em' }}>{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
          <button
            onClick={() => { logout(); router.push('/') }}
            className="text-muted-foreground/50 hover:text-primary transition-colors"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
