'use client'

import { useState } from 'react'
import placeholders from '@/lib/img-placeholders.json'

interface Props {
  src: string          // e.g. "/images/rating.webp" or "${BP}/images/rating.webp"
  alt: string
  className?: string
  style?: React.CSSProperties
  priority?: boolean   // true = no lazy loading (above fold)
}

// Extract filename without extension from src
function getKey(src: string): string {
  return src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''
}

export function BlurImage({ src, alt, className, style, priority }: Props) {
  const [loaded, setLoaded] = useState(false)
  const key = getKey(src)
  const placeholder = (placeholders as Record<string, string>)[key]

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} style={style}>
      {/* Blur placeholder */}
      {placeholder && !loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px)',
          }}
        />
      )}
      {/* Real image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ position: 'relative', zIndex: 1 }}
      />
    </div>
  )
}
