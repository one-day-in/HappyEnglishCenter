export type Role = 'admin' | 'teacher' | 'student'

export interface AuthUser {
  username: string
  name: string
  role: Role
}

const ACCOUNTS: Record<string, { password: string; name: string; role: Role }> = {
  admin:   { password: '1234', name: 'Admin',   role: 'admin'   },
  teacher: { password: '1234', name: 'Mr Joey', role: 'teacher' },
  student: { password: '1234', name: 'Anna',    role: 'student' },
}

const KEY = 'hec_session'

export function login(username: string, password: string): AuthUser | null {
  const account = ACCOUNTS[username.toLowerCase().trim()]
  if (!account || account.password !== password) return null
  const user: AuthUser = { username: username.toLowerCase().trim(), name: account.name, role: account.role }
  sessionStorage.setItem(KEY, JSON.stringify(user))
  return user
}

export function getSession(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') sessionStorage.removeItem(KEY)
}
