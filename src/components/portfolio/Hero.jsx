import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import ImageFrame from '../common/ImageFrame'

export default function Hero({ profile }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-200 to-olive-100 dark:from-olive-900 dark:via-olive-800 dark:to-olive-900" />
      <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_30%_20%,#7a8b4e_0%,transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-100 dark:from-olive-900 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="shrink-0"
          >
            {profile.photoUrl ? (
              <div className="w-56 h-56 md:w-64 md:h-64">
                <ImageFrame
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  index={0}
                  size="featured"
                  className="!rotate-0"
                />
              </div>
            ) : (
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-olive-400 to-olive-600 flex items-center justify-center shadow-2xl border-4 border-cream-200 dark:border-olive-700">
                <span className="text-6xl font-display text-cream-100">
                  {profile.fullName?.charAt(0) || 'S'}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center lg:text-left flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-olive-600/10 dark:bg-olive-500/20 text-olive-700 dark:text-olive-300 text-sm font-medium mb-4">
              <BookOpen size={16} />
              Academic Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-olive-900 dark:text-cream-50 mb-3 text-balance">
              {profile.fullName}
            </h1>
            <p className="text-xl md:text-2xl text-olive-600 dark:text-olive-300 font-display italic mb-6">
              {profile.subtitle}
            </p>
            <p className="text-lg text-olive-700/90 dark:text-cream-200/90 max-w-xl leading-relaxed">
              {profile.introduction}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
