import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Demo proxy — no Supabase required for local preview
// In production: add Supabase session check here
export function proxy(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
