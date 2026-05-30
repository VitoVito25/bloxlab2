import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface TViewUserData {
  username: string
  institution: string
  role: string
  accessType: string
  accessTime: string
  email: string
}

interface TViewUserModalProps {
  isOpen: boolean
  user: TViewUserData
  onClose: () => void
  onSave: (data: TViewUserData) => void
}

export function ViewUserModal({ isOpen, user, onClose, onSave }: TViewUserModalProps) {
  const [form, setForm] = useState<TViewUserData>(user)

  if (!isOpen) return null

  function handleChange(field: keyof TViewUserData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <Card className="w-full max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="relative flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Visualizar Usuario</h2>
            <button
              onClick={onClose}
              className="absolute -top-1 -right-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md p-1.5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-700">Nome completo</label>
              <Input
                placeholder="[username]"
                value={form.username}
                onChange={(e) => handleChange('username', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-700">Instituição</label>
              <Input
                placeholder="[institution]"
                value={form.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-700">Cargo</label>
              <div className="relative">
                <select
                  value={form.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className={cn(
                    'w-full h-10 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400',
                    !form.role && 'text-gray-400'
                  )}
                >
                  <option value="" disabled>Selecione um Cargo...</option>
                  <option value="coach">Treinador</option>
                  <option value="analyst">Analista</option>
                  <option value="manager">Gestor</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-700">Tipo de Acesso</label>
              <div className="relative">
                <select
                  value={form.accessType}
                  onChange={(e) => handleChange('accessType', e.target.value)}
                  className={cn(
                    'w-full h-10 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400',
                    !form.accessType && 'text-gray-400'
                  )}
                >
                  <option value="" disabled>Selecione um Tipo de Acesso...</option>
                  <option value="read">Leitura</option>
                  <option value="write">Escrita</option>
                  <option value="admin">Administrador</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-700">Tempo de Acesso</label>
              <Input
                placeholder="[accessTime]"
                value={form.accessTime}
                onChange={(e) => handleChange('accessTime', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-700">E-mail</label>
              <Input
                placeholder="[email]"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>

          <Button variant="teal" className="w-full" onClick={() => onSave(form)}>
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
