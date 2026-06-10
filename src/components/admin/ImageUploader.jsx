import { useCallback, useState } from 'react'
import { Upload, X, Image as ImageIcon, ClipboardPaste } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRegisterImagePaste } from '../../context/ImagePasteContext'
import { MAX_IMAGES_PER_ITEM } from '../../utils/imageCompression'

export default function ImageUploader({
  images = [],
  onImagesChange,
  onUpload,
  uploading = false,
  pasteId = 'content-images',
}) {
  const [dragOver, setDragOver] = useState(false)
  const [pasteActive, setPasteActive] = useState(false)

  const handleFiles = useCallback(
    async (files) => {
      if (!files?.length || !onUpload || uploading) return

      const fileList = Array.from(files)
      const remaining = MAX_IMAGES_PER_ITEM - images.length

      if (remaining <= 0) {
        toast.error(`Maximum ${MAX_IMAGES_PER_ITEM} images allowed`)
        return
      }

      const toUpload = fileList.slice(0, remaining)
      if (fileList.length > remaining) {
        toast.error(`Only ${remaining} more image(s) can be added`)
      }

      try {
        const urls = await onUpload(toUpload)
        onImagesChange([...images, ...urls])
        toast.success(toUpload.length > 1 ? 'Images added' : 'Image added')
      } catch (err) {
        toast.error(err.message || 'Failed to add image')
      }
    },
    [images, onImagesChange, onUpload, uploading]
  )

  useRegisterImagePaste(pasteId, handleFiles, !uploading)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeImage = (index) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-olive-700 dark:text-cream-200">
        Images (optional)
      </label>

      <div
        tabIndex={0}
        onMouseEnter={() => setPasteActive(true)}
        onMouseLeave={() => setPasteActive(false)}
        onFocus={() => setPasteActive(true)}
        onBlur={() => setPasteActive(false)}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors outline-none focus:ring-2 focus:ring-olive-400 ${
          dragOver || pasteActive
            ? 'border-olive-500 bg-olive-50 dark:bg-olive-800/50'
            : 'border-olive-200 dark:border-olive-700'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center gap-2 text-olive-600 dark:text-cream-300"
        >
          <Upload size={32} className="text-olive-400" />
          <span className="font-medium">
            {uploading ? 'Compressing...' : 'Drag & drop, click to upload, or Ctrl+V to paste'}
          </span>
          <span className="text-xs text-olive-400 flex items-center gap-1">
            <ClipboardPaste size={12} />
            Paste works anywhere on this admin page · max {MAX_IMAGES_PER_ITEM} images (~200KB each)
          </span>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, i) => (
            <div key={url + i} className="relative group rounded-lg overflow-hidden aspect-square bg-olive-100">
              {url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:') ? (
                <img src={url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="text-olive-400" />
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
