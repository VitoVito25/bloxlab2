import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MOCK_REQUESTS = [
  { institution: 'UFPR', username: 'carlos.silva', role: 'Treinador', permission: 'Admin' },
  { institution: 'USP', username: 'ana.souza', role: 'Médico', permission: 'Editor' },
  { institution: 'UNICAMP', username: 'pedro.lima', role: 'Analista', permission: 'Viewer' },
  { institution: 'UFRJ', username: 'lucia.mendes', role: 'Fisio', permission: 'Viewer' },
]

export default function AccessRequestsPage() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Solicitações de acesso
      </h1>

      <div className="max-w-2xl mx-auto w-full">
        <Button className="rounded-full w-full">
          Pesquisar Usuarios
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-amber-400 text-gray-900">
              <th className="px-4 py-3 text-left font-semibold">Instituição</th>
              <th className="px-4 py-3 text-left font-semibold">Nome</th>
              <th className="px-4 py-3 text-left font-semibold">Cargo</th>
              <th className="px-4 py-3 text-left font-semibold">Acesso</th>
              <th className="px-4 py-3 text-center font-semibold">Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_REQUESTS.map((req, idx) => (
              <tr
                key={req.username}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 text-gray-700">{req.institution}</td>
                <td className="px-4 py-3 text-gray-700">{req.username}</td>
                <td className="px-4 py-3 text-gray-700">{req.role}</td>
                <td className="px-4 py-3 text-gray-700">{req.permission}</td>
                <td className="px-4 py-3 text-center">
                  <button className="text-gray-500 hover:text-amber-500 transition-colors">
                    <Search size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-end gap-4 px-4 py-3 border-t border-gray-200 bg-white text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="bg-transparent text-sm focus:outline-none">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
          </div>
          <span>1–{MOCK_REQUESTS.length} of {MOCK_REQUESTS.length}</span>
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
