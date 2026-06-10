import imageCompression from 'browser-image-compression'

/** Firestore documents have a 1MB limit — keep each image small */
export const MAX_IMAGE_BYTES = 280_000
export const MAX_IMAGES_PER_ITEM = 4

/**
 * Compress image for Firestore base64 storage (~200KB target)
 */
export async function compressImage(file) {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: 'image/webp',
  }

  try {
    const compressed = await imageCompression(file, options)
    const extension = 'webp'
    const baseName = file.name.replace(/\.[^/.]+$/, '')
    return new File([compressed], `${baseName}.${extension}`, {
      type: 'image/webp',
      lastModified: Date.now(),
    })
  } catch {
    return file
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function compressImages(files) {
  return Promise.all(Array.from(files).map(compressImage))
}
