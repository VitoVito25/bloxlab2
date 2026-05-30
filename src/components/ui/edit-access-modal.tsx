import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface TEditAccessModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (accessType: string, accessDays: string) => void
  onCancel: () => void
}

export function EditAccessModal({ isOpen, onClose, onConfirm, onCancel }: TEditAccessModalProps) {
  const [accessType, setAccessType] = useState('')
  const [accessDays, setAccessDays] = useState('')

  if (!isOpen) return null

  function handleConfirm() {
    onConfirm(accessType, accessDays)
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <Card className="w-full max-w-sm mx-4">
        <CardContent className="p-6">
          <div className="relative flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Editar acesso</h2>
            <button
              onClick={onClose}
              className="absolute -top-1 -right-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md p-1.5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-700">Tipo de Acesso</label>
              <div className="relative">
                <select
                  value={accessType}
                  onChange={(e) => setAccessType(e.target.value)}
                  className={cn(
                    'w-full h-10 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400',
                    !accessType && 'text-gray-400'
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
              <label className="text-sm text-gray-700">Tempo de acesso (Em dias)</label>
              <Input
                type="number"
                placeholder=""
                value={accessDays}
                onChange={(e) => setAccessDays(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="teal" className="flex-1" onClick={handleConfirm}>
              Confirmar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
