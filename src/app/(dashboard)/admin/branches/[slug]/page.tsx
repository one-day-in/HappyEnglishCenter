import { Suspense } from 'react'
import BranchClient from './BranchClient'

export function generateStaticParams() {
  return ['buon-ho', 'ea-leo', 'krong-nang', 'buon-ma-thuot'].map(slug => ({ slug }))
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <Suspense fallback={null}>
      <BranchClient slug={slug} />
    </Suspense>
  )
}
