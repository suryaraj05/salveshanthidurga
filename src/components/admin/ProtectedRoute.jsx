import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingSkeleton from '../common/LoadingSkeleton'

export default function ProtectedRoute({ children }) {
  const { user, loading, isFirebaseConfigured } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <LoadingSkeleton count={1} />
      </div>
    )
  }

  if (!isFirebaseConfigured) {
    return <Navigate to="/admin/login" replace />
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
