'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus, Trash2, Pencil, BookOpen, Calendar } from 'lucide-react'
import { mockHomework, mockGroups } from '@/lib/mock-data'
import type { Homework } from '@/types'

type HomeworkStatus = 'pending' | 'completed' | 'overdue'

interface AdminHomework extends Homework {
  status: HomeworkStatus
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  overdue:   'bg-red-50 text-red-700 border-red-200',
}

const emptyForm = { title: '', description: '', due_date: '', group_id: '', status: 'pending' as HomeworkStatus }

// Seed status based on due_date relative to today
function seedStatus(hw: Homework): HomeworkStatus {
  if (!hw.due_date) return 'pending'
  const due = new Date(hw.due_date)
  const now = new Date()
  return due < now ? 'overdue' : 'pending'
}

export default function AdminHomeworkPage() {
  const [items, setItems] = useState<AdminHomework[]>(
    mockHomework.map(hw => ({ ...hw, status: seedStatus(hw) }))
  )
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<AdminHomework | null>(null)
  const [form, setForm] = useState(emptyForm)

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  function openEdit(hw: AdminHomework) {
    setEditing(hw)
    setForm({
      title: hw.title,
      description: hw.description ?? '',
      due_date: hw.due_date ?? '',
      group_id: hw.group_id,
      status: hw.status,
    })
    setOpen(true)
  }

  function save() {
    if (!form.title || !form.due_date || !form.group_id) return
    const group = mockGroups.find(g => g.id === form.group_id)
    if (editing) {
      setItems(list =>
        list.map(h =>
          h.id === editing.id
            ? { ...editing, ...form, group }
            : h
        )
      )
    } else {
      const newHw: AdminHomework = {
        id: `hw-${Date.now()}`,
        teacher_id: '',
        created_at: new Date().toISOString(),
        ...form,
        group,
      }
      setItems(list => [...list, newHw])
    }
    setOpen(false)
  }

  function remove(id: string) {
    setItems(list => list.filter(h => h.id !== id))
  }

  const f =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold" style={{ letterSpacing: '-0.02em' }}>Homework</h2>
          <p className="text-sm text-muted-foreground mt-1">Create and manage assignments for all groups</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Assignment
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Assignment' : 'New Assignment'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input placeholder="e.g. Read Unit 5" value={form.title} onChange={f('title')} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                placeholder="Details, pages, instructions..."
                value={form.description}
                onChange={f('description')}
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Group</Label>
                <Select value={form.group_id} onValueChange={v => setForm(p => ({ ...p, group_id: v ?? '' }))}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Group" /></SelectTrigger>
                  <SelectContent>
                    {mockGroups.map(g => (
                      <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Due date</Label>
                <Input type="date" value={form.due_date} onChange={f('due_date')} className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as HomeworkStatus }))}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={save}
              className="w-full"
              disabled={!form.title || !form.due_date || !form.group_id}
            >
              {editing ? 'Save Changes' : 'Create Assignment'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* List */}
      <div className="space-y-3">
        {items.length === 0 && (
          <Card className="border-dashed border-border/60">
            <CardContent className="p-10 text-center text-muted-foreground text-sm">
              No assignments yet. Click &quot;Add Assignment&quot; to create one.
            </CardContent>
          </Card>
        )}
        {items.map(hw => (
          <Card key={hw.id} className="border border-border/60 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm">{hw.title}</p>
                  <Badge className={`text-[10px] px-2 py-0 border rounded-full font-medium ${STATUS_COLORS[hw.status] ?? ''}`}>
                    {hw.status}
                  </Badge>
                </div>
                {hw.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{hw.description}</p>
                )}
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] text-muted-foreground">{hw.group?.name ?? hw.group_id}</span>
                  {hw.due_date && (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {hw.due_date}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-primary"
                  onClick={() => openEdit(hw)}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-destructive"
                  onClick={() => remove(hw.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
