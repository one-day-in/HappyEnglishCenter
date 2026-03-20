'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { BP } from '@/lib/asset'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: 'rgba(253,250,249,0.72)' }}
    >
      {/* Ambient background blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{ background: '#6B3A3A', opacity: 0.07 }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: '#6B3A3A', opacity: 0.05 }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text content */}
          <div className="hero-content">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium text-sm px-3 py-1 mb-6">
              {t.hero.badge}
            </Badge>

            <h1
              className="text-5xl md:text-[4.5rem] font-semibold leading-[1.04] mb-6"
              style={{ letterSpacing: '-0.028em' }}
            >
              {t.hero.title1}<br />
              <span style={{ color: '#6B3A3A' }}>{t.hero.title2}</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {t.hero.subtitle}
            </p>

            <ul className="space-y-2.5 mb-10">
              {[t.hero.h1, t.hero.h2, t.hero.h3].map((text) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#6B3A3A' }} />
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link href="#contact">
                <Button size="lg" className="font-medium text-base px-8 h-12">
                  {t.hero.btn1}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="#courses">
                <Button size="lg" variant="outline" className="font-medium text-base px-8 h-12">
                  {t.hero.btn2}
                </Button>
              </Link>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-10 pt-7 border-t border-border">
              {[
                { value: t.stats.v1, label: t.stats.l1 },
                { value: t.stats.v2, label: t.stats.l2 },
                { value: t.stats.v3, label: t.stats.l3 },
                { value: '4.9 ★',   label: t.hero.badge2Sub },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-semibold" style={{ color: '#6B3A3A', letterSpacing: '-0.02em' }}>
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <img
                src={`${BP}/images/rating.webp`}
                alt="Students learning English at Happy English Center"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(107,58,58,0.06)' }} />
            </div>

            {/* Floating badge — Cambridge */}
            <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-lg border border-border/60 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'rgba(107,58,58,0.08)' }}>
                🎓
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{t.hero.badge1Title}</p>
                <p className="text-xs text-muted-foreground">{t.hero.badge1Sub}</p>
              </div>
            </div>

            {/* Floating badge — rating */}
            <div className="absolute -top-5 -right-4 bg-white rounded-2xl shadow-lg border border-border/60 px-4 py-3 flex items-center gap-2">
              <span className="text-base">⭐</span>
              <div>
                <p className="text-xs font-bold text-foreground">4.9 / 5</p>
                <p className="text-[10px] text-muted-foreground">{t.hero.badge2Sub}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
