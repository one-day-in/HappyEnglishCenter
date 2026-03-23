'use client'

import { useEffect, useRef } from 'react'
import { BP } from '@/lib/asset'

export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      // visualViewport.pageTop is accurate on iOS Safari when toolbar hides/shows
      const scrollY = window.visualViewport?.pageTop ?? window.scrollY
      const opacity = Math.max(0, 0.55 * (1 - scrollY / 700))
      ref.current.style.opacity = String(opacity)
    }

    window.addEventListener('scroll', update, { passive: true })
    // Fires when iOS Safari toolbar shows/hides (changes viewport size)
    window.visualViewport?.addEventListener('resize', update)
    window.visualViewport?.addEventListener('scroll', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.visualViewport?.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('scroll', update)
    }
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
        // Force GPU layer — prevents iOS Safari repaint glitch on toolbar toggle
        transform: 'translateZ(0)',
        willChange: 'opacity',
      }}
    />
  )
}
