'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { BP } from '@/lib/asset'

const branches = [
  { label: '787 Giải Phóng, Xã Ea Đrăng',   tag: 'CN1' },
  { label: '390 Hùng Vương, P. Buôn Hồ',     tag: 'CN2' },
  { label: '190 Hùng Vương, Xã Krông Năng',  tag: 'CN3' },
  { label: 'Căn ML8-ML9 Ecocity, P. Tân An', tag: 'CN4' },
]

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative overflow-hidden py-20">
      <img src={`${BP}/images/getintouch.webp`} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'rgba(253,250,249,0.88)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">{t.contact.badge}</Badge>
              <h2 className="text-3xl font-semibold" style={{ letterSpacing: '-0.02em' }}>{t.contact.title}</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.contact.sub}</p>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(107,58,58,0.08)', border: '1px solid rgba(107,58,58,0.15)' }}>
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <a href="mailto:happyenglishcenter82@gmail.com" className="text-sm font-medium hover:text-primary transition-colors">
                happyenglishcenter82@gmail.com
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.contact.branches}</p>
              {branches.map(({ label, tag }) => (
                <div key={tag} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(107,58,58,0.08)', border: '1px solid rgba(107,58,58,0.15)' }}>
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider mr-1.5" style={{ color: '#6B3A3A' }}>{tag}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <Card className="border border-border/70 shadow-md" style={{ background: '#fff' }}>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.contact.fnLabel}</label>
                  <input className="w-full border border-border rounded-[10px] px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary transition-colors" placeholder={t.contact.fnPh} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">{t.contact.ageLabel}</label>
                  <input className="w-full border border-border rounded-[10px] px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary transition-colors" placeholder={t.contact.agePh} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.contact.phoneLabel}</label>
                <input className="w-full border border-border rounded-[10px] px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary transition-colors" placeholder={t.contact.phonePh} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.contact.msgLabel}</label>
                <textarea rows={3} className="w-full border border-border rounded-[10px] px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary transition-colors resize-none" placeholder={t.contact.msgPh} />
              </div>
              <Button className="w-full font-medium h-11">{t.contact.btn}</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
