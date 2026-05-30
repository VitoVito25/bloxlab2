import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const MOCK_DOCS = [
  { id: '001', filename: 'relatorio-2024.pdf', institution: 'UFPR', writer: 'Carlos Silva', date: '2024-03-15' },
  { id: '002', filename: 'contrato-atleta.pdf', institution: 'USP', writer: 'Ana Souza', date: '2024-04-02' },
  { id: '003', filename: 'ficha-medica.pdf', institution: 'UNICAMP', writer: 'Pedro Lima', date: '2024-05-10' },
]

const INSTITUTIONS = ['UFPR', 'USP', 'UNICAMP', 'UFRJ', 'UFMG']

export default function SearchDocsPage() {
  const [institution, setInstitution] = useState('')
  const [docId, setDocId] = useState('')
  const [docName, setDocName] = useState('')

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Pesquisar Documentos
      </h1>

      {/* Filtros */}
      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Instituição</label>
            <select
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="flex h-10 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Selecionar...</option>
              {INSTITUTIONS.map((inst) => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Id do documento</label>
            <Input
              placeholder="Ex: 001"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nome do documento</label>
          <Input
            placeholder="Ex: relatorio-2024.pdf"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
        </div>

        <Button className="rounded-full w-full">
          Pesquisar Documentos
        </Button>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-amber-400 text-gray-900">
              <th className="px-4 py-3 text-left font-semibold">Id</th>
              <th className="px-4 py-3 text-left font-semibold">Nome</th>
              <th className="px-4 py-3 text-left font-semibold">Institution</th>
              <th className="px-4 py-3 text-left font-semibold">Escritor</th>
              <th className="px-4 py-3 text-left font-semibold">Data</th>
              <th className="px-4 py-3 text-center font-semibold">Opções</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DOCS.map((doc, idx) => (
              <tr
                key={doc.id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 text-gray-700">{doc.id}</td>
                <td className="px-4 py-3 text-gray-700">{doc.filename}</td>
                <td className="px-4 py-3 text-gray-700">{doc.institution}</td>
                <td className="px-4 py-3 text-gray-700">{doc.writer}</td>
                <td className="px-4 py-3 text-gray-700">{doc.date}</td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-500 hover:text-amber-500 transition-colors">
                    <Search size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex items-center justify-end gap-4 px-4 py-3 border-t border-gray-200 bg-white text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="bg-transparent text-sm focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <span>1–{MOCK_DOCS.length} of {MOCK_DOCS.length}</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" disabled>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="ghost" size="icon" disabled>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
