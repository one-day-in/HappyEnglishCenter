'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus, Trash2, FileText, Link as LinkIcon, BookOpen } from 'lucide-react'

interface Material {
  id: string
  title: string
  type: 'pdf' | 'link' | 'note'
  url?: string
  group: string
  addedAt: string
}

const INITIAL: Material[] = [
  { id: '1', title: 'Super Minds 1 — Unit 6 worksheets', type: 'pdf',  group: 'G1BK1K11',    addedAt: '2026-03-10' },
  { id: '2', title: 'Phonics songs playlist',             type: 'link', url: 'https://youtube.com', group: 'F1A2K10K11', addedAt: '2026-03-12' },
  { id: '3', title: 'Cambridge KET vocabulary list',      type: 'pdf',  group: 'G5AB2M1',     addedAt: '2026-03-15' },
  { id: '4', title: 'Unit 4 grammar notes',               type: 'note', group: 'G3BK9K12',    addedAt: '2026-03-18' },
]

const TYPE_ICON = { pdf: FileText, link: LinkIcon, note: BookOpen }
const TYPE_COLOR: Record<string, string> = { pdf: '#E11D2E', link: '#0369A1', note: '#059669' }

const emptyForm = { title: '', type: 'note' as Material['type'], url: '', group: '' }

export default function MaterialsPage() {
  const [items, setItems] = useState<Material[]>(INITIAL)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function add() {
    if (!form.title || !form.group) return
    setItems(list => [
      ...list,
      { id: `m-${Date.now()}`, ...form, addedAt: new Date().toISOString().slice(0, 10) },
    ])
    setForm(emptyForm)
    setOpen(false)
  }

  function remove(id: string) {
    setItems(list => list.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold" style={{ letterSpacing: '-0.02em' }}>Materials</h2>
          <p className="text-sm text-muted-foreground mt-1">Lesson resources, worksheets, and links</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Material
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Material</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                placeholder="e.g. Unit 5 worksheets"
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v as Material['type'] }))}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF / File</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Group</Label>
                <Input
                  placeholder="e.g. G1BK1K11"
                  value={form.group}
                  onChange={e => setForm(p => ({ ...p, group: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
            </div>
            {form.type === 'link' && (
              <div className="space-y-1.5">
                <Label>URL</Label>
                <Input
                  placeholder="https://..."
                  value={form.url}
                  onChange={e => setForm(p => ({ ...p, url: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
            )}
            <Button onClick={add} className="w-full" disabled={!form.title || !form.group}>
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {items.map(item => {
          const Icon = TYPE_ICON[item.type]
          const color = TYPE_COLOR[item.type]
          return (
            <Card key={item.id} className="border border-border/60 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: color + '15' }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-[10px] px-1.5">
                      {item.type.toUpperCase()}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{item.group}</span>
                    <span className="text-[11px] text-muted-foreground">{item.addedAt}</span>
                  </div>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline mr-2"
                  >
                    Open
                  </a>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                  onClick={() => remove(item.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
