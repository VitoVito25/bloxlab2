import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface TAlertModalProps {
  isOpen: boolean
  title: string
  message: string
  buttonMessage: string
  onClose: () => void
  onConfirm: () => void
}

export function AlertModal({ isOpen, title, message, buttonMessage, onClose, onConfirm }: TAlertModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <Card className="w-full max-w-sm mx-4">
        <CardContent className="p-6">
          <div className="relative flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="absolute -top-1 -right-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md p-1.5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-gray-500 text-sm mb-6">{message}</p>
          <Button className="w-full" onClick={onConfirm}>
            {buttonMessage}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
