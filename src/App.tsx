import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import AppLayout from '@/components/AppLayout'
import MainPage from '@/pages/MainPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
