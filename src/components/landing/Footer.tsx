'use client'

import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { BP } from '@/lib/asset'

const contact = [
  { icon: Mail,   text: 'happyenglishcenter82@gmail.com' },
  { icon: MapPin, text: 'CN1: 787 Giải Phóng, Ea Đrăng'  },
  { icon: MapPin, text: 'CN2: 390 Hùng Vương, Buôn Hồ'   },
  { icon: MapPin, text: 'CN3: 190 Hùng Vương, Krông Năng' },
  { icon: MapPin, text: 'CN4: Ecocity, P. Tân An'         },
]

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { label: t.footer.lAbout,   href: '#about'   },
    { label: t.footer.lCourses, href: '#courses' },
    { label: t.footer.lFaq,     href: '#faq'     },
    { label: t.footer.lContact, href: '#contact' },
    { label: t.footer.lLogin,   href: '/login'   },
  ]

  const programs = [
    { label: t.footer.pPreK,   href: '#courses' },
    { label: t.footer.pTeens,  href: '#courses' },
    { label: t.footer.pAdults, href: '#courses' },
    { label: t.footer.pKet,    href: '#courses' },
    { label: t.footer.pPet,    href: '#courses' },
  ]

  return (
    <footer className="bg-[#120A0A]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label="Home">
            <img src={`${BP}/images/logo.svg`} alt="Happy English Center" className="h-8 w-auto brightness-0 invert opacity-90" />
          </Link>
          <p className="text-sm leading-relaxed text-white/40 max-w-[220px]">{t.footer.tagline}</p>
          <p className="text-xs text-white/25 uppercase tracking-[0.12em]">{t.footer.est}</p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5">{t.footer.linksTitle}</p>
          <ul className="space-y-3">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-white/50 hover:text-white/85 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5">{t.footer.programsTitle}</p>
          <ul className="space-y-3">
            {programs.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-white/50 hover:text-white/85 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-5">{t.footer.contactTitle}</p>
          <div className="space-y-3.5">
            {contact.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
                <span className="text-sm text-white/50">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">{t.footer.copy}</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
