import { useState, useEffect } from 'react'
import { Settings2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../common/Button'
import { SEMESTERS, ACTIVITY_TYPES } from '../../utils/constants'

export default function ContentDefaultsSettings({ defaults, onSave }) {
  const [semester, setSemester] = useState(defaults.semester)
  const [type, setType] = useState(defaults.type)

  useEffect(() => {
    setSemester(defaults.semester)
    setType(defaults.type)
  }, [defaults])

  const handleSave = () => {
    onSave({ semester: Number(semester), type })
    toast.success('Default semester & type saved')
  }

  const semesterLabel = SEMESTERS.find((s) => s.id === defaults.semester)?.title
  const typeLabel =
    defaults.type === ACTIVITY_TYPES.COCURRICULAR ? 'Co-Curricular' : 'Curricular'

  return (
    <div className="mb-6 p-5 rounded-2xl bg-cream-100 dark:bg-olive-800/60 border border-olive-200 dark:border-olive-700">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="text-olive-500" size={20} />
        <h2 className="font-display text-lg font-semibold text-olive-900 dark:text-cream-50">
          Default for New Content
        </h2>
      </div>
      <p className="text-sm text-olive-600 dark:text-cream-300 mb-4">
        Currently: <strong>{semesterLabel}</strong> · <strong>{typeLabel}</strong> — used when you
        click &quot;Add Content&quot;
      </p>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-1.5">
            Default semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 text-sm"
          >
            {SEMESTERS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-1.5">
            Default type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 text-sm"
          >
            <option value={ACTIVITY_TYPES.CURRICULAR}>Curricular</option>
            <option value={ACTIVITY_TYPES.COCURRICULAR}>Co-Curricular</option>
          </select>
        </div>
        <Button type="button" size="sm" onClick={handleSave} className="shrink-0">
          <Save size={16} />
          Save Defaults
        </Button>
      </div>
    </div>
  )
}
