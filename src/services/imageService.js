import {
  compressImage,
  fileToBase64,
  MAX_IMAGE_BYTES,
  MAX_IMAGES_PER_ITEM,
} from '../utils/imageCompression'

/**
 * Compress an image and return a base64 data URL for Firestore storage.
 * Firebase Storage is not used — images live in the `images[]` field on each document.
 */
export async function uploadImage(file) {
  const compressed = await compressImage(file)
  const base64 = await fileToBase64(compressed)

  if (base64.length > MAX_IMAGE_BYTES) {
    throw new Error(
      'Image is too large after compression. Use a smaller image or lower resolution.'
    )
  }

  return base64
}

export async function uploadImages(files) {
  const fileList = Array.from(files)

  if (fileList.length > MAX_IMAGES_PER_ITEM) {
    throw new Error(`Maximum ${MAX_IMAGES_PER_ITEM} images per item`)
  }

  const urls = []
  for (const file of fileList) {
    const base64 = await uploadImage(file)
    urls.push(base64)
  }
  return urls
}
