import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

// In real app, get from Supabase server client
// For demo, using mock role
const DEMO_ROLE = 'student'
const DEMO_NAME = 'Anna K.'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F2EDEC' }}>
      <Sidebar role={DEMO_ROLE} userName={DEMO_NAME} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar role={DEMO_ROLE} userName={DEMO_NAME} />
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
