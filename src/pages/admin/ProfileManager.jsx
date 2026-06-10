import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { Save, Upload, ClipboardPaste } from 'lucide-react'
import Button from '../../components/common/Button'
import { useProfile } from '../../hooks/useProfile'
import { uploadImage } from '../../services/imageService'
import { HeroSkeleton } from '../../components/common/LoadingSkeleton'
import { useRegisterImagePaste } from '../../context/ImagePasteContext'

export default function ProfileManager() {
  const { profile, loading, updateProfile } = useProfile()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (profile) setForm({ ...profile })
  }, [profile])

  const processPhoto = useCallback(async (file) => {
    if (!file || uploading) return

    setUploading(true)
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, photoUrl: url }))
      toast.success('Photo added')
    } catch (err) {
      toast.error(err.message || 'Failed to add photo')
    } finally {
      setUploading(false)
    }
  }, [uploading])

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (file) await processPhoto(file)
  }

  const handlePhotoPaste = useCallback(
    async (files) => {
      const file = files[0]
      if (file) await processPhoto(file)
    },
    [processPhoto]
  )

  useRegisterImagePaste('profile-photo', handlePhotoPaste, !uploading)

  const handleArrayField = (field, value) => {
    const items = value.split(',').map((s) => s.trim()).filter(Boolean)
    setForm((f) => ({ ...f, [field]: items }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(form)
      toast.success('Profile saved')
    } catch {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) return <HeroSkeleton />

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-olive-900 dark:text-cream-50 mb-2">
        Profile Settings
      </h1>
      <p className="text-olive-600 dark:text-cream-300 mb-8">
        Update your hero and about section content
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md border border-cream-300/50 dark:border-olive-700">
          <h2 className="font-display text-lg font-semibold mb-4">Photo</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-6">
              {form.photoUrl ? (
                <img src={form.photoUrl} alt="" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-olive-200 flex items-center justify-center text-2xl font-display text-olive-600">
                  {form.fullName?.charAt(0)}
                </div>
              )}
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-olive-100 dark:bg-olive-700 text-olive-700 dark:text-cream-200 text-sm hover:bg-olive-200 transition-colors">
                  <Upload size={16} />
                  {uploading ? 'Adding...' : 'Upload Photo'}
                </span>
              </label>
            </div>
            <p className="text-xs text-olive-500 dark:text-cream-400 flex items-center gap-1">
              <ClipboardPaste size={12} />
              Or press Ctrl+V anywhere on this page to paste an image
            </p>
          </div>
        </div>

        {[
          { key: 'fullName', label: 'Full Name' },
          { key: 'subtitle', label: 'Subtitle' },
          { key: 'introduction', label: 'Introduction', textarea: true },
          { key: 'about', label: 'About', textarea: true },
          { key: 'teachingPhilosophy', label: 'Teaching Philosophy', textarea: true },
        ].map(({ key, label, textarea }) => (
          <div
            key={key}
            className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md border border-cream-300/50 dark:border-olive-700"
          >
            <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2">
              {label}
            </label>
            {textarea ? (
              <textarea
                rows={4}
                value={form[key] || ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-400"
              />
            ) : (
              <input
                type="text"
                value={form[key] || ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-400"
              />
            )}
          </div>
        ))}

        {['skills', 'interests'].map((field) => (
          <div
            key={field}
            className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md border border-cream-300/50 dark:border-olive-700"
          >
            <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2 capitalize">
              {field} (comma-separated)
            </label>
            <input
              type="text"
              value={(form[field] || []).join(', ')}
              onChange={(e) => handleArrayField(field, e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-900 text-olive-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-400"
            />
          </div>
        ))}

        <Button type="submit" disabled={saving}>
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </div>
  )
}
