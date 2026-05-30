import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const MOCK_USER = {
  name: '[nomeUsuario]',
  institution: '[intitutionPage]',
  role: '',
  email: '[email]',
  accessType: '[accessType]',
  accessTime: '[accessTime]',
}

const CARGO_OPTIONS = [
  'Treinador',
  'Médico',
  'Analista',
  'Fisioterapeuta',
  'Nutricionista',
  'Psicólogo',
  'Coordenador',
]

export default function ProfilePage() {
  const [name, setName] = useState(MOCK_USER.name)
  const [institution, setInstitution] = useState(MOCK_USER.institution)
  const [role, setRole] = useState(MOCK_USER.role)
  const [email, setEmail] = useState(MOCK_USER.email)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        {MOCK_USER.name}
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Left column — editable fields */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nome completo</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Instituição</label>
            <Input value={institution} onChange={(e) => setInstitution(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Cargo</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-10 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Selecione um Cargo...</option>
              {CARGO_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          <Button className="rounded-full w-full mt-2">
            Salvar novos Dados
          </Button>
        </div>

        {/* Right column — read-only access info + actions */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Tipo de Acesso</label>
            <Input value={MOCK_USER.accessType} readOnly className="bg-gray-100 cursor-default" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Tempo de Acesso (Em dias)</label>
            <Input value={MOCK_USER.accessTime} readOnly className="bg-gray-100 cursor-default" />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <Button className="rounded-full w-full">
              Solicitar novo acesso
            </Button>
            <Button className="rounded-full w-full">
              Visualizar meus documentos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
