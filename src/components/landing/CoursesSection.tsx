'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { BP } from '@/lib/asset'

export default function CoursesSection() {
  const { t } = useLanguage()

  const courses = [
    {
      title: t.courses.c1Title,
      level: t.courses.c1Level,
      age: t.courses.c1Age,
      desc: t.courses.c1Desc,
      featured: false,
      image: '/images/pre-k.webp',
      imageAlt: 'Teacher reading with young students',
    },
    {
      title: t.courses.c2Title,
      level: t.courses.c2Level,
      age: t.courses.c2Age,
      desc: t.courses.c2Desc,
      featured: true,
      image: '/images/teens.webp',
      imageAlt: 'Teen student in class',
    },
    {
      title: t.courses.c3Title,
      level: t.courses.c3Level,
      age: t.courses.c3Age,
      desc: t.courses.c3Desc,
      featured: false,
      image: '/images/adults.webp',
      imageAlt: 'Adult student studying with books',
    },
  ]

  return (
    <section
      id="courses"
      className="relative overflow-hidden py-20"
      style={{ background: 'rgba(249,250,251,0.72)' }}
    >
      {/* Outline accents */}
      <div aria-hidden="true" className="absolute top-10 right-10 w-52 h-32 rounded-[20px] pointer-events-none" style={{ border: '1.5px solid #6B3A3A', opacity: 0.09, transform: 'rotate(-4deg)' }} />
      <div aria-hidden="true" className="absolute bottom-10 left-8 w-28 h-[4.5rem] rounded-[14px] pointer-events-none" style={{ border: '1.5px solid #6B3A3A', opacity: 0.07, transform: 'rotate(5deg)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">{t.courses.badge}</Badge>
          <h2 className="text-4xl font-semibold" style={{ letterSpacing: '-0.02em' }}>{t.courses.title}</h2>
          <p className="text-muted-foreground mt-3 text-sm">{t.courses.sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.title}
              className={`overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
                course.featured ? 'border-2 border-primary/70 shadow-lg' : 'border border-border/70 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={`${BP}${course.image}`} alt={course.imageAlt} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'rgba(107,58,58,0.10)' }} />
                {course.featured && (
                  <div className="absolute top-0 inset-x-0 bg-primary text-white text-center text-xs font-medium uppercase tracking-[0.12em] py-2">
                    {t.courses.popular}
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{course.age}</p>
                <h3 className="text-xl font-semibold mt-1">{course.title}</h3>
                <Badge variant="secondary" className="mt-2 text-xs font-medium">{course.level}</Badge>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">{course.desc}</p>
                <Link href="#contact" className="block mt-5">
                  <Button className="w-full font-medium" variant={course.featured ? 'default' : 'outline'}>
                    {t.courses.btn}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
