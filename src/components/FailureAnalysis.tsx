import { AlertCircle, Download } from 'lucide-react'

export interface SadPathData {
  name: string
  value: number
  color: string
}

interface FailureAnalysisProps {
  data: SadPathData[]
  isEditMode: boolean
  hasUnsavedChanges: boolean
  onEditClick: () => void
  onCancelEdit: () => void
  onLoadClick: () => void
  onValueChange: (index: number, newValue: number) => void
}

export const FailureAnalysis = ({
  data,
  isEditMode,
  hasUnsavedChanges,
  onEditClick,
  onCancelEdit,
  onLoadClick,
  onValueChange
}: FailureAnalysisProps) => {
  const totalFailures = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-white mb-1">Call Failure Analysis</h3>
          <p className="text-xs md:text-sm text-gray-400">Understanding failure patterns and trends</p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 w-full sm:w-auto">
          {!isEditMode && (
            <button
              onClick={onLoadClick}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-sm md:text-base text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Download className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Load Data</span>
              <span className="sm:hidden">Load</span>
            </button>
          )}
          {isEditMode && (
            <button
              onClick={onCancelEdit}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-sm md:text-base text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all font-medium"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onEditClick}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2 text-sm md:text-base rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              isEditMode
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                : 'bg-teal-400 text-gray-900 hover:bg-teal-300 shadow-lg'
            }`}
          >
            {isEditMode ? (
              <>
                <Download className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Edit Data</span>
                <span className="sm:hidden">Edit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isEditMode && hasUnsavedChanges && (
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2 md:gap-3">
          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-yellow-400">
            You have unsaved changes. Click "Save Changes" to persist them.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Donut Chart */}
        <div className="lg:col-span-1 flex justify-center">
          <div className="relative w-full aspect-square max-w-xs md:max-w-sm">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              {data.map((item, index) => {
                const total = data.reduce((sum, d) => sum + d.value, 0)
                const percentage = (item.value / total) * 100
                const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0)
                const endAngle = startAngle + (percentage / 100) * 360
                
                const startRad = (startAngle - 90) * (Math.PI / 180)
                const endRad = (endAngle - 90) * (Math.PI / 180)
                
                const x1 = 100 + 80 * Math.cos(startRad)
                const y1 = 100 + 80 * Math.sin(startRad)
                const x2 = 100 + 80 * Math.cos(endRad)
                const y2 = 100 + 80 * Math.sin(endRad)
                
                const largeArc = percentage > 50 ? 1 : 0
                
                return (
                  <path
                    key={index}
                    d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={item.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    stroke="rgba(17, 24, 39, 0.5)"
                    strokeWidth="1"
                  />
                )
              })}
              <circle cx="100" cy="100" r="50" fill="rgb(31, 41, 55)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl md:text-3xl font-bold text-white">{totalFailures}</p>
              <p className="text-xs md:text-sm text-gray-400">Total Failures</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="lg:col-span-2">
          <h4 className="text-sm md:text-base font-semibold text-white mb-3 md:mb-4">Failure Reasons</h4>
          <div className="grid grid-cols-1 gap-2 md:gap-3">
            {data.map((item, index) => {
              const percentage = ((item.value / totalFailures) * 100).toFixed(1)
              return (
                <div key={item.name} className="flex items-center justify-between p-2 md:p-3 bg-gray-700/30 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition-all">
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs md:text-sm text-gray-300 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    {isEditMode ? (
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => onValueChange(index, parseInt(e.target.value) || 0)}
                        className="w-14 md:w-16 px-2 py-1 text-xs md:text-sm bg-gray-900/50 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 text-center text-white"
                        min="0"
                      />
                    ) : (
                      <span className="text-xs md:text-sm font-semibold text-white">{item.value}</span>
                    )}
                    <span className="text-xs text-gray-500 w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
