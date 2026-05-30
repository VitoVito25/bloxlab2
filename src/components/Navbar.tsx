import { NavLink } from 'react-router-dom'
import {
  Home,
  FileSearch,
  FilePlus2,
  Users,
  UserPlus,
  TrendingUp,
  FileText,
  User,
} from 'lucide-react'

interface NavbarProps {
  userName: string
}

const NAV_ITEMS = [
  { path: '/home', label: 'Página Inicial', icon: Home },
  { path: '/pesquisar', label: 'Pesquisar Documentos', icon: FileSearch },
  { path: '/enviar', label: 'Enviar Documentos', icon: FilePlus2 },
  { path: '/usuarios', label: 'Gerenciar Usuários', icon: Users },
  { path: '/solicitacoes', label: 'Solicitações de acesso', icon: UserPlus },
  { path: '/metricas', label: 'Métricas Importantes', icon: TrendingUp },
  { path: '/contrato', label: 'Dados do contrato', icon: FileText },
] as const

export default function Navbar({ userName }: NavbarProps) {
  return (
    <aside className="flex flex-col w-64 bg-white rounded-2xl py-6 px-4 shrink-0">
      <div className="flex justify-center mb-8">
        <img src="/bloxlab-logo.png" alt="BloxLab" className="h-14 w-auto" />
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-full border px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-amber-400 bg-amber-50 text-gray-900'
                  : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50/50',
              ].join(' ')
            }
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-amber-400 shrink-0">
              <Icon size={15} className="text-white" strokeWidth={2.2} />
            </span>
            <span className="leading-tight">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6">
        <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-amber-400 shrink-0">
            <User size={15} className="text-white" strokeWidth={2.2} />
          </span>
          <span className="text-sm font-medium text-gray-700 truncate">{userName}</span>
        </div>
      </div>
    </aside>
  )
}
