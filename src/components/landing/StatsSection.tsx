'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    { value: t.stats.v1, label: t.stats.l1, detail: t.stats.d1 },
    { value: t.stats.v2, label: t.stats.l2, detail: t.stats.d2 },
    { value: t.stats.v3, label: t.stats.l3, detail: t.stats.d3 },
    { value: t.stats.v4, label: t.stats.l4, detail: t.stats.d4 },
  ]

  return (
    <section className="py-16 border-y border-border" style={{ background: 'rgba(253,250,249,0.72)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-border">
          {stats.map(({ value, label, detail }) => (
            <div key={label} className="text-center md:px-8">
              <p className="text-4xl md:text-5xl font-semibold mb-1" style={{ color: '#6B3A3A', letterSpacing: '-0.025em' }}>
                {value}
              </p>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
