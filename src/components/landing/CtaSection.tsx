'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { BP } from '@/lib/asset'

export default function CtaSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden py-24">
      <img src={`${BP}/images/book-trial.webp`} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'rgba(74,20,20,0.82)' }} />
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none" style={{ background: '#fff', opacity: 0.04 }} />
      <div aria-hidden="true" className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none" style={{ background: '#fff', opacity: 0.03 }} />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {t.cta.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-5" style={{ letterSpacing: '-0.025em' }}>
          {t.cta.title}
        </h2>
        <p className="text-base mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {t.cta.sub}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="#contact">
            <Button size="lg" className="font-medium text-base px-8 h-12 border-0" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.35)' }}>
              {t.cta.btn1}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="font-medium text-base px-8 h-12 text-white hover:text-white hover:bg-white/20" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.50)' }}>
              {t.cta.btn2}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
