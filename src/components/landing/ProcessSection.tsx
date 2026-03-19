'use client'

import { Badge } from '@/components/ui/badge'
import { ClipboardCheck, Users, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function ProcessSection() {
  const { t } = useLanguage()

  const steps = [
    { number: '01', icon: ClipboardCheck, title: t.process.s1Title, desc: t.process.s1Desc },
    { number: '02', icon: Users,          title: t.process.s2Title, desc: t.process.s2Desc },
    { number: '03', icon: TrendingUp,     title: t.process.s3Title, desc: t.process.s3Desc },
  ]

  return (
    <section className="py-20" style={{ background: 'rgba(253,250,249,0.72)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">{t.process.badge}</Badge>
          <h2 className="text-4xl font-semibold" style={{ letterSpacing: '-0.02em' }}>{t.process.title}</h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">{t.process.sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map(({ number, icon: Icon, title, desc }) => (
            <div key={number}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold tracking-[0.15em]" style={{ color: '#6B3A3A', opacity: 0.45 }}>{number}</span>
                <div className="h-px flex-1" style={{ background: 'rgba(107,58,58,0.15)' }} />
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(107,58,58,0.08)', border: '1px solid rgba(107,58,58,0.14)' }}>
                <Icon className="w-6 h-6" style={{ color: '#6B3A3A' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
