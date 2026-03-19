import type { Metadata } from 'next'

import NavBar             from '@/components/landing/NavBar'
import ParallaxBackground from '@/components/landing/ParallaxBackground'
import HeroSection        from '@/components/landing/HeroSection'
import StatsSection       from '@/components/landing/StatsSection'
import FeaturesSection    from '@/components/landing/FeaturesSection'
import CoursesSection     from '@/components/landing/CoursesSection'
import ProcessSection     from '@/components/landing/ProcessSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import FaqSection         from '@/components/landing/FaqSection'
import CtaSection         from '@/components/landing/CtaSection'
import ContactSection     from '@/components/landing/ContactSection'
import Footer             from '@/components/landing/Footer'

/* ── SEO ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Happy English Center — English for Kids & Teens',
  description:
    'Private English school with 10+ years of experience. ' +
    'Groups from Pre-K to KET & PET. Smart schedule, homework tracking, and parent portal.',
  keywords: [
    'english school ukraine',
    'english for kids',
    'KET preparation',
    'PET preparation',
    'happy english center',
  ],
  openGraph: {
    title: 'Happy English Center — English for Kids & Teens',
    description:
      'Private English school with 10+ years of experience. ' +
      'Groups from Pre-K to KET & PET. 60+ teachers.',
    type: 'website',
  },
}

/* ── Page ──────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* ── Global parallax background (fades on scroll) ── */}
      <ParallaxBackground />

      {/* ── Page content ── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <NavBar />
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <ProcessSection />
          <CoursesSection />
          <TestimonialsSection />
          <FaqSection />
          <CtaSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
