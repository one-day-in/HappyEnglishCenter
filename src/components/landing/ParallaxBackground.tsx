'use client'

import { useEffect, useRef } from 'react'
import { BP } from '@/lib/asset'

export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const scrollY = window.scrollY
      // Visible at top (0.35), fades out by 700px scroll
      const opacity = Math.max(0, 0.55 * (1 - scrollY / 700))
      ref.current.style.opacity = String(opacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${BP}/images/background.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.55,
        zIndex: 0,
      }}
    />
  )
}
