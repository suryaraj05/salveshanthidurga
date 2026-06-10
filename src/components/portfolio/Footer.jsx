import { GraduationCap, Heart } from 'lucide-react'

export default function Footer({ name }) {
  const year = new Date().getFullYear()

  return (
    <footer className="py-10 px-4 bg-olive-800 dark:bg-olive-950 text-cream-100 print-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GraduationCap size={24} />
          <span className="font-display text-xl font-semibold">{name}</span>
        </div>
        <p className="text-cream-300/80 text-sm flex items-center justify-center gap-1">
          Crafted with <Heart size={14} className="text-red-400" /> for education
        </p>
        <p className="text-cream-400/60 text-xs mt-4">&copy; {year} B.Ed Academic Portfolio</p>
      </div>
    </footer>
  )
}
