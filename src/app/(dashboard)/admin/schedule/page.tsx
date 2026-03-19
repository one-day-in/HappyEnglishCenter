'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Clock } from 'lucide-react'
import { mockSchedule, mockGroups, DAY_NAMES_FULL } from '@/lib/mock-data'
import type { ScheduleSlot } from '@/types'

export default function AdminSchedulePage() {
  const [slots, setSlots] = useState<ScheduleSlot[]>(mockSchedule)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    group_id: '',
    day_of_week: '',
    start_time: '',
    end_time: '',
    room: '',
  })

  function addSlot() {
    if (!form.group_id || !form.day_of_week || !form.start_time) return
    const group = mockGroups.find(g => g.id === form.group_id)
    const newSlot: ScheduleSlot = {
      id: `slot-${Date.now()}`,
      group_id: form.group_id,
      day_of_week: parseInt(form.day_of_week),
      start_time: form.start_time,
      end_time: form.end_time || '',
      room: form.room,
      group,
    }
    setSlots(s => [...s, newSlot])
    setForm({ group_id: '', day_of_week: '', start_time: '', end_time: '', room: '' })
    setOpen(false)
  }

  function deleteSlot(id: string) {
    setSlots(s => s.filter(sl => sl.id !== id))
  }

  const sortedSlots = [...slots].sort((a, b) => {
    if (a.day_of_week !== b.day_of_week) return a.day_of_week - b.day_of_week
    return a.start_time.localeCompare(b.start_time)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manage Schedule</h2>
          <p className="text-muted-foreground text-sm mt-1">Add and remove lesson slots</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Slot
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Lesson Slot</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Group</Label>
                <Select value={form.group_id} onValueChange={v => { if (v) setForm(f => ({ ...f, group_id: v })) }}>
                  <SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger>
                  <SelectContent>
                    {mockGroups.map(g => (
                      <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Day</Label>
                <Select value={form.day_of_week} onValueChange={v => { if (v) setForm(f => ({ ...f, day_of_week: v })) }}>
                  <SelectTrigger><SelectValue placeholder="Select day" /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7].map(d => (
                      <SelectItem key={d} value={String(d)}>{DAY_NAMES_FULL[d]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Start</Label>
                  <Input type="time" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>End</Label>
                  <Input type="time" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Room</Label>
                <Input placeholder="e.g. Room 1" value={form.room} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} />
              </div>
              <Button onClick={addSlot} className="w-full" disabled={!form.group_id || !form.day_of_week || !form.start_time}>
                Add Slot
              </Button>
            </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            All Lesson Slots ({slots.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sortedSlots.map(slot => (
            <div key={slot.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs w-12 justify-center">
                  {DAY_NAMES_FULL[slot.day_of_week].slice(0, 3)}
                </Badge>
                <div>
                  <p className="font-medium text-sm">{slot.group?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {slot.start_time}{slot.end_time ? ` – ${slot.end_time}` : ''}{slot.room ? ` · ${slot.room}` : ''}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-muted-foreground hover:text-destructive"
                onClick={() => deleteSlot(slot.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
