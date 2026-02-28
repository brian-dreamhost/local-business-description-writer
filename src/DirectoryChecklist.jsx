import DirectoryItem from './DirectoryItem'
import { getRelevantDirectories } from './directoryData'

export default function DirectoryChecklist({ businessType, statuses, onStatusChange }) {
  const directories = getRelevantDirectories(businessType)

  const listedCount = directories.filter(d => statuses[d.id] === 'listed').length
  const totalCount = directories.length
  const progressPercent = totalCount > 0 ? (listedCount / totalCount) * 100 : 0

  return (
    <div className="card-gradient rounded-2xl border border-metal/20 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-azure">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Directory Submission Checklist
      </h2>
      <p className="text-sm text-galactic mb-4">
        Track your progress across {totalCount} directories relevant to your industry. Click the checkbox to cycle through statuses.
      </p>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-cloudy">
            {listedCount} of {totalCount} directories listed
          </span>
          <span className="text-sm font-medium text-azure">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2.5 bg-metal/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-azure rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-metal/40" />
          <span className="text-galactic">Not Listed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-turtle border-2 border-turtle" />
          <span className="text-galactic">Listed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-tangerine/20 border-2 border-tangerine" />
          <span className="text-galactic">Needs Update</span>
        </div>
      </div>

      {/* Directory list */}
      <div className="space-y-2">
        {directories.map(directory => (
          <DirectoryItem
            key={directory.id}
            directory={directory}
            status={statuses[directory.id] || 'not-listed'}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {/* Completion message */}
      {listedCount === totalCount && totalCount > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-turtle/10 border border-turtle/20 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-turtle shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p className="text-sm text-turtle font-medium">All directories listed! Great job maintaining consistent citations.</p>
        </div>
      )}
    </div>
  )
}
