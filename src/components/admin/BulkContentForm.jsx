import { useState, useCallback } from 'react'
import { Save, X, Plus, Trash2, Layers } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../common/Button'
import ImageUploader from './ImageUploader'
import { SEMESTERS, ACTIVITY_TYPES } from '../../utils/constants'
import { uploadImages } from '../../services/imageService'

let rowIdCounter = 0
function newRow(defaults) {
  rowIdCounter += 1
  return {
    _key: rowIdCounter,
    title: '',
    description: '',
    images: [],
    semester: defaults.semester,
    type: defaults.type,
  }
}

export default function BulkContentForm({ defaults, onSave, onCancel }) {
  const [shared, setShared] = useState({
    semester: defaults.semester,
    type: defaults.type,
    useShared: true,
  })
  const [rows, setRows] = useState([newRow(defaults), newRow(defaults), newRow(defaults)])
  const [uploadingRow, setUploadingRow] = useState(null)
  const [saving, setSaving] = useState(false)

  const updateRow = (key, patch) => {
    setRows((prev) => prev.map((r) => (r._key === key ? { ...r, ...patch } : r)))
  }

  const addRow = () => setRows((prev) => [...prev, newRow(defaults)])

  const removeRow = (key) => {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r._key !== key)))
  }

  const handleUpload = useCallback(async (key, files) => {
    setUploadingRow(key)
    try {
      return await uploadImages(files)
    } finally {
      setUploadingRow(null)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const filled = rows
      .map((row) => {
        const text = row.description.trim()
        let description = ''
        if (text) {
          description = text.includes('<')
            ? text
            : text
                .split('\n')
                .filter(Boolean)
                .map((p) => `<p>${p}</p>`)
                .join('')
        }
        return {
          title: row.title.trim(),
          description,
          images: row.images,
          semester: shared.useShared ? shared.semester : row.semester,
          type: shared.useShared ? shared.type : row.type,
        }
      })
      .filter((row) => row.title)

    if (!filled.length) {
      toast.error('Add at least one activity with a title')
      return
    }

    setSaving(true)
    try {
      await onSave(filled)
    } finally {
      setSaving(false)
    }
  }

  const filledCount = rows.filter((r) => r.title.trim()).length

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-lg border border-cream-300/50 dark:border-olive-700"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-olive-900 dark:text-cream-50 flex items-center gap-2">
            <Layers size={22} />
            Bulk Add Activities
          </h3>
          <p className="text-sm text-olive-600 dark:text-cream-300 mt-1">
            Fill multiple activities, then save all at once. Empty rows are skipped.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-cream-100 dark:bg-olive-900/50 border border-olive-200 dark:border-olive-700 space-y-4">
        <label className="flex items-center gap-2 text-sm text-olive-700 dark:text-cream-200 cursor-pointer">
          <input
            type="checkbox"
            checked={shared.useShared}
            onChange={(e) => setShared({ ...shared, useShared: e.target.checked })}
            className="rounded border-olive-300"
          />
          Same semester &amp; type for all activities
        </label>

        {shared.useShared ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-olive-600 dark:text-cream-300 mb-1">
                Semester
              </label>
              <select
                value={shared.semester}
                onChange={(e) => setShared({ ...shared, semester: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-sm"
              >
                {SEMESTERS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-olive-600 dark:text-cream-300 mb-1">
                Type
              </label>
              <select
                value={shared.type}
                onChange={(e) => setShared({ ...shared, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-sm"
              >
                <option value={ACTIVITY_TYPES.CURRICULAR}>Curricular</option>
                <option value={ACTIVITY_TYPES.COCURRICULAR}>Co-Curricular</option>
              </select>
            </div>
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        {rows.map((row, index) => (
          <div
            key={row._key}
            className="p-5 rounded-xl border border-olive-200 dark:border-olive-700 bg-cream-50/50 dark:bg-olive-900/30 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-olive-700 dark:text-cream-200">
                Activity {index + 1}
              </span>
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(row._key)}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Remove row"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {!shared.useShared && (
              <div className="grid sm:grid-cols-2 gap-3">
                <select
                  value={row.semester}
                  onChange={(e) => updateRow(row._key, { semester: Number(e.target.value) })}
                  className="px-3 py-2 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-sm"
                >
                  {SEMESTERS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <select
                  value={row.type}
                  onChange={(e) => updateRow(row._key, { type: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-sm"
                >
                  <option value={ACTIVITY_TYPES.CURRICULAR}>Curricular</option>
                  <option value={ACTIVITY_TYPES.COCURRICULAR}>Co-Curricular</option>
                </select>
              </div>
            )}

            <input
              type="text"
              value={row.title}
              onChange={(e) => updateRow(row._key, { title: e.target.value })}
              placeholder="Activity title *"
              className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100"
            />

            <textarea
              rows={3}
              value={row.description}
              onChange={(e) => updateRow(row._key, { description: e.target.value })}
              placeholder="Description (optional)"
              className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 text-sm resize-y"
            />

            <ImageUploader
              images={row.images}
              onImagesChange={(images) => updateRow(row._key, { images })}
              onUpload={(files) => handleUpload(row._key, files)}
              uploading={uploadingRow === row._key}
              pasteId={`bulk-row-${row._key}`}
            />
          </div>
        ))}
      </div>

      <Button type="button" variant="secondary" onClick={addRow} className="w-full sm:w-auto">
        <Plus size={18} />
        Add Another Row
      </Button>

      <div className="flex flex-wrap gap-3 justify-end pt-4 border-t border-olive-200 dark:border-olive-700">
        <Button type="button" variant="ghost" onClick={onCancel}>
          <X size={18} />
          Cancel
        </Button>
        <Button type="submit" disabled={saving || filledCount === 0}>
          <Save size={18} />
          {saving ? 'Saving...' : `Save All (${filledCount})`}
        </Button>
      </div>
    </form>
  )
}
