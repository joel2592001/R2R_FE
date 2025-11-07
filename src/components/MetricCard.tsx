import { TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  title: string
  value: string
  trend: number
  trendUp?: boolean
}

export const MetricCard = ({ 
  icon: Icon, 
  iconColor, 
  iconBgColor, 
  title, 
  value, 
  trend, 
  trendUp = true 
}: MetricCardProps) => {
  const trendColor = trendUp ? 'text-green-400' : 'text-red-400'
  const trendSign = trendUp ? '+' : ''

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 md:p-6 hover:border-gray-600 transition-all">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`} />
        </div>
        <div className={`flex items-center gap-1 ${trendColor} text-xs md:text-sm`}>
          <TrendingUp className={`w-3 h-3 md:w-4 md:h-4 ${!trendUp ? 'rotate-180' : ''}`} />
          <span>{trendSign}{trend}%</span>
        </div>
      </div>
      <p className="text-gray-400 text-xs md:text-sm mb-1">{title}</p>
      <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
