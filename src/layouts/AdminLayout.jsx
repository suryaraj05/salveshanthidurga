import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-cream-100 dark:bg-olive-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
