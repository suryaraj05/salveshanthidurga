import { Heart, Lightbulb, Sparkles } from 'lucide-react'
import AnimatedSection from '../common/AnimatedSection'

function TagList({ items, colorClass }) {
  if (!items?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${colorClass}`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export default function About({ profile }) {
  return (
    <AnimatedSection id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-olive-900 dark:text-cream-50 mb-3">
            About Me
          </h2>
          <div className="w-20 h-1 bg-olive-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-olive-800 shadow-lg border border-cream-300/50 dark:border-olive-700">
            <p className="text-olive-700 dark:text-cream-200 leading-relaxed text-lg">
              {profile.about}
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md border border-cream-300/50 dark:border-olive-700">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-olive-500" size={20} />
                <h3 className="font-display text-xl font-semibold text-olive-800 dark:text-cream-100">
                  Skills
                </h3>
              </div>
              <TagList
                items={profile.skills}
                colorClass="bg-olive-100 dark:bg-olive-700 text-olive-800 dark:text-cream-100"
              />
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md border border-cream-300/50 dark:border-olive-700">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="text-brown-500" size={20} />
                <h3 className="font-display text-xl font-semibold text-olive-800 dark:text-cream-100">
                  Interests
                </h3>
              </div>
              <TagList
                items={profile.interests}
                colorClass="bg-cream-200 dark:bg-olive-600 text-olive-800 dark:text-cream-100"
              />
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-olive-600 to-olive-700 text-cream-50 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={20} />
                <h3 className="font-display text-xl font-semibold">Teaching Philosophy</h3>
              </div>
              <p className="leading-relaxed italic opacity-95">{profile.teachingPhilosophy}</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
