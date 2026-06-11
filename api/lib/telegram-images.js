const MAX_BYTES = 280_000

async function getSharp() {
  const { default: sharp } = await import('sharp')
  return sharp
}

export async function telegramPhotoToBase64(fileId, botToken) {
  const sharp = await getSharp()
  const fileMeta = await fetch(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
  ).then((r) => r.json())

  if (!fileMeta.ok) throw new Error('Failed to get Telegram file')

  const filePath = fileMeta.result.file_path
  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`
  const buffer = Buffer.from(await fetch(fileUrl).then((r) => r.arrayBuffer()))

  let quality = 80
  let output = await sharp(buffer)
    .rotate()
    .resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toBuffer()

  while (output.length > MAX_BYTES && quality > 30) {
    quality -= 10
    output = await sharp(buffer)
      .rotate()
      .resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()
  }

  return `data:image/webp;base64,${output.toString('base64')}`
}
