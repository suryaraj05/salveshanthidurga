import { useRef, useCallback, useEffect } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Link, Eraser } from 'lucide-react'

function ToolbarButton({ onClick, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 rounded-lg text-olive-700 dark:text-cream-200 hover:bg-olive-100 dark:hover:bg-olive-700 transition-colors"
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ value, onChange, placeholder = 'Add description...' }) {
  const editorRef = useRef(null)
  const isTyping = useRef(false)

  // Sync external value changes (e.g. when editing an existing item)
  useEffect(() => {
    if (!editorRef.current || isTyping.current) return
    const html = value || ''
    if (editorRef.current.innerHTML !== html) {
      editorRef.current.innerHTML = html
    }
  }, [value])

  const exec = useCallback(
    (command, arg = null) => {
      document.execCommand(command, false, arg)
      editorRef.current?.focus()
      isTyping.current = true
      onChange(editorRef.current?.innerHTML || '')
      isTyping.current = false
    },
    [onChange]
  )

  const handleInput = () => {
    isTyping.current = true
    onChange(editorRef.current?.innerHTML || '')
    isTyping.current = false
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) exec('createLink', url)
  }

  return (
    <div className="rich-text-editor">
      <label className="block text-sm font-medium text-olive-700 dark:text-cream-200 mb-2">
        Description (optional)
      </label>

      <div className="rounded-xl border border-olive-200 dark:border-olive-700 overflow-hidden bg-white dark:bg-olive-900">
        <div className="flex flex-wrap gap-1 p-2 border-b border-olive-200 dark:border-olive-700 bg-cream-50 dark:bg-olive-800">
          <ToolbarButton onClick={() => exec('bold')} title="Bold">
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('italic')} title="Italic">
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('underline')} title="Underline">
            <Underline size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Bullet list">
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('insertOrderedList')} title="Numbered list">
            <ListOrdered size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={addLink} title="Link">
            <Link size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec('removeFormat')} title="Clear formatting">
            <Eraser size={16} />
          </ToolbarButton>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          data-placeholder={placeholder}
          className="min-h-[120px] p-4 text-olive-900 dark:text-cream-100 focus:outline-none prose-portfolio empty:before:content-[attr(data-placeholder)] empty:before:text-olive-400"
        />
      </div>
    </div>
  )
}
