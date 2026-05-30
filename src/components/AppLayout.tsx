import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-amber-400 p-2 gap-2">
      <Navbar userName="[nomeUsuarioNavBar]" />
      <main className="flex-1 bg-white rounded-2xl overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
