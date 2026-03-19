'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    { name: t.testimonials.t1Name, role: t.testimonials.t1Role, quote: t.testimonials.t1Quote },
    { name: t.testimonials.t2Name, role: t.testimonials.t2Role, quote: t.testimonials.t2Quote },
    { name: t.testimonials.t3Name, role: t.testimonials.t3Role, quote: t.testimonials.t3Quote },
  ]

  return (
    <section className="py-20" style={{ background: 'rgba(250,245,245,0.72)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">{t.testimonials.badge}</Badge>
          <h2 className="text-4xl font-semibold" style={{ letterSpacing: '-0.02em' }}>{t.testimonials.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, quote }) => (
            <Card key={name} className="border border-border/60 shadow-sm" style={{ background: '#fff' }}>
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E11D2E] text-[#E11D2E]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{quote}"</p>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
