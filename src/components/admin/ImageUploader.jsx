import { useCallback, useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

export default function ImageUploader({
  images = [],
  onImagesChange,
  onUpload,
  uploading = false,
}) {
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = useCallback(
    async (files) => {
      if (!files?.length) return
      if (onUpload) {
        const urls = await onUpload(Array.from(files))
        onImagesChange([...images, ...urls])
      }
    },
    [images, onImagesChange, onUpload]
  )

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
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver
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
            {uploading ? 'Uploading & compressing...' : 'Drag & drop or click to upload'}
          </span>
          <span className="text-xs text-olive-400">
            Compressed & saved as base64 in Firestore (~200KB each, max 4)
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
