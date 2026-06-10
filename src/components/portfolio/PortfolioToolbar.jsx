import { Download, Printer, Filter } from 'lucide-react'
import { SEMESTERS } from '../../utils/constants'
import SearchBar from '../common/SearchBar'
import Button from '../common/Button'

export default function PortfolioToolbar({
  searchQuery,
  onSearchChange,
  semesterFilter,
  onSemesterFilterChange,
  onExportPDF,
  exporting,
}) {
  const handlePrint = () => window.print()

  return (
    <div
      id="portfolio"
      className="sticky top-[57px] z-40 py-4 px-4 bg-cream-100/95 dark:bg-olive-900/95 backdrop-blur-sm border-b border-olive-200/50 dark:border-olive-700/50 print-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          className="flex-1 max-w-md"
        />

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-olive-500 shrink-0" />
            <select
              value={semesterFilter}
              onChange={(e) => onSemesterFilterChange(e.target.value)}
              className="px-3 py-2 rounded-xl border border-olive-200 dark:border-olive-700 bg-white dark:bg-olive-800 text-olive-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
              aria-label="Filter by semester"
            >
              <option value="">All Semesters</option>
              {SEMESTERS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <Button variant="secondary" size="sm" onClick={handlePrint}>
            <Printer size={16} />
            Print
          </Button>

          <Button variant="primary" size="sm" onClick={onExportPDF} disabled={exporting}>
            <Download size={16} />
            {exporting ? 'Exporting...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </div>
  )
}
