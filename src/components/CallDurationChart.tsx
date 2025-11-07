interface CallDurationData {
    time: string
    duration: number
}

interface CallDurationChartProps {
    data: CallDurationData[]
}

export const CallDurationChart = ({ data }: CallDurationChartProps) => {
    const maxDuration = Math.max(...data.map(d => d.duration))
    const minDuration = Math.min(...data.map(d => d.duration))
    const padding = 40
    const chartHeight = 200
    const chartWidth = 600

    // Calculate points for the line
    const points = data.map((item, index) => {
        const x = (index / (data.length - 1)) * (chartWidth - padding * 2) + padding
        const y = chartHeight - ((item.duration - minDuration) / (maxDuration - minDuration)) * (chartHeight - padding * 2) - padding
        return { x, y, ...item }
    })

    // Create path for line
    const linePath = points.map((point, index) =>
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ')

    // Create path for area fill
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`

    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">Call Duration Trends</h3>
                    <p className="text-xs md:text-sm text-gray-400">Average duration throughout the day</p>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-xl md:text-2xl font-bold text-teal-400">4m 32s</p>
                    <p className="text-xs text-gray-500">avg</p>
                </div>
            </div>
            <div className="relative h-64">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={i}
                            x1={padding}
                            y1={padding + (i * (chartHeight - padding * 2) / 4)}
                            x2={chartWidth - padding}
                            y2={padding + (i * (chartHeight - padding * 2) / 4)}
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Area fill */}
                    <path
                        d={areaPath}
                        fill="url(#gradient)"
                        opacity="0.3"
                    />

                    {/* Line */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {points.map((point, index) => (
                        <g key={index}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="5"
                                fill="#14b8a6"
                                stroke="#0f172a"
                                strokeWidth="2"
                                className="hover:r-7 transition-all cursor-pointer"
                            />
                            <text
                                x={point.x}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                fill="#9ca3af"
                                fontSize="12"
                            >
                                {point.time}
                            </text>
                        </g>
                    ))}

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}
