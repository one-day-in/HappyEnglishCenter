'use client'

import { useEffect } from 'react'

/**
 * Patches all <a href="#section"> clicks so they always scroll —
 * even if the hash is already in the URL (browser skips it otherwise).
 */
export function SmoothScrollPatch() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const el = document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth' })
      history.pushState(null, '', hash)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
