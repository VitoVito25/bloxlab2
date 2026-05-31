import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthContext'
import LoginPage from '@/pages/LoginPage'
import AppLayout from '@/components/AppLayout'
import MainPage from '@/pages/MainPage'
import SearchDocsPage from '@/pages/SearchDocsPage'
import UploadDocPage from '@/pages/UploadDocPage'
import ManageUsersPage from '@/pages/ManageUsersPage'
import AccessRequestsPage from '@/pages/AccessRequestsPage'
import ImportantMetricsPage from '@/pages/ImportantMetricsPage'
import ContractDataPage from '@/pages/ContractDataPage'
import ProfilePage from '@/pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/pesquisar" element={<SearchDocsPage />} />
          <Route path="/enviar" element={<UploadDocPage />} />
          <Route path="/usuarios" element={<ManageUsersPage />} />
          <Route path="/solicitacoes" element={<AccessRequestsPage />} />
          <Route path="/metricas" element={<ImportantMetricsPage />} />
          <Route path="/contrato" element={<ContractDataPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
