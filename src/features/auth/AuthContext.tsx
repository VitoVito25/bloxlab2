import { createContext, useContext, useState } from 'react'
import type { TLoginResponse } from '@/features/auth/types'

interface TAuthSession extends TLoginResponse {}

interface TAuthContext {
  session: TAuthSession | null
  login: (data: TLoginResponse) => void
  logout: () => void
}

const SESSION_KEY = 'bloxlab_session'

function loadSession(): TAuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as TAuthSession) : null
  } catch {
    return null
  }
}

const AuthContext = createContext<TAuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<TAuthSession | null>(loadSession)

  function login(data: TLoginResponse) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
    setSession(data)
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): TAuthContext {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
