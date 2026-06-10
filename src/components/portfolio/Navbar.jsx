import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'
import ThemeToggle from '../common/ThemeToggle'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#semesters', label: 'Semesters' },
  { href: '#portfolio', label: 'Portfolio' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 print-hidden backdrop-blur-md bg-cream-100/90 dark:bg-olive-900/90 border-b border-olive-200/50 dark:border-olive-700/50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between" aria-label="Main navigation">
        <a href="#" className="flex items-center gap-2 text-olive-800 dark:text-cream-100 font-display text-xl font-semibold">
          <GraduationCap className="text-olive-600" size={28} />
          <span>B.Ed Portfolio</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-olive-700 dark:text-cream-200 hover:text-olive-600 dark:hover:text-cream-50 transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <Link
            to="/admin"
            className="text-sm text-olive-600 dark:text-olive-300 hover:underline"
          >
            Admin
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-olive-700 dark:text-cream-200"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-olive-200 dark:border-olive-700 bg-cream-100 dark:bg-olive-900 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-olive-700 dark:text-cream-200 font-medium"
            >
              {link.label}
            </a>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-olive-600">
            Admin
          </Link>
        </div>
      )}
    </header>
  )
}
