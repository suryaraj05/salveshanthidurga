import { useState, useEffect } from 'react'
import { Save, X } from 'lucide-react'
import Button from '../common/Button'
import RichTextEditor from './RichTextEditor'
import ImageUploader from './ImageUploader'
import { SEMESTERS, ACTIVITY_TYPES } from '../../utils/constants'
import { uploadImages } from '../../services/imageService'

const emptyForm = {
  title: '',
  description: '',
  semester: 1,
  type: ACTIVITY_TYPES.CURRICULAR,
  images: [],
}

export default function ContentForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        semester: initialData.semester || 1,
        type: initialData.type || ACTIVITY_TYPES.CURRICULAR,
        images: initialData.images || [],
      })
    } else {
      setForm(emptyForm)
    }
  }, [initialData])

  const handleUpload = async (files) => {
    setUploading(true)
    try {
      return await uploadImages(files)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return

    setSaving(true)
    try {
      await onSave(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-lg border border-cream-300/50 dark:border-olive-700">
      <h3 className="font-display text-xl font-semibold text-olive-900 dark:text-cream-50">
        {initialData ? 'Edit Content' : 'Add New Content'}
      </h3>

      <div>
        <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-400"
          placeholder="Activity title"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2">
            Semester
          </label>
          <select
            value={form.semester}
            onChange={(e) => setForm({ ...form, semester: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100"
          >
            {SEMESTERS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2">
            Type
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100"
          >
            <option value={ACTIVITY_TYPES.CURRICULAR}>Curricular</option>
            <option value={ACTIVITY_TYPES.COCURRICULAR}>Co-Curricular</option>
          </select>
        </div>
      </div>

      <ImageUploader
        images={form.images}
        onImagesChange={(images) => setForm({ ...form, images })}
        onUpload={handleUpload}
        uploading={uploading}
      />

      <RichTextEditor
        value={form.description}
        onChange={(description) => setForm({ ...form, description })}
      />

      <div className="flex gap-3 justify-end pt-4 border-t border-olive-200 dark:border-olive-700">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            <X size={18} />
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={saving || !form.title.trim()}>
          <Save size={18} />
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
