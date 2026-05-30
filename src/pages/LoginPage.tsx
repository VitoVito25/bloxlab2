import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import type { TLoginForm } from '@/features/auth/types'

export default function LoginPage() {
  const [form, setForm] = useState<TLoginForm>({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start pt-10"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #FFCC00 0%, #FFA500 55%, #FF8000 100%)' }}
    >
      {/* Logo */}
      <div className="mb-8 select-none">
        <BloxLabLogo />
      </div>

      {/* Card */}
      <Card className="w-full max-w-sm mx-4">
        <CardContent className="flex flex-col gap-4">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Projeto KPI's</h1>
            <p className="text-sm text-gray-500 mt-1">Indicadores de desempenho esportivo</p>
          </div>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <Button className="w-full font-semibold text-white text-base mt-1">
            Login
          </Button>

          <p className="text-center text-sm text-gray-500">
            Ou{' '}
            <button type="button" className="text-gray-600 hover:text-gray-900 underline underline-offset-2">
              Cadastre-se
            </button>
          </p>

          <div className="border-t border-gray-100 pt-4 flex flex-col items-center gap-1 text-sm text-gray-500">
            <p>
              Conheça a{' '}
              <a href="#" className="text-amber-500 font-medium hover:text-amber-600">
                BloxLab
              </a>
            </p>
            <p>
              Supported by{' '}
              <a href="#" className="text-amber-500 font-medium hover:text-amber-600">
                BloxsBerg
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BloxLabLogo() {
  return (
    <div className="flex items-center gap-0 font-black text-5xl tracking-tight text-gray-900 drop-shadow-sm">
      <span>BLO</span>
      <span className="relative inline-block">
        <span className="relative z-10">X</span>
        {/* diagonal lines through the X */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: 'scaleX(1.1)' }}
        >
          <svg viewBox="0 0 40 40" width="1em" height="1em" fill="none" className="absolute inset-0 w-full h-full">
            <line x1="4" y1="20" x2="36" y2="20" stroke="#FFCC00" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      </span>
      <span>LAB</span>
    </div>
  )
}
