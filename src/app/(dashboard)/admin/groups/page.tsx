'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus, Users, GraduationCap, Trash2 } from 'lucide-react'
import { mockGroups, mockStudents } from '@/lib/mock-data'
import type { Group } from '@/types'

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState<Group[]>(mockGroups)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', level: '' })

  function createGroup() {
    if (!form.name) return
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: form.name,
      level: form.level,
      teacher_id: 'teacher-1',
      teacher: { id: 'teacher-1', full_name: 'Ms. Olena', role: 'teacher' },
    }
    setGroups(g => [...g, newGroup])
    setForm({ name: '', level: '' })
    setOpen(false)
  }

  function deleteGroup(id: string) {
    setGroups(g => g.filter(gr => gr.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Groups</h2>
          <p className="text-muted-foreground text-sm mt-1">Manage class groups and students</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Group
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Group Name</Label>
              <Input
                placeholder="e.g. Kids A1"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Input
                placeholder="e.g. Beginner"
                value={form.level}
                onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
              />
            </div>
            <Button onClick={createGroup} className="w-full" disabled={!form.name}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid md:grid-cols-2 gap-4">
        {groups.map(group => (
          <Card key={group.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  {group.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{group.level}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteGroup(group.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  Teacher: {group.teacher?.full_name}
                </span>
                <span>{mockStudents.slice(0, 2).length} students</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
