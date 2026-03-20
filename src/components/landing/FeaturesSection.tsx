'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, BookOpen, Users, GraduationCap, Bell, ClipboardList } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { BP } from '@/lib/asset'

export default function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    { icon: Calendar,      title: t.features.f1Title, desc: t.features.f1Desc },
    { icon: ClipboardList, title: t.features.f2Title, desc: t.features.f2Desc },
    { icon: Users,         title: t.features.f3Title, desc: t.features.f3Desc },
    { icon: GraduationCap, title: t.features.f4Title, desc: t.features.f4Desc },
    { icon: Bell,          title: t.features.f5Title, desc: t.features.f5Desc },
    { icon: BookOpen,      title: t.features.f6Title, desc: t.features.f6Desc },
  ]

  return (
    <section id="about" className="relative overflow-hidden py-20">
      {/* Background photo */}
      <img
        src={`${BP}/images/everything.webp`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Light overlay so cards remain readable */}
      <div className="absolute inset-0" style={{ background: 'rgba(250,245,245,0.82)' }} />

      {/* Editorial watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 leading-[0.82] pointer-events-none select-none whitespace-nowrap"
        style={{
          fontSize: '22vw',
          color: '#6B3A3A',
          opacity: 0.05,
          fontWeight: 300,
          fontFamily: '"Avenir Next", Montserrat, "Helvetica Neue", Arial, sans-serif',
          letterSpacing: '-0.04em',
          transform: 'translateY(28%)',
        }}
      >
        happy
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">{t.features.badge}</Badge>
          <h2 className="text-4xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
            {t.features.title}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            {t.features.sub}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: '#fff' }}
            >
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
