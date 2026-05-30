import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const MOCK_USERS = [
  { institution: 'UFPR', username: 'carlos.silva', role: 'Treinador', permission: 'Admin' },
  { institution: 'USP', username: 'ana.souza', role: 'Médico', permission: 'Editor' },
  { institution: 'UNICAMP', username: 'pedro.lima', role: 'Analista', permission: 'Viewer' },
]

const INSTITUTIONS = ['UFPR', 'USP', 'UNICAMP', 'UFRJ', 'UFMG']

export default function ManageUsersPage() {
  const [institution, setInstitution] = useState('')
  const [role, setRole] = useState('')
  const [username, setUsername] = useState('')

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Gerenciar usuarios
      </h1>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Instituição</label>
            <select
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="flex h-10 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">[intitutionPage]</option>
              {INSTITUTIONS.map((inst) => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Cargo</label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nome do Usuario</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
            {MOCK_USERS.map((user, idx) => (
              <tr
                key={user.username}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 text-gray-700">{user.institution}</td>
                <td className="px-4 py-3 text-gray-700">{user.username}</td>
                <td className="px-4 py-3 text-gray-700">{user.role}</td>
                <td className="px-4 py-3 text-gray-700">{user.permission}</td>
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
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <span>1–{MOCK_USERS.length} of {MOCK_USERS.length}</span>
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
