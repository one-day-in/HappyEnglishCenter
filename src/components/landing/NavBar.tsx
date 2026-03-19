'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, UserCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Lang } from '@/lib/i18n/translations'
import { BP } from '@/lib/asset'

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-lg overflow-hidden border border-border text-xs font-semibold">
      {(['vi', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 uppercase transition-colors ${
            lang === l
              ? 'bg-primary text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useLanguage()

  const links = [
    { label: t.nav.about,   href: '#about'   },
    { label: t.nav.courses, href: '#courses' },
    { label: t.nav.faq,     href: '#faq'     },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border shadow-sm"
      style={{ background: '#FDFAF9' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <img src={`${BP}/images/logo.svg`} alt="Happy English Center" className="h-8 w-auto" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm list-none">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs + lang switcher */}
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} />
          <Link href="#contact">
            <Button size="sm" className="font-medium">{t.nav.book}</Button>
          </Link>
          <Link href="/login">
            <Button size="sm" variant="outline" className="font-medium gap-1.5">
              <UserCircle2 className="w-4 h-4" />{t.nav.login}
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-border animate-in slide-in-from-top-2 duration-200"
          style={{ background: '#FDFAF9' }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex gap-2 mt-2 items-center">
              <LangSwitcher lang={lang} setLang={setLang} />
              <Link href="#contact" onClick={() => setOpen(false)} className="flex-1">
                <Button size="sm" className="w-full font-medium">{t.nav.bookShort}</Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button size="sm" variant="outline" className="w-full font-medium gap-1.5">
                  <UserCircle2 className="w-4 h-4" />{t.nav.login}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
