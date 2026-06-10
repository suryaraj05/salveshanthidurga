import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Layers } from 'lucide-react'
import ContentForm from '../../components/admin/ContentForm'
import BulkContentForm from '../../components/admin/BulkContentForm'
import ContentDefaultsSettings from '../../components/admin/ContentDefaultsSettings'
import ContentList from '../../components/admin/ContentList'
import Button from '../../components/common/Button'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { useActivities } from '../../hooks/useActivities'
import { useContentDefaults } from '../../hooks/useContentDefaults'

export default function ContentManager() {
  const { defaults, setDefaults } = useContentDefaults()
  const {
    allActivities,
    loading,
    addActivity,
    addActivities,
    editActivity,
    removeActivity,
    reorder,
  } = useActivities()

  // null | 'single' | 'bulk'
  const [formMode, setFormMode] = useState(null)
  const [editing, setEditing] = useState(null)

  const closeForm = () => {
    setFormMode(null)
    setEditing(null)
  }

  const handleSaveSingle = async (formData) => {
    try {
      if (editing) {
        await editActivity(editing.id, editing.type, {
          title: formData.title,
          description: formData.description,
          semester: formData.semester,
          images: formData.images,
        })
        toast.success('Content updated')
      } else {
        await addActivity(formData)
        setDefaults({ semester: formData.semester, type: formData.type })
        toast.success('Content added')
      }
      closeForm()
    } catch (err) {
      toast.error(err.message || 'Failed to save')
    }
  }

  const handleSaveBulk = async (items) => {
    try {
      await addActivities(items)
      const last = items[items.length - 1]
      setDefaults({ semester: last.semester, type: last.type })
      toast.success(`${items.length} activities added`)
      closeForm()
    } catch (err) {
      toast.error(err.message || 'Failed to save activities')
    }
  }

  const handleEdit = (activity) => {
    setEditing(activity)
    setFormMode('single')
  }

  const handleDelete = async (activity) => {
    if (!confirm(`Delete "${activity.title}"?`)) return
    try {
      await removeActivity(activity.id, activity.type)
      toast.success('Content deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const handleReorder = async (items) => {
    try {
      await reorder(items)
    } catch {
      toast.error('Failed to reorder')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-olive-900 dark:text-cream-50">
            Content Manager
          </h1>
          <p className="text-olive-600 dark:text-cream-300 mt-1">
            Add, edit, and reorder portfolio activities
          </p>
        </div>
        {!formMode && (
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => { setEditing(null); setFormMode('bulk') }}>
              <Layers size={18} />
              Bulk Add
            </Button>
            <Button onClick={() => { setEditing(null); setFormMode('single') }}>
              <Plus size={18} />
              Add One
            </Button>
          </div>
        )}
      </div>

      <ContentDefaultsSettings defaults={defaults} onSave={setDefaults} />

      {formMode === 'single' && (
        <div className="mb-8">
          <ContentForm
            initialData={editing}
            defaults={defaults}
            onSave={handleSaveSingle}
            onCancel={closeForm}
          />
        </div>
      )}

      {formMode === 'bulk' && (
        <div className="mb-8">
          <BulkContentForm
            defaults={defaults}
            onSave={handleSaveBulk}
            onCancel={closeForm}
          />
        </div>
      )}

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <ContentList
          activities={allActivities}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReorder={handleReorder}
        />
      )}
    </div>
  )
}
