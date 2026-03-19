import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Calendar, Users } from 'lucide-react'
import { mockHomework } from '@/lib/mock-data'

function isOverdue(dueDate?: string) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

export default function HomeworkPage() {
  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>Homework</h2>
        <p className="text-muted-foreground text-sm mt-1">All assignments for your group</p>
      </div>

      {/* List */}
      <div className="space-y-3">
        {mockHomework.map(hw => {
          const overdue = isOverdue(hw.due_date)
          return (
            <Link key={hw.id} href={`/homework/${hw.id}`}>
              <Card
                className="border border-border/60 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer rounded-2xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex items-stretch">
                    {/* Accent bar */}
                    <div
                      className="w-1 flex-shrink-0"
                      style={{ background: overdue ? '#E11D2E' : '#6B3A3A' }}
                    />

                    <div className="flex-1 flex items-start justify-between gap-3 p-4">
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Icon */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: overdue ? 'rgba(225,29,46,0.08)' : 'rgba(107,58,58,0.10)' }}
                        >
                          <BookOpen
                            className="w-4 h-4"
                            style={{ color: overdue ? '#E11D2E' : '#6B3A3A' }}
                          />
                        </div>

                        {/* Text */}
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground" style={{ letterSpacing: '-0.01em' }}>
                            {hw.title}
                          </p>
                          {hw.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {hw.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2.5">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {hw.group?.name}
                            </span>
                            {hw.due_date && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {new Date(hw.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="flex-shrink-0 mt-0.5">
                        {overdue ? (
                          <Badge className="text-xs bg-red-50 text-red-600 border border-red-200">
                            Overdue
                          </Badge>
                        ) : (
                          <Badge className="text-xs bg-primary/10 text-primary border border-primary/20">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
