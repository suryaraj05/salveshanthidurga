import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import ContentForm from '../../components/admin/ContentForm'
import ContentList from '../../components/admin/ContentList'
import Button from '../../components/common/Button'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { useActivities } from '../../hooks/useActivities'

export default function ContentManager() {
  const {
    allActivities,
    loading,
    addActivity,
    editActivity,
    removeActivity,
    reorder,
  } = useActivities()

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await editActivity(editing.id, editing.type, {
          title: formData.title,
          description: formData.description,
          semester: formData.semester,
          images: formData.images,
          // Type change requires delete + recreate — keep same collection for edits
        })
        toast.success('Content updated')
      } else {
        await addActivity(formData)
        toast.success('Content added')
      }
      setShowForm(false)
      setEditing(null)
    } catch (err) {
      toast.error(err.message || 'Failed to save')
    }
  }

  const handleEdit = (activity) => {
    setEditing(activity)
    setShowForm(true)
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-olive-900 dark:text-cream-50">
            Content Manager
          </h1>
          <p className="text-olive-600 dark:text-cream-300 mt-1">
            Add, edit, and reorder portfolio activities
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => { setEditing(null); setShowForm(true) }}>
            <Plus size={18} />
            Add Content
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-8">
          <ContentForm
            initialData={editing}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditing(null) }}
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
