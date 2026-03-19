'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Calendar, Users, CheckCircle2 } from 'lucide-react'
import { mockHomework, mockStudents, mockCompletions } from '@/lib/mock-data'

export function generateStaticParams() {
  return mockHomework.map(hw => ({ id: hw.id }))
}

export default function HomeworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const hw = mockHomework.find(h => h.id === id)

  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(mockCompletions.filter(c => c.homework_id === id).map(c => c.student_id))
  )

  function toggleComplete(studentId: string) {
    setCompletedIds(prev => {
      const next = new Set(prev)
      if (next.has(studentId)) next.delete(studentId)
      else next.add(studentId)
      return next
    })
  }

  if (!hw) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Homework not found</p>
        <Link href="/homework">
          <Button variant="ghost" className="mt-4">Back</Button>
        </Link>
      </div>
    )
  }

  const isOverdue = hw.due_date && new Date(hw.due_date) < new Date()
  const groupStudents = mockStudents.slice(0, 4) // In real app: filter by group

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/homework">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold flex-1 truncate">{hw.title}</h2>
      </div>

      {/* Details card */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {hw.group?.name}
            </Badge>
            {hw.due_date && (
              <Badge variant={isOverdue ? 'destructive' : 'outline'} className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Due {new Date(hw.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </Badge>
            )}
          </div>

          {hw.description && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm leading-relaxed">{hw.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student completions (teacher view) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>Student Progress</span>
            <Badge>
              {completedIds.size}/{groupStudents.length} done
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {groupStudents.map(student => {
            const done = completedIds.has(student.id)
            return (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                    {student.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="text-sm font-medium">{student.full_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {done ? (
                    <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Done
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                  )}
                  <Checkbox
                    checked={done}
                    onCheckedChange={() => toggleComplete(student.id)}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
