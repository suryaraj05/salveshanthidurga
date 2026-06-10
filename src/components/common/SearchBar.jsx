import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search activities...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-olive-400"
        size={18}
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-800 text-olive-900 dark:text-cream-100 placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-olive-400 transition-shadow"
        aria-label="Search portfolio content"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-olive-400 hover:text-olive-600"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
