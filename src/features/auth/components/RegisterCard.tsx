import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { TRegisterForm } from '@/features/auth/types'

const CARGOS = ['Técnico', 'Preparador Físico', 'Médico', 'Fisiologista', 'Nutricionista', 'Psicólogo', 'Coordenador']
const TIPOS_ACESSO = ['Administrador', 'Editor', 'Visualizador']

const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23F59E0B' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`

interface Props {
  onClose: () => void
}

const EMPTY_FORM: TRegisterForm = {
  nome: '',
  instituicao: '',
  cargo: '',
  tipoAcesso: '',
  email: '',
  password: '',
}

export default function RegisterCard({ onClose }: Props) {
  const [form, setForm] = useState<TRegisterForm>(EMPTY_FORM)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="w-full animate-card-enter">
      <CardContent className="flex flex-col gap-5">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Dados para cadastro</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400 hover:bg-amber-500 text-white transition-colors"
            aria-label="Voltar ao login"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
        </div>

        <Field label="Nome completo">
          <Input
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            autoComplete="name"
          />
        </Field>

        <Field label="Instituição">
          <Input
            name="instituicao"
            type="text"
            value={form.instituicao}
            onChange={handleChange}
          />
        </Field>

        <Field label="Cargo">
          <select
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            className="h-10 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 pr-9"
            style={{ backgroundImage: CHEVRON_SVG, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            <option value="" disabled>Selecione um Cargo...</option>
            {CARGOS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Tipo de Acesso">
          <select
            name="tipoAcesso"
            value={form.tipoAcesso}
            onChange={handleChange}
            className="h-10 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 pr-9"
            style={{ backgroundImage: CHEVRON_SVG, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            <option value="" disabled>Selecione um Tipo de Acesso...</option>
            {TIPOS_ACESSO.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="E-mail">
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </Field>

        <Field label="Senha">
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
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
        </Field>

        <Button className="w-full font-semibold text-white text-base mt-1">
          Enviar solicitação
        </Button>

      </CardContent>
    </Card>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}
