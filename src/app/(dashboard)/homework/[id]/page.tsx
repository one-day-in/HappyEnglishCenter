import { mockHomework } from '@/lib/mock-data'
import HomeworkDetailClient from './HomeworkDetailClient'

export function generateStaticParams() {
  return mockHomework.map(hw => ({ id: hw.id }))
}

export default function HomeworkDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <HomeworkDetailClient id={params.id} />
}
