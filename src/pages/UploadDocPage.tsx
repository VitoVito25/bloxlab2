import { useRef, useState } from 'react'
import { Upload, FileText, Table, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileIcon({ name }: { name: string }) {
  const ext = name.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return <FileText size={40} className="text-red-400" />
  return <Table size={40} className="text-green-500" />
}

export default function UploadDocPage() {
  const [docName, setDocName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null
    setFile(selected)
    if (selected && !docName) setDocName(selected.name)
  }

  function handleClear() {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleSubmit() {
    if (!file) return
    // TODO: integração com backend
    console.log('Enviando:', { docName, file })
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Enviar Documentos
      </h1>

      <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* Nome do documento */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nome do documento</label>
          <Input
            placeholder="Ex: relatorio-atletismo-2024"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
        </div>

        {/* Área de arquivo */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Documento</label>
          <div
            className={[
              'flex flex-col items-center justify-center gap-3 rounded-xl border-2 py-12 transition-colors',
              file
                ? 'border-amber-400 bg-amber-50'
                : 'border-dashed border-gray-300 bg-gray-50',
            ].join(' ')}
          >
            {file ? (
              <>
                <FileIcon name={file.name} />
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-800 break-all px-4">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatFileSize(file.size)}</p>
                </div>
              </>
            ) : (
              <>
                <Upload size={36} className="text-gray-300" />
                <p className="text-sm text-gray-400">Nenhum arquivo selecionado</p>
              </>
            )}
          </div>
        </div>

        {/* Botões de arquivo */}
        <div className="flex gap-3">
          <Button
            className="flex-1 rounded-full gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
            Procurar arquivos...
          </Button>
          <Button
            className="flex-1 rounded-full gap-2"
            onClick={handleClear}
            disabled={!file}
          >
            <X size={16} />
            Limpar Arquivos
          </Button>
        </div>

        {/* Enviar */}
        <Button
          className="w-full rounded-full bg-teal-500 hover:bg-teal-600 text-white"
          onClick={handleSubmit}
          disabled={!file || !docName.trim()}
        >
          Enviar Documento
        </Button>
      </div>

      {/* Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.xlsx,.csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
