import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  User,
  Bot,
  LogOut,
  Home,
  GraduationCap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../common/ThemeToggle'

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/content', icon: FileText, label: 'Content Manager' },
  { to: '/admin/telegram', icon: Bot, label: 'Telegram Import' },
  { to: '/admin/profile', icon: User, label: 'Profile' },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <aside className="w-64 shrink-0 bg-olive-800 dark:bg-olive-950 text-cream-100 min-h-screen flex flex-col">
      <div className="p-6 border-b border-olive-700">
        <div className="flex items-center gap-2">
          <GraduationCap size={28} className="text-olive-300" />
          <div>
            <h1 className="font-display text-lg font-semibold">Admin Panel</h1>
            <p className="text-xs text-olive-400">B.Ed Portfolio</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-olive-600 text-white'
                  : 'text-olive-200 hover:bg-olive-700/50'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-olive-700 space-y-2">
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-olive-200 hover:bg-olive-700/50 transition-colors"
        >
          <Home size={20} />
          View Portfolio
        </a>
        <div className="flex items-center justify-between px-4">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-300 hover:bg-red-900/30 transition-colors text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
