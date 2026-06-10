import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SEMESTERS } from '../../utils/constants'
import AnimatedSection from '../common/AnimatedSection'

export default function TableOfContents({ activityCounts = {} }) {
  const scrollToSemester = (id) => {
    document.getElementById(`semester-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatedSection id="semesters" className="py-20 px-4 bg-cream-200/50 dark:bg-olive-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-olive-900 dark:text-cream-50 mb-3">
            Table of Contents
          </h2>
          <p className="text-olive-600 dark:text-cream-300 max-w-lg mx-auto">
            Navigate through my academic journey semester by semester
          </p>
          <div className="w-20 h-1 bg-olive-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEMESTERS.map((sem, index) => (
            <motion.button
              key={sem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollToSemester(sem.id)}
              className="group text-left p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md hover:shadow-xl border border-cream-300/50 dark:border-olive-700 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-olive-400"
            >
              <span className="text-4xl font-display font-bold text-olive-400/40 dark:text-olive-600 group-hover:text-olive-500 transition-colors">
                0{sem.id}
              </span>
              <h3 className="font-display text-xl font-semibold text-olive-900 dark:text-cream-50 mt-2">
                {sem.title}
              </h3>
              <p className="text-sm text-olive-600 dark:text-cream-300 mt-1">{sem.subtitle}</p>
              {activityCounts[sem.id] > 0 && (
                <p className="text-xs text-olive-500 mt-3">
                  {activityCounts[sem.id]} activities
                </p>
              )}
              <ChevronRight
                className="mt-4 text-olive-400 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
