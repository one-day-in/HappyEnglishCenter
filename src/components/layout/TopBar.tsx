'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'
import { BP } from '@/lib/asset'

const pageInfo: Record<string, { title: string; sub: string }> = {
  '/dashboard':      { title: 'Dashboard',       sub: 'Your personal overview'        },
  '/schedule':       { title: 'Schedule',         sub: 'Weekly lesson timetable'       },
  '/homework':       { title: 'Homework',         sub: 'All assignments'               },
  '/homework/create':{ title: 'Create Homework',  sub: 'Add a new assignment'          },
  '/admin/groups':   { title: 'Groups',           sub: 'Manage student groups'         },
  '/admin/schedule': { title: 'Manage Schedule',  sub: 'Edit weekly timetable'         },
}

interface TopBarProps {
  role?: string
  userName?: string
}

export function TopBar({ role = 'student', userName = 'User' }: TopBarProps) {
  const pathname = usePathname()
  const info = pageInfo[pathname] ?? { title: 'HappyEnglish', sub: '' }

  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header
      className="sticky top-0 z-40 border-b border-border h-16 flex items-center px-5 gap-4"
      style={{ background: '#FDFAF9' }}
    >
      {/* Mobile menu trigger */}
      <Sheet>
        <SheetTrigger className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl hover:bg-primary/5 transition-colors">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-60">
          <Sidebar role={role} userName={userName} />
        </SheetContent>
      </Sheet>

      {/* Mobile logo */}
      <div className="md:hidden">
        <img src={`${BP}/images/logo.svg`} alt="Happy English Center" className="h-7 w-auto" />
      </div>

      {/* Desktop: page title + subtitle */}
      <div className="hidden md:block">
        <h1
          className="text-base font-semibold text-foreground leading-none"
          style={{ letterSpacing: '-0.01em' }}
        >
          {info.title}
        </h1>
        {info.sub && (
          <p className="text-xs text-muted-foreground mt-0.5">{info.sub}</p>
        )}
      </div>

      <div className="flex-1" />

      {/* User avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-default"
        style={{ background: 'rgba(107,58,58,0.12)', color: '#6B3A3A' }}
        title={userName}
      >
        {initials}
      </div>
    </header>
  )
}
