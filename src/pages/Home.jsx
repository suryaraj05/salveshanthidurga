import { useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useOutletContext } from 'react-router-dom'
import Hero from '../components/portfolio/Hero'
import About from '../components/portfolio/About'
import TableOfContents from '../components/portfolio/TableOfContents'
import SemesterSection from '../components/portfolio/SemesterSection'
import PortfolioToolbar from '../components/portfolio/PortfolioToolbar'
import { HeroSkeleton } from '../components/common/LoadingSkeleton'
import { useProfile } from '../hooks/useProfile'
import { useActivities } from '../hooks/useActivities'
import { SEMESTERS } from '../utils/constants'
import { exportPortfolioPDF } from '../utils/pdfExport'

export default function Home() {
  const outletContext = useOutletContext()
  const { profile: hookProfile, loading: profileLoading } = useProfile()
  const profile = outletContext?.profile || hookProfile

  const [exporting, setExporting] = useState(false)

  const {
    activities,
    activityCounts,
    loading: activitiesLoading,
    searchQuery,
    setSearchQuery,
    semesterFilter,
    setSemesterFilter,
  } = useActivities()

  const semestersToShow = useMemo(
    () =>
      semesterFilter
        ? SEMESTERS.filter((s) => s.id === Number(semesterFilter))
        : SEMESTERS,
    [semesterFilter]
  )

  const handleExportPDF = async () => {
    try {
      setExporting(true)
      await exportPortfolioPDF('portfolio-content')
      toast.success('Portfolio downloaded as PDF')
    } catch {
      toast.error('Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }

  if (profileLoading) {
    return <HeroSkeleton />
  }

  return (
    <div id="portfolio-content">
      <Hero profile={profile} />
      <About profile={profile} />
      <TableOfContents activityCounts={activityCounts} />

      <PortfolioToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        semesterFilter={semesterFilter}
        onSemesterFilterChange={setSemesterFilter}
        onExportPDF={handleExportPDF}
        exporting={exporting}
      />

      {semestersToShow.map((semester) => (
        <SemesterSection
          key={semester.id}
          semester={semester}
          activities={activities}
          loading={activitiesLoading}
        />
      ))}
    </div>
  )
}
