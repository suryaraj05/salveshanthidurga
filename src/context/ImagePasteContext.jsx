import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { getImagesFromClipboard } from '../utils/clipboardImages'

const ImagePasteContext = createContext(null)

export function ImagePasteProvider({ children }) {
  const targetRef = useRef(null)

  const registerPasteTarget = useCallback((id, onPaste) => {
    targetRef.current = { id, onPaste }
    return () => {
      if (targetRef.current?.id === id) targetRef.current = null
    }
  }, [])

  useEffect(() => {
    const handlePaste = (e) => {
      const files = getImagesFromClipboard(e.clipboardData)
      if (!files.length || !targetRef.current) return

      e.preventDefault()
      targetRef.current.onPaste(files)
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [])

  return (
    <ImagePasteContext.Provider value={{ registerPasteTarget }}>
      {children}
    </ImagePasteContext.Provider>
  )
}

/** Register this component as the active Ctrl+V image paste target in the admin panel */
export function useRegisterImagePaste(id, onPaste, enabled = true) {
  const { registerPasteTarget } = useContext(ImagePasteContext) || {}
  const onPasteRef = useRef(onPaste)
  onPasteRef.current = onPaste

  useEffect(() => {
    if (!registerPasteTarget || !enabled) return
    return registerPasteTarget(id, (files) => onPasteRef.current?.(files))
  }, [id, enabled, registerPasteTarget])
}
