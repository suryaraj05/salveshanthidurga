import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import ThemeToggle from '../../components/common/ThemeToggle'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFirebaseConfigured) {
      toast.error('Firebase is not configured. See docs/FIREBASE_SETUP.md')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.code === 'auth/invalid-credential' ? 'Invalid email or password' : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cream-100 via-cream-200 to-olive-100 dark:from-olive-900 dark:via-olive-800 dark:to-olive-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-olive-600 text-cream-50 mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="font-display text-3xl font-bold text-olive-900 dark:text-cream-50">
            Admin Login
          </h1>
          <p className="text-olive-600 dark:text-cream-300 mt-2">
            Manage your B.Ed portfolio content
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl bg-white dark:bg-olive-800 shadow-xl border border-cream-300/50 dark:border-olive-700 space-y-5"
        >
          {!isFirebaseConfigured && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm">
              Firebase is not configured. Copy <code>.env.example</code> to <code>.env</code> and add your credentials.
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-400"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-400"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            <Lock size={18} />
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-6 text-olive-600 dark:text-cream-400">
          <Link to="/" className="hover:underline">
            ← Back to Portfolio
          </Link>
        </p>
      </div>
    </div>
  )
}
