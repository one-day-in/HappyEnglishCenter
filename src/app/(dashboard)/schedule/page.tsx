'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Clock, DoorOpen, Users, BookOpenText, X, Plus, Pencil, Trash2, Calendar, BookOpen } from 'lucide-react'
import { mockSchedule, mockHomework, mockCompletions, DAY_NAMES, DAY_NAMES_FULL } from '@/lib/mock-data'
import type { ScheduleSlot } from '@/types'
import { getSession } from '@/lib/auth'

/* ── colours ──────────────────────────────────────────────────── */
const COLORS = [
  { bar: '#6B3A3A', chip: 'bg-[#6B3A3A]/10 text-[#6B3A3A] border-[#6B3A3A]/20' },
  { bar: '#1D6FA4', chip: 'bg-blue-50 text-blue-700 border-blue-200' },
  { bar: '#15803D', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { bar: '#B45309', chip: 'bg-amber-50 text-amber-700 border-amber-200' },
  { bar: '#7C3AED', chip: 'bg-violet-50 text-violet-700 border-violet-200' },
]

const today = new Date()
const todayDow = today.getDay() === 0 ? 7 : today.getDay()
const DAYS = [1, 2, 3, 4, 5, 6, 7]

/* ── Student group & data ─────────────────────────────────────── */
const STUDENT_GROUP_ID = 'group-1'
const STUDENT_ID = 'student-1'

const studentSlots = mockSchedule.filter(s => s.group_id === STUDENT_GROUP_ID)
const studentHomework = mockHomework.filter(hw => hw.group_id === STUDENT_GROUP_ID)
const completedIds = new Set(
  mockCompletions.filter(c => c.student_id === STUDENT_ID).map(c => c.homework_id)
)

function isOverdue(d?: string) { return d ? new Date(d) < today : false }

/* ── Lesson detail card (read-only for students) ──────────────── */
function LessonDetailCard({ slot, idx }: { slot: ScheduleSlot; idx: number }) {
  const color = COLORS[idx % COLORS.length]
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden flex">
      <div className="w-1 flex-shrink-0" style={{ background: color.bar }} />
      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">#{idx + 1}</span>
          <span className="font-bold text-sm">{slot.class_code ?? slot.group?.name}</span>
          {slot.curriculum && <span className="text-xs text-muted-foreground">({slot.curriculum})</span>}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-3">
          <span className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            {slot.start_time} – {slot.end_time}
            {slot.duration && <span className="text-xs font-normal text-muted-foreground">({slot.duration}h)</span>}
          </span>
          {slot.room && (
            <>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <DoorOpen className="w-3.5 h-3.5" /> Room {slot.room}
              </span>
            </>
          )}
        </div>
        {slot.teacher_main && (
          <div className="flex items-center gap-2 text-sm mb-3">
            <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="font-medium">{slot.teacher_main}</span>
            {slot.teacher_assistant && (
              <>
                <span className="text-muted-foreground/40 text-xs">+</span>
                <span className="text-muted-foreground">{slot.teacher_assistant}</span>
              </>
            )}
          </div>
        )}
        {slot.content && slot.content.length > 0 && (
          <div className="pt-3 border-t border-border/60">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Lesson Content</p>
            <ul className="space-y-1.5">
              {slot.content.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color.bar, opacity: 0.65 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   STUDENT VIEW — this week only, read-only, with Homework tab
══════════════════════════════════════════════════════════════ */
function StudentScheduleView() {
  const [tab, setTab] = useState<'schedule' | 'homework'>('schedule')
  const [openDay, setOpenDay] = useState<number | null>(null)

  const daysWithLessons = DAYS.filter(d => studentSlots.some(s => s.day_of_week === d))
  const openSlots = openDay
    ? studentSlots.filter(s => s.day_of_week === openDay).sort((a, b) => a.start_time.localeCompare(b.start_time))
    : []

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>My Schedule</h2>
        <p className="text-muted-foreground text-sm mt-1">Your lessons this week</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted/60 rounded-xl w-fit border border-border/60">
        {(['schedule', 'homework'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t
                ? 'bg-white shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'schedule' ? 'Schedule' : 'Homework'}
            {t === 'homework' && studentHomework.filter(h => !completedIds.has(h.id)).length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold">
                {studentHomework.filter(h => !completedIds.has(h.id)).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── SCHEDULE TAB ── */}
      {tab === 'schedule' && (
        <>
          {/* Week grid — only days with lessons */}
          <div className={`grid gap-3 ${daysWithLessons.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3 md:grid-cols-7'}`}>
            {daysWithLessons.map(dow => {
              const daySlots = studentSlots.filter(s => s.day_of_week === dow).sort((a, b) => a.start_time.localeCompare(b.start_time))
              const isToday = dow === todayDow
              return (
                <button
                  key={dow}
                  onClick={() => setOpenDay(dow)}
                  className={`relative flex flex-col rounded-2xl border text-left transition-all duration-150 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${
                    isToday ? 'border-primary/40 bg-primary/[0.03] hover:border-primary/60' : 'border-border bg-white'
                  }`}
                  style={{ minHeight: '9rem' }}
                >
                  <div className={`px-3 pt-2.5 pb-2 border-b flex items-center justify-between ${isToday ? 'border-primary/20' : 'border-border/60'}`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                      {DAY_NAMES[dow]}
                    </span>
                    {isToday && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <div className="flex-1 p-2 space-y-1.5">
                    {daySlots.map((slot, i) => {
                      const color = COLORS[i % COLORS.length]
                      return (
                        <div key={slot.id} className={`rounded-lg border px-2 py-1.5 ${color.chip}`}>
                          <p className="text-[10px] font-bold truncate leading-tight">{slot.class_code ?? slot.group?.name}</p>
                          <p className="text-[10px] opacity-70 leading-tight mt-0.5">{slot.start_time} – {slot.end_time}</p>
                        </div>
                      )
                    })}
                  </div>
                  <div className="px-3 pb-2.5">
                    <span className="text-[10px] text-muted-foreground">{daySlots.length} lesson{daySlots.length !== 1 ? 's' : ''}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {daysWithLessons.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center text-muted-foreground text-sm">
                No lessons scheduled for this week
              </CardContent>
            </Card>
          )}

          {/* Day detail sheet — read-only for student */}
          <Sheet open={openDay !== null} onOpenChange={o => { if (!o) setOpenDay(null) }}>
            <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0" showCloseButton={false}>
              <SheetHeader className="sticky top-0 z-10 bg-[#FDFAF9] border-b border-border px-5 py-4 flex-row items-center justify-between">
                <div>
                  <SheetTitle className="text-lg font-bold" style={{ letterSpacing: '-0.01em' }}>
                    {openDay ? DAY_NAMES_FULL[openDay] : ''}
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{openSlots.length} lesson{openSlots.length !== 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => setOpenDay(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </SheetHeader>
              <div className="p-5 space-y-4">
                {openSlots.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <BookOpenText className="w-8 h-8 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">No lessons this day</p>
                  </div>
                ) : (
                  openSlots.map((slot, idx) => (
                    <LessonDetailCard key={slot.id} slot={slot} idx={idx} />
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}

      {/* ── HOMEWORK TAB ── */}
      {tab === 'homework' && (
        <div className="space-y-3">
          {studentHomework.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center text-muted-foreground text-sm">No homework yet 🎉</CardContent>
            </Card>
          ) : (
            studentHomework.map(hw => {
              const done = completedIds.has(hw.id)
              const overdue = !done && isOverdue(hw.due_date)
              return (
                <Card key={hw.id} className={`border shadow-sm rounded-2xl overflow-hidden ${
                  done ? 'border-emerald-100' : overdue ? 'border-red-100' : 'border-border/60'
                }`} style={{ background: '#fff' }}>
                  <CardContent className="p-0">
                    <div className="flex items-stretch">
                      <div className="w-1 flex-shrink-0" style={{ background: done ? '#10B981' : overdue ? '#E11D2E' : '#6B3A3A' }} />
                      <div className="flex-1 flex items-start justify-between gap-3 p-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: done ? 'rgba(16,185,129,0.08)' : overdue ? 'rgba(225,29,46,0.08)' : 'rgba(107,58,58,0.10)' }}>
                            <BookOpen className="w-4 h-4" style={{ color: done ? '#10B981' : overdue ? '#E11D2E' : '#6B3A3A' }} />
                          </div>
                          <div className="min-w-0">
                            <p className={`font-semibold text-sm ${done ? 'line-through text-muted-foreground' : ''}`}>
                              {hw.title}
                            </p>
                            {hw.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{hw.description}</p>
                            )}
                            {hw.due_date && (
                              <div className="flex items-center gap-1 mt-2">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className={`text-xs ${overdue ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                                  {overdue ? 'Overdue · ' : 'Due '}
                                  {new Date(hw.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {done ? (
                            <Badge className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">Done</Badge>
                          ) : overdue ? (
                            <Badge className="text-xs bg-red-50 text-red-600 border border-red-200">Overdue</Badge>
                          ) : (
                            <Badge className="text-xs bg-primary/10 text-primary border border-primary/20">Pending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   TEACHER / ADMIN VIEW — full editable schedule
══════════════════════════════════════════════════════════════ */
function calcDuration(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return Math.round(((eh + em / 60) - (sh + sm / 60)) * 100) / 100
}

function blankSlot(dow: number): Partial<ScheduleSlot> {
  return { group_id: 'group-1', day_of_week: dow, start_time: '09:00', end_time: '10:30', room: '', class_code: '', curriculum: '', teacher_main: '', teacher_assistant: '', content: [] }
}

function LessonCard({ slot, idx, onEdit, onDelete }: { slot: ScheduleSlot; idx: number; onEdit: () => void; onDelete: () => void }) {
  const color = COLORS[idx % COLORS.length]
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden flex group">
      <div className="w-1 flex-shrink-0" style={{ background: color.bar }} />
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">#{idx + 1}</span>
            <span className="font-bold text-sm">{slot.class_code ?? slot.group?.name}</span>
            {slot.curriculum && <span className="text-xs text-muted-foreground">({slot.curriculum})</span>}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button onClick={onEdit} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button onClick={onDelete} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-3">
          <span className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            {slot.start_time} – {slot.end_time}
            {slot.duration && <span className="text-xs font-normal text-muted-foreground">({slot.duration}h)</span>}
          </span>
          {slot.room && (
            <>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-1.5 text-muted-foreground"><DoorOpen className="w-3.5 h-3.5" /> Room {slot.room}</span>
            </>
          )}
        </div>
        {slot.teacher_main && (
          <div className="flex items-center gap-2 text-sm mb-3">
            <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="font-medium">{slot.teacher_main}</span>
            {slot.teacher_assistant && (
              <><span className="text-muted-foreground/40 text-xs">+</span><span className="text-muted-foreground">{slot.teacher_assistant}</span></>
            )}
          </div>
        )}
        {slot.content && slot.content.length > 0 && (
          <div className="pt-3 border-t border-border/60">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Lesson Content</p>
            <ul className="space-y-1.5">
              {slot.content.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color.bar, opacity: 0.65 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function EditDialog({ slot, open, onClose, onSave }: { slot: Partial<ScheduleSlot> | null; open: boolean; onClose: () => void; onSave: (s: Partial<ScheduleSlot>) => void }) {
  const [form, setForm] = useState<Partial<ScheduleSlot>>(slot ?? {})
  useState(() => { setForm(slot ?? {}) })
  if (!open || !slot) return null

  function field(key: keyof ScheduleSlot, value: string | number | undefined) { setForm(f => ({ ...f, [key]: value })) }
  function handleSave() {
    const duration = form.start_time && form.end_time ? calcDuration(form.start_time, form.end_time) : form.duration
    onSave({ ...form, duration })
  }
  const contentText = (form.content ?? []).join('\n')
  const isNew = !form.id

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent className="sm:max-w-md p-0 gap-0 rounded-2xl overflow-hidden" showCloseButton={false}>
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border flex-row items-center justify-between">
          <DialogTitle className="text-base font-semibold" style={{ letterSpacing: '-0.01em' }}>{isNew ? 'Add Lesson' : 'Edit Lesson'}</DialogTitle>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"><X className="w-4 h-4" /></button>
        </DialogHeader>
        <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Class Code</Label>
              <Input placeholder="G1BK1K11" value={form.class_code ?? ''} onChange={e => field('class_code', e.target.value)} className="rounded-xl h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Curriculum / Book</Label>
              <Input placeholder="Super Minds 1" value={form.curriculum ?? ''} onChange={e => field('curriculum', e.target.value)} className="rounded-xl h-9 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Start Time</Label>
              <Input type="time" value={form.start_time ?? ''} onChange={e => field('start_time', e.target.value)} className="rounded-xl h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">End Time</Label>
              <Input type="time" value={form.end_time ?? ''} onChange={e => field('end_time', e.target.value)} className="rounded-xl h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Room</Label>
            <Input placeholder="110.1" value={form.room ?? ''} onChange={e => field('room', e.target.value)} className="rounded-xl h-9 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Main Teacher</Label>
              <Input placeholder="Mr Joey" value={form.teacher_main ?? ''} onChange={e => field('teacher_main', e.target.value)} className="rounded-xl h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Assistant</Label>
              <Input placeholder="Ms Quyen" value={form.teacher_assistant ?? ''} onChange={e => field('teacher_assistant', e.target.value)} className="rounded-xl h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Lesson Content <span className="ml-1 normal-case font-normal text-muted-foreground/60">(one item per line)</span>
            </Label>
            <textarea
              rows={5}
              placeholder={"Unit 6: The Old House\nCB: Page 76–77"}
              value={contentText}
              onChange={e => setForm(f => ({ ...f, content: e.target.value.split('\n').filter(l => l.trim()) }))}
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>
        <DialogFooter className="px-6 py-4 border-t border-border flex-row gap-2 justify-end bg-background rounded-b-2xl" showCloseButton={false}>
          <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button size="sm" onClick={handleSave} className="rounded-xl px-5">{isNew ? 'Add Lesson' : 'Save Changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TeacherScheduleView() {
  const [slots, setSlots] = useState<ScheduleSlot[]>(mockSchedule)
  const [openDay, setOpenDay] = useState<number | null>(null)
  const [editSlot, setEditSlot] = useState<Partial<ScheduleSlot> | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  function slotsForDay(dow: number) { return slots.filter(s => s.day_of_week === dow).sort((a, b) => a.start_time.localeCompare(b.start_time)) }
  const openSlots = openDay ? slotsForDay(openDay) : []

  function handleAdd() { setEditSlot(blankSlot(openDay!)); setEditDialogOpen(true) }
  function handleEdit(slot: ScheduleSlot) { setEditSlot({ ...slot }); setEditDialogOpen(true) }
  function handleDelete(id: string) { setSlots(s => s.filter(x => x.id !== id)) }
  function handleSave(updated: Partial<ScheduleSlot>) {
    if (updated.id) {
      setSlots(s => s.map(x => x.id === updated.id ? { ...x, ...updated } as ScheduleSlot : x))
    } else {
      const newSlot: ScheduleSlot = { id: `slot-${Date.now()}`, group_id: updated.group_id ?? 'group-1', day_of_week: updated.day_of_week!, start_time: updated.start_time ?? '09:00', end_time: updated.end_time ?? '10:30', ...updated }
      setSlots(s => [...s, newSlot])
    }
    setEditDialogOpen(false)
    setEditSlot(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>Schedule</h2>
        <p className="text-muted-foreground text-sm mt-1">Click a day to view or edit lessons</p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAYS.map(dow => {
          const daySlots = slotsForDay(dow)
          const isToday = dow === todayDow
          const isEmpty = daySlots.length === 0
          return (
            <button key={dow} onClick={() => setOpenDay(dow)}
              className={`relative flex flex-col rounded-2xl border text-left transition-all duration-150 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${isToday ? 'border-primary/40 bg-primary/[0.03]' : 'border-border bg-white'}`}
              style={{ minHeight: '9rem' }}>
              <div className={`px-2.5 pt-2.5 pb-2 border-b flex items-center justify-between ${isToday ? 'border-primary/20' : 'border-border/60'}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{DAY_NAMES[dow]}</span>
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
              </div>
              <div className="flex-1 p-2 space-y-1.5">
                {isEmpty ? (
                  <div className="flex items-center justify-center h-full pt-3"><Plus className="w-3.5 h-3.5 text-muted-foreground/30" /></div>
                ) : (
                  daySlots.map((slot, i) => {
                    const color = COLORS[i % COLORS.length]
                    return (
                      <div key={slot.id} className={`rounded-lg border px-2 py-1.5 ${color.chip}`}>
                        <p className="text-[10px] font-bold truncate leading-tight">{slot.class_code ?? slot.group?.name}</p>
                        <p className="text-[10px] opacity-70 leading-tight mt-0.5">{slot.start_time}</p>
                      </div>
                    )
                  })
                )}
              </div>
              <div className="px-2.5 pb-2.5">
                <span className="text-[10px] text-muted-foreground">{isEmpty ? 'Add lesson' : `${daySlots.length} lesson${daySlots.length > 1 ? 's' : ''}`}</span>
              </div>
            </button>
          )
        })}
      </div>

      <Sheet open={openDay !== null} onOpenChange={open => { if (!open) setOpenDay(null) }}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0" showCloseButton={false}>
          <SheetHeader className="sticky top-0 z-10 bg-[#FDFAF9] border-b border-border px-5 py-4 flex-row items-center justify-between">
            <div>
              <SheetTitle className="text-lg font-bold" style={{ letterSpacing: '-0.01em' }}>{openDay ? DAY_NAMES_FULL[openDay] : ''}</SheetTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{openSlots.length} lesson{openSlots.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleAdd} className="rounded-xl gap-1.5 h-8 text-xs"><Plus className="w-3.5 h-3.5" /> Add Lesson</Button>
              <button onClick={() => setOpenDay(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"><X className="w-4 h-4" /></button>
            </div>
          </SheetHeader>
          <div className="p-5 space-y-4">
            {openSlots.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <BookOpenText className="w-8 h-8 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground mb-4">No lessons this day</p>
                <Button size="sm" onClick={handleAdd} className="rounded-xl gap-1.5"><Plus className="w-3.5 h-3.5" /> Add First Lesson</Button>
              </div>
            ) : (
              openSlots.map((slot, idx) => (
                <LessonCard key={slot.id} slot={slot} idx={idx} onEdit={() => handleEdit(slot)} onDelete={() => handleDelete(slot.id)} />
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>

      <EditDialog slot={editSlot} open={editDialogOpen} onClose={() => { setEditDialogOpen(false); setEditSlot(null) }} onSave={handleSave} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   ROOT — role router
══════════════════════════════════════════════════════════════ */
export default function SchedulePage() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const session = getSession()
    setRole(session?.role ?? 'student')
  }, [])

  if (role === null) return null
  if (role === 'student') return <StudentScheduleView />
  return <TeacherScheduleView />
}
