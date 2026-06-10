import { Outlet } from 'react-router-dom'
import Navbar from '../components/portfolio/Navbar'
import Footer from '../components/portfolio/Footer'
import { useProfile } from '../hooks/useProfile'

export default function MainLayout() {
  const { profile } = useProfile()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet context={{ profile }} />
      </main>
      <Footer name={profile.fullName} />
    </div>
  )
}
