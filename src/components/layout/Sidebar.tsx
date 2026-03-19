'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  Settings,
  LogOut,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BP } from '@/lib/asset'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
}

const navItems: NavItem[] = [
  { label: 'Dashboard',       href: '/dashboard',      icon: LayoutDashboard, roles: ['student', 'teacher', 'admin'] },
  { label: 'Schedule',        href: '/schedule',       icon: Calendar,        roles: ['student', 'teacher', 'admin'] },
  { label: 'Homework',        href: '/homework',       icon: BookOpen,        roles: ['student', 'teacher'] },
  { label: 'Groups',          href: '/admin/groups',   icon: Users,           roles: ['admin', 'teacher'] },
  { label: 'Manage Schedule', href: '/admin/schedule', icon: Settings,        roles: ['admin'] },
]

interface SidebarProps {
  role?: string
  userName?: string
}

export function Sidebar({ role = 'student', userName = 'User' }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const visibleItems = navItems.filter(item => item.roles.includes(role))

  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

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
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 px-3 mb-2">
          Menu
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
                'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                isActive ? 'bg-primary/15' : 'bg-transparent group-hover:bg-primary/5'
              )}>
                <Icon className={cn('w-4 h-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
              </div>
              {item.label}
            </Link>
          )
        })}
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
            onClick={() => router.push('/')}
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
