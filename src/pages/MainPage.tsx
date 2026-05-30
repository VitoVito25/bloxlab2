import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertModal } from '@/components/ui/alert-modal'
import { EditAccessModal } from '@/components/ui/edit-access-modal'
import { ViewUserModal } from '@/components/ui/view-user-modal'

export default function MainPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isEditAccessOpen, setIsEditAccessOpen] = useState(false)
  const [isViewUserOpen, setIsViewUserOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Bem vindo ao Projeto KPI's
      </h1>

      <div className="flex gap-3">
        <Button onClick={() => setIsAlertOpen(true)}>Ver Alert</Button>
        <Button onClick={() => setIsEditAccessOpen(true)}>Editar Acesso</Button>
        <Button onClick={() => setIsViewUserOpen(true)}>Visualizar Usuário</Button>
      </div>

      <AlertModal
        isOpen={isAlertOpen}
        title="Titulo"
        message="Mensagem"
        buttonMessage="[buttonMessage]"
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => setIsAlertOpen(false)}
      />

      <EditAccessModal
        isOpen={isEditAccessOpen}
        onClose={() => setIsEditAccessOpen(false)}
        onConfirm={() => setIsEditAccessOpen(false)}
        onCancel={() => setIsEditAccessOpen(false)}
      />

      <ViewUserModal
        isOpen={isViewUserOpen}
        user={{ username: '', institution: '', role: '', accessType: '', accessTime: '', email: '' }}
        onClose={() => setIsViewUserOpen(false)}
        onSave={() => setIsViewUserOpen(false)}
      />
    </div>
  )
}
