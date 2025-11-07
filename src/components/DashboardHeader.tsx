import { Activity } from 'lucide-react'

interface DashboardHeaderProps {
  currentUserEmail: string | null
}

export const DashboardHeader = ({ currentUserEmail }: DashboardHeaderProps) => {
  return (
    <div className="bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Voice Analytics</h1>
              <p className="text-sm text-gray-400">Real-time monitoring & insights</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {currentUserEmail && (
              <div className="flex items-center gap-2 px-3 py-2 bg-teal-400/10 border border-teal-400/20 rounded-lg">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm text-teal-400 font-medium">{currentUserEmail}</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
