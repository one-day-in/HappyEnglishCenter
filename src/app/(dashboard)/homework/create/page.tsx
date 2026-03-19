'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { mockGroups } from '@/lib/mock-data'

export default function CreateHomeworkPage() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    group_id: '',
    due_date: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In real app: POST to Supabase
    setSaved(true)
    setTimeout(() => router.push('/homework'), 1500)
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Homework created!</h3>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/homework">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">Create Homework</h2>
          <p className="text-muted-foreground text-sm">Assign a task to a group</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Assignment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Learn 10 new words"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Explain what students need to do..."
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Group *</Label>
              <Select
                value={form.group_id}
                onValueChange={v => { if (v) setForm(f => ({ ...f, group_id: v })) }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {mockGroups.map(g => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name} — {g.level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={form.due_date}
                onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
              />
            </div>

            <Button type="submit" className="w-full" disabled={!form.title || !form.group_id}>
              Create Assignment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
