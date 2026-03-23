'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Users, Calendar, BookOpen, GraduationCap, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BRANCHES, branchMockData } from '@/lib/mock-data'

export default function AdminOverviewPage() {
  const totalStudents = Object.values(branchMockData).reduce((s, b) => s + b.students.length, 0)
  const totalTeachers = Object.values(branchMockData).reduce((s, b) => s + b.teachers.length, 0)
  const totalSlots    = Object.values(branchMockData).reduce((s, b) => s + b.schedule.length, 0)
  const totalHW       = Object.values(branchMockData).reduce((s, b) => s + b.homework.length, 0)

  const globalStats = [
    { label: 'Teachers',     value: totalTeachers, icon: Users,         color: '#1D6FA4' },
    { label: 'Students',     value: totalStudents, icon: GraduationCap, color: '#7C3AED' },
    { label: 'Lessons/week', value: totalSlots,    icon: Calendar,      color: '#6B3A3A' },
    { label: 'Homework',     value: totalHW,       icon: BookOpen,      color: '#059669' },
  ]

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold" style={{ letterSpacing: '-0.02em' }}>Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage all branches of HappyEnglishCenter</p>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {globalStats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border border-border/60 shadow-sm">
            <CardContent className="p-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: color + '18' }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color, letterSpacing: '-0.02em' }}>{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label} · all branches</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Branch cards */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">Branches</p>
        <div className="grid md:grid-cols-2 gap-4">
          {BRANCHES.map((branch) => {
            const data = branchMockData[branch.id]
            return (
              <Link key={branch.id} href={`/admin/branches/${branch.id}`}>
                <Card className="border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden group">
                  <CardContent className="p-0">
                    {/* Colour bar */}
                    <div className="h-1.5 w-full" style={{ background: branch.color }} />

                    <div className="p-5">
                      {/* Branch name + arrow */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-lg leading-tight" style={{ letterSpacing: '-0.01em' }}>{branch.name}</p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />{branch.address}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" />
                      </div>

                      {/* Mini stats */}
                      <div className="flex gap-5 pt-3 border-t border-border/60">
                        {[
                          { n: data.teachers.length, label: 'teachers' },
                          { n: data.students.length, label: 'students' },
                          { n: data.groups.length,   label: 'groups'   },
                          { n: data.schedule.length, label: 'lessons'  },
                        ].map(({ n, label }) => (
                          <div key={label}>
                            <p className="text-base font-bold" style={{ color: branch.color, letterSpacing: '-0.02em' }}>{n}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
