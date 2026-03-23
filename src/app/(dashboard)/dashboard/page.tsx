'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, CheckCircle2, Clock, Circle, Star, TrendingUp } from 'lucide-react'
import { mockSchedule, mockHomework, mockCompletions, mockGroups, DAY_NAMES_FULL } from '@/lib/mock-data'

const STUDENT_ID = 'student-1'
const STUDENT_NAME = 'Anna'
const STUDENT_GROUP_ID = 'group-1'

const today = new Date()
const todayDow = today.getDay() === 0 ? 7 : today.getDay()

const studentGroup = mockGroups.find(g => g.id === STUDENT_GROUP_ID)
const todaySlots = mockSchedule.filter(s => s.group_id === STUDENT_GROUP_ID && s.day_of_week === todayDow)

const upcomingSlot = (() => {
  for (let offset = 1; offset <= 7; offset++) {
    const dow = ((todayDow - 1 + offset) % 7) + 1
    const slot = mockSchedule.find(s => s.group_id === STUDENT_GROUP_ID && s.day_of_week === dow)
    if (slot) return { slot, dayName: DAY_NAMES_FULL[dow] }
  }
  return null
})()

const myHomework = mockHomework.filter(hw => hw.group_id === STUDENT_GROUP_ID)
const completedIds = new Set(mockCompletions.filter(c => c.student_id === STUDENT_ID).map(c => c.homework_id))
const pendingHw = myHomework.filter(hw => !completedIds.has(hw.id))
const doneHw = myHomework.filter(hw => completedIds.has(hw.id))

function isOverdue(dueDate?: string) {
  if (!dueDate) return false
  return new Date(dueDate) < today
}

const greeting = (() => {
  const h = today.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})()

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (!session) return
    if (session.role === 'admin') router.replace('/admin')
    else if (session.role === 'teacher') router.replace('/schedule')
  }, [router])

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>
            {greeting}, {STUDENT_NAME} 👋
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {studentGroup && (
          <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1 flex-shrink-0">
            {studentGroup.name} · {studentGroup.level}
          </Badge>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myHomework.length}</p>
                <p className="text-xs text-muted-foreground">Total tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{doneHw.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {myHomework.length > 0 ? Math.round((doneHw.length / myHomework.length) * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Today / Next lesson */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {todaySlots.length > 0 ? "Today's Lesson" : 'Next Lesson'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaySlots.length > 0 ? (
              <div className="space-y-2">
                {todaySlots.map(slot => (
                  <div key={slot.id} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/15">
                    <div>
                      <p className="font-semibold text-sm text-primary">{slot.group?.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{slot.room}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        <Clock className="w-3 h-3 mr-1" />
                        {slot.start_time}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">until {slot.end_time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingSlot ? (
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted border border-border">
                <div>
                  <p className="font-semibold text-sm">{upcomingSlot.slot.group?.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{upcomingSlot.dayName} · {upcomingSlot.slot.room}</p>
                </div>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {upcomingSlot.slot.start_time}
                </Badge>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-6">No upcoming lessons</p>
            )}
          </CardContent>
        </Card>

        {/* Homework */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              My Homework
              {pendingHw.length > 0 && (
                <Badge className="ml-auto bg-amber-100 text-amber-700 border-amber-200 text-xs">
                  {pendingHw.length} pending
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {myHomework.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-6">No homework yet 🎉</p>
              )}
              {myHomework.map(hw => {
                const done = completedIds.has(hw.id)
                const overdue = !done && isOverdue(hw.due_date)
                return (
                  <div
                    key={hw.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                      done ? 'bg-emerald-50/60 border-emerald-100'
                      : overdue ? 'bg-red-50/60 border-red-100'
                      : 'bg-muted/40 border-border'
                    }`}
                  >
                    {done
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      : <Circle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${overdue ? 'text-red-400' : 'text-muted-foreground/40'}`} />
                    }
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium leading-snug ${done ? 'line-through text-muted-foreground' : ''}`}>
                        {hw.title}
                      </p>
                      {hw.due_date && (
                        <p className={`text-xs mt-0.5 ${overdue ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                          {overdue ? 'Overdue · ' : 'Due '}
                          {new Date(hw.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                    {done && <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 fill-amber-400 mt-0.5" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
