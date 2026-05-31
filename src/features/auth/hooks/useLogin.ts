import { useState } from 'react'
import { useAuth } from '@/features/auth/AuthContext'
import type { TLoginResponse } from '@/features/auth/types'

interface TExecuteResult {
  data: TLoginResponse | null
  errorCode: string | null
}

interface TUseLoginResult {
  execute: (email: string, password: string) => Promise<TExecuteResult>
  loading: boolean
}

export function useLogin(): TUseLoginResult {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  async function execute(email: string, password: string): Promise<TExecuteResult> {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        return { data: null, errorCode: String(res.status) }
      }
      const data: TLoginResponse = await res.json()
      login(data)
      return { data, errorCode: null }
    } catch {
      return { data: null, errorCode: 'network_error' }
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading }
}
