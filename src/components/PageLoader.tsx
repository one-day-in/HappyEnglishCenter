'use client'

import { useEffect, useState } from 'react'
import { BP } from '@/lib/asset'

export function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fade after DOM is ready
    const t1 = setTimeout(() => setFading(true), 600)
    // Remove from DOM after fade
    const t2 = setTimeout(() => setVisible(false), 1100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 pointer-events-none transition-opacity duration-500"
      style={{
        background: '#FDFAF9',
        opacity: fading ? 0 : 1,
      }}
    >
      {/* Full logo */}
      <img
        src={`${BP}/images/logo.svg`}
        alt="Happy English Center"
        className="h-32 w-auto select-none"
      />

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#6B3A3A',
              opacity: 0.35,
              animation: `loader-dot 1s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loader-dot {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50%       { opacity: 0.8;  transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
