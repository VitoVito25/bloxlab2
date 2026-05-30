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
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(to bottom, #FFCA58 0%, #FFB300 60%, #FF7000 100%)' }}
    >
      <div className="relative w-full max-w-sm px-4">
        <div className="absolute bottom-full mb-9 inset-x-0 flex justify-center select-none">
          <img src="/bloxlab-logo.png" alt="BloxLab" className="h-16 w-auto max-w-none" />
        </div>

        <Card className="w-full">
        <CardContent className="flex flex-col gap-6">
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
              <a href="https://www.utfpr.edu.br/noticias/curitiba/utfpr-e-a-primeira-instituicao-do-brasil-a-fazer-parte-da-bloxberg-1" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-medium hover:text-amber-600">
                BloxLab
              </a>
            </p>
            <p>
              Supported by{' '}
              <a href="https://bloxberg.org/" target="_blank" rel="noopener noreferrer" className="text-amber-500 font-medium hover:text-amber-600">
                BloxsBerg
              </a>
            </p>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}
