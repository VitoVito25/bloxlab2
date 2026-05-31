import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/features/auth/AuthContext'

export default function AppLayout() {
  const { session } = useAuth()

  return (
    <div className="flex h-screen bg-amber-400 p-2 gap-2">
      <Navbar userName={session?.nomeUsuario ?? ''} />
      <main className="flex-1 bg-white rounded-2xl overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
