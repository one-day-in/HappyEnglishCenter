'use client'

import { Badge } from '@/components/ui/badge'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { BP } from '@/lib/asset'

export default function FaqSection() {
  const { t } = useLanguage()

  const items = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ]

  return (
    <section id="faq" className="relative overflow-hidden py-20" style={{ background: 'rgba(253,250,249,0.72)' }}>
      {/* Decorative photo — right side, desktop only */}
      <div aria-hidden="true" className="absolute right-0 top-0 bottom-0 w-64 xl:w-80 hidden lg:block pointer-events-none">
        <img
          src={`${BP}/images/faq.webp`}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ opacity: 0.18, borderRadius: '2rem 0 0 2rem' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(253,250,249,1) 0%, rgba(253,250,249,0) 40%)', borderRadius: '2rem 0 0 2rem' }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">{t.faq.badge}</Badge>
          <h2 className="text-4xl font-semibold" style={{ letterSpacing: '-0.02em' }}>{t.faq.title}</h2>
        </div>
        <div className="space-y-3">
          {items.map(({ q, a }) => (
            <details key={q} className="group border border-border/70 rounded-2xl overflow-hidden shadow-sm" style={{ background: '#fff' }}>
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-medium text-sm select-none hover:bg-primary/[0.03] transition-colors">
                {q}
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-5 pt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/50">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
