import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ProtectedRoute from './components/admin/ProtectedRoute'
import LoadingSkeleton from './components/common/LoadingSkeleton'

const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const ContentManager = lazy(() => import('./pages/admin/ContentManager'))
const ProfileManager = lazy(() => import('./pages/admin/ProfileManager'))

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <LoadingSkeleton count={2} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
            </Route>

            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}>
                    <AdminLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="profile" element={<ProfileManager />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-olive-800 dark:text-cream-100',
              duration: 3000,
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
