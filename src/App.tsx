import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import AppLayout from '@/components/AppLayout'
import MainPage from '@/pages/MainPage'
import SearchDocsPage from '@/pages/SearchDocsPage'
import UploadDocPage from '@/pages/UploadDocPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/pesquisar" element={<SearchDocsPage />} />
          <Route path="/enviar" element={<UploadDocPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
