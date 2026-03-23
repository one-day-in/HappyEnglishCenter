'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import {
  Calendar, BookOpen, Users, UserCheck,
  Clock, DoorOpen, Plus, Pencil, Trash2, X, BookOpenText,
  Mail,
} from 'lucide-react'
import { BRANCHES, branchMockData, DAY_NAMES, DAY_NAMES_FULL } from '@/lib/mock-data'
import type { ScheduleSlot, Homework } from '@/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/* ── colour palette for lessons ── */
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

function calcDur(s: string, e: string) {
  const [sh, sm] = s.split(':').map(Number)
  const [eh, em] = e.split(':').map(Number)
  return Math.round(((eh + em / 60) - (sh + sm / 60)) * 100) / 100
}

/* ══ SCHEDULE TAB ══════════════════════════════════════════════ */
function ScheduleTab({ branchId }: { branchId: string }) {
  const init = branchMockData[branchId]?.schedule ?? []
  const [slots, setSlots] = useState<ScheduleSlot[]>(init)
  const [openDay, setOpenDay] = useState<number | null>(null)
  const [editSlot, setEditSlot] = useState<Partial<ScheduleSlot> | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  function slotsForDay(d: number) { return slots.filter(s => s.day_of_week === d).sort((a, b) => a.start_time.localeCompare(b.start_time)) }
  const openSlots = openDay ? slotsForDay(openDay) : []

  function handleSave(updated: Partial<ScheduleSlot>) {
    if (updated.id) {
      setSlots(s => s.map(x => x.id === updated.id ? { ...x, ...updated } as ScheduleSlot : x))
    } else {
      setSlots(s => [...s, { id: `slot-${Date.now()}`, group_id: updated.group_id ?? '', day_of_week: updated.day_of_week!, start_time: updated.start_time ?? '09:00', end_time: updated.end_time ?? '10:30', ...updated } as ScheduleSlot])
    }
    setEditOpen(false); setEditSlot(null)
  }

  return (
    <div className="space-y-4">
      {/* 7-day grid */}
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map(dow => {
          const daySlots = slotsForDay(dow)
          const isToday = dow === todayDow
          return (
            <button key={dow} onClick={() => setOpenDay(dow)}
              className={`flex flex-col rounded-2xl border text-left transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden cursor-pointer ${isToday ? 'border-primary/40 bg-primary/[0.03]' : 'border-border bg-white'}`}
              style={{ minHeight: '8rem' }}>
              <div className={`px-2 pt-2 pb-1.5 border-b flex items-center justify-between ${isToday ? 'border-primary/20' : 'border-border/60'}`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{DAY_NAMES[dow]}</span>
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </div>
              <div className="flex-1 p-1.5 space-y-1">
                {daySlots.length === 0
                  ? <div className="flex items-center justify-center h-full"><Plus className="w-3 h-3 text-muted-foreground/30" /></div>
                  : daySlots.map((s, i) => (
                    <div key={s.id} className={`rounded px-1.5 py-1 border text-[9px] font-bold truncate ${COLORS[i % COLORS.length].chip}`}>
                      {s.class_code}<br /><span className="font-normal opacity-70">{s.start_time}</span>
                    </div>
                  ))
                }
              </div>
              <div className="px-2 pb-2">
                <span className="text-[9px] text-muted-foreground">{daySlots.length === 0 ? 'Add' : `${daySlots.length}×`}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Day sheet */}
      <Sheet open={openDay !== null} onOpenChange={o => { if (!o) setOpenDay(null) }}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0" showCloseButton={false}>
          <SheetHeader className="sticky top-0 z-10 bg-[#FDFAF9] border-b border-border px-5 py-4 flex-row items-center justify-between">
            <div>
              <SheetTitle className="text-base font-bold">{openDay ? DAY_NAMES_FULL[openDay] : ''}</SheetTitle>
              <p className="text-xs text-muted-foreground">{openSlots.length} lesson{openSlots.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => { setEditSlot({ day_of_week: openDay! }); setEditOpen(true) }} className="rounded-xl gap-1 h-8 text-xs">
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
              <button onClick={() => setOpenDay(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"><X className="w-4 h-4" /></button>
            </div>
          </SheetHeader>
          <div className="p-5 space-y-4">
            {openSlots.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <BookOpenText className="w-8 h-8 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground mb-3">No lessons</p>
                <Button size="sm" onClick={() => { setEditSlot({ day_of_week: openDay! }); setEditOpen(true) }} className="rounded-xl gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add First Lesson
                </Button>
              </div>
            ) : openSlots.map((slot, idx) => {
              const c = COLORS[idx % COLORS.length]
              return (
                <div key={slot.id} className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden flex group">
                  <div className="w-1 flex-shrink-0" style={{ background: c.bar }} />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{slot.class_code}</span>
                        {slot.curriculum && <Badge variant="secondary" className="text-xs">{slot.curriculum}</Badge>}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditSlot({ ...slot }); setEditOpen(true) }} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setSlots(s => s.filter(x => x.id !== slot.id))} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 text-sm mb-2">
                      <span className="flex items-center gap-1 font-semibold"><Clock className="w-3.5 h-3.5 text-muted-foreground" />{slot.start_time} – {slot.end_time}</span>
                      {slot.room && <span className="flex items-center gap-1 text-muted-foreground"><DoorOpen className="w-3.5 h-3.5" /> Room {slot.room}</span>}
                    </div>
                    {slot.teacher_main && (
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{slot.teacher_main}</span>
                        {slot.teacher_assistant && <span className="text-muted-foreground">+ {slot.teacher_assistant}</span>}
                      </div>
                    )}
                    {slot.content && slot.content.length > 0 && (
                      <div className="pt-2 border-t border-border/60">
                        <ul className="space-y-1">
                          {slot.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                              <span className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.bar, opacity: 0.6 }} />{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit dialog */}
      {editOpen && editSlot && (
        <Dialog open={editOpen} onOpenChange={v => { if (!v) { setEditOpen(false); setEditSlot(null) } }}>
          <DialogContent className="sm:max-w-md p-0 gap-0 rounded-2xl overflow-hidden" showCloseButton={false}>
            <DialogHeader className="px-6 pt-5 pb-4 border-b flex-row items-center justify-between">
              <DialogTitle className="text-base font-semibold">{editSlot.id ? 'Edit Lesson' : 'Add Lesson'}</DialogTitle>
              <button onClick={() => { setEditOpen(false); setEditSlot(null) }} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted"><X className="w-4 h-4" /></button>
            </DialogHeader>
            <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Class Code</Label><Input value={editSlot.class_code ?? ''} onChange={e => setEditSlot(f => ({ ...f, class_code: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
                <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Curriculum</Label><Input value={editSlot.curriculum ?? ''} onChange={e => setEditSlot(f => ({ ...f, curriculum: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Start</Label><Input type="time" value={editSlot.start_time ?? ''} onChange={e => setEditSlot(f => ({ ...f, start_time: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
                <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">End</Label><Input type="time" value={editSlot.end_time ?? ''} onChange={e => setEditSlot(f => ({ ...f, end_time: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
              </div>
              <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Room</Label><Input value={editSlot.room ?? ''} onChange={e => setEditSlot(f => ({ ...f, room: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Main Teacher</Label><Input value={editSlot.teacher_main ?? ''} onChange={e => setEditSlot(f => ({ ...f, teacher_main: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
                <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Assistant</Label><Input value={editSlot.teacher_assistant ?? ''} onChange={e => setEditSlot(f => ({ ...f, teacher_assistant: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Content <span className="normal-case font-normal">(one per line)</span></Label>
                <textarea rows={4} value={(editSlot.content ?? []).join('\n')} onChange={e => setEditSlot(f => ({ ...f, content: e.target.value.split('\n').filter(l => l.trim()) }))} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary resize-none" />
              </div>
            </div>
            <DialogFooter className="px-6 py-4 border-t flex-row gap-2 justify-end bg-background rounded-b-2xl" showCloseButton={false}>
              <Button variant="outline" size="sm" onClick={() => { setEditOpen(false); setEditSlot(null) }} className="rounded-xl">Cancel</Button>
              <Button size="sm" onClick={() => handleSave({ ...editSlot, duration: editSlot.start_time && editSlot.end_time ? calcDur(editSlot.start_time, editSlot.end_time) : editSlot.duration })} className="rounded-xl px-5">
                {editSlot.id ? 'Save Changes' : 'Add Lesson'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

/* ══ HOMEWORK TAB ══════════════════════════════════════════════ */
function HomeworkTab({ branchId }: { branchId: string }) {
  const init = branchMockData[branchId]?.homework ?? []
  const [items, setItems] = useState<Homework[]>(init)
  const [editItem, setEditItem] = useState<Partial<Homework> | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  function isOverdue(d?: string) { return d ? new Date(d) < today : false }

  function handleSave(hw: Partial<Homework>) {
    if (hw.id) {
      setItems(s => s.map(x => x.id === hw.id ? { ...x, ...hw } as Homework : x))
    } else {
      setItems(s => [...s, {
        id: `hw-${Date.now()}`,
        group_id: branchId,
        teacher_id: 'admin',
        title: hw.title ?? '',
        created_at: new Date().toISOString(),
        ...hw,
      } as Homework])
    }
    setEditOpen(false); setEditItem(null)
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} assignment{items.length !== 1 ? 's' : ''}</p>
        <Button size="sm" onClick={() => { setEditItem({}); setEditOpen(true) }} className="rounded-xl gap-1.5 h-8 text-xs">
          <Plus className="w-3.5 h-3.5" /> New Assignment
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="border-dashed"><CardContent className="py-16 text-center text-muted-foreground text-sm">No homework yet</CardContent></Card>
      ) : (
        items.map(hw => {
          const overdue = isOverdue(hw.due_date)
          return (
            <Card key={hw.id} className="border border-border/60 shadow-sm rounded-2xl overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-1 flex-shrink-0" style={{ background: overdue ? '#E11D2E' : '#6B3A3A' }} />
                  <div className="flex-1 p-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{hw.title}</p>
                      {hw.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{hw.description}</p>}
                      {hw.due_date && (
                        <p className={`text-xs mt-2 ${overdue ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                          {overdue ? '⚠ Overdue · ' : 'Due '}
                          {new Date(hw.due_date).toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' })}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button onClick={() => { setEditItem({ ...hw }); setEditOpen(true) }} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setItems(s => s.filter(x => x.id !== hw.id))} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })
      )}

      {/* Edit/Add dialog */}
      {editOpen && editItem && (
        <Dialog open={editOpen} onOpenChange={v => { if (!v) { setEditOpen(false); setEditItem(null) } }}>
          <DialogContent className="sm:max-w-md p-0 gap-0 rounded-2xl" showCloseButton={false}>
            <DialogHeader className="px-6 pt-5 pb-4 border-b flex-row items-center justify-between">
              <DialogTitle className="text-base font-semibold">{editItem.id ? 'Edit Assignment' : 'New Assignment'}</DialogTitle>
              <button onClick={() => { setEditOpen(false); setEditItem(null) }} className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted"><X className="w-4 h-4" /></button>
            </DialogHeader>
            <div className="px-6 py-5 space-y-4">
              <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Title</Label><Input value={editItem.title ?? ''} onChange={e => setEditItem(f => ({ ...f, title: e.target.value }))} className="rounded-xl h-9 text-sm" placeholder="Assignment title" /></div>
              <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Description</Label><textarea rows={3} value={editItem.description ?? ''} onChange={e => setEditItem(f => ({ ...f, description: e.target.value }))} className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary resize-none" /></div>
              <div className="space-y-1.5"><Label className="text-xs uppercase tracking-wide text-muted-foreground">Due Date</Label><Input type="date" value={editItem.due_date ?? ''} onChange={e => setEditItem(f => ({ ...f, due_date: e.target.value }))} className="rounded-xl h-9 text-sm" /></div>
            </div>
            <DialogFooter className="px-6 py-4 border-t flex-row gap-2 justify-end bg-background rounded-b-2xl" showCloseButton={false}>
              <Button variant="outline" size="sm" onClick={() => { setEditOpen(false); setEditItem(null) }} className="rounded-xl">Cancel</Button>
              <Button size="sm" onClick={() => handleSave(editItem)} className="rounded-xl px-5">{editItem.id ? 'Save' : 'Create'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

/* ══ GROUPS TAB ════════════════════════════════════════════════ */
function GroupsTab({ branchId }: { branchId: string }) {
  const data = branchMockData[branchId]
  return (
    <div className="space-y-4 max-w-2xl">
      {data?.groups.map(group => {
        const students = data.students
        return (
          <Card key={group.id} className="border border-border/60 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{group.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{group.level}</Badge>
                    <span className="text-xs text-muted-foreground">Teacher: {data.teachers.find(t => t.id === group.teacher_id)?.full_name ?? '—'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Users className="w-3.5 h-3.5" />
                  {students.length} students
                </div>
              </div>
              <div className="px-5 py-3">
                <div className="flex flex-wrap gap-2">
                  {students.map(s => (
                    <span key={s.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted text-xs font-medium">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        {s.full_name[0]}
                      </span>
                      {s.full_name}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

/* ══ STAFF TAB ═════════════════════════════════════════════════ */
function StaffTab({ branchId }: { branchId: string }) {
  const data = branchMockData[branchId]
  return (
    <div className="space-y-3 max-w-xl">
      {data?.teachers.map(teacher => (
        <Card key={teacher.id} className="border border-border/60 shadow-sm rounded-2xl">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-base font-bold flex-shrink-0" style={{ background: 'rgba(107,58,58,0.10)', color: '#6B3A3A' }}>
              {teacher.full_name.split(' ').pop()?.[0] ?? teacher.full_name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{teacher.full_name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Mail className="w-3 h-3" />{teacher.email}
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Teacher</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* ══ MAIN BRANCH CLIENT ════════════════════════════════════════ */
type Tab = 'schedule' | 'homework' | 'staff'

export default function BranchClient({ slug }: { slug: string }) {
  const { t } = useLanguage()

  const searchParams = useSearchParams()
  const param = searchParams.get('tab')
  const tab: Tab = (param === 'homework' || param === 'staff') ? param : 'schedule'
  const branch = BRANCHES.find(b => b.id === slug)
  const data = branchMockData[slug]

  if (!branch || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-lg font-semibold mb-2">Branch not found</p>
        <Link href="/admin"><Button variant="outline" size="sm">← Back to Admin</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: branch.color }} />
            <h2 className="text-2xl font-bold" style={{ letterSpacing: '-0.02em' }}>{branch.name}</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{branch.address}</p>
        </div>

        {/* Branch stats */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { n: data.teachers.length, label: 'teachers' },
            { n: data.students.length, label: 'students' },
            { n: data.groups.length,   label: 'groups'   },
          ].map(({ n, label }) => (
            <div key={label} className="text-right">
              <p className="text-lg font-bold" style={{ color: branch.color, letterSpacing: '-0.02em' }}>{n}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === 'schedule' && <ScheduleTab branchId={slug} />}
      {tab === 'homework' && <HomeworkTab branchId={slug} />}
      {tab === 'staff'    && <StaffTab    branchId={slug} />}
    </div>
  )
}
