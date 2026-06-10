/**
 * Extract image files from a clipboard paste event
 */
export function getImagesFromClipboard(clipboardData) {
  if (!clipboardData?.items) return []

  const files = []
  for (const item of clipboardData.items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) files.push(file)
    }
  }
  return files
}
