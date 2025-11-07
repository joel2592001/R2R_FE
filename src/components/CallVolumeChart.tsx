interface CallVolumeData {
    day: string
    calls: number
    successful: number
}

interface CallVolumeChartProps {
    data: CallVolumeData[]
}

export const CallVolumeChart = ({ data }: CallVolumeChartProps) => {
    const maxCalls = Math.max(...data.map(d => d.calls))

    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">Daily Call Volume</h3>
                    <p className="text-xs md:text-sm text-gray-400">Weekly performance overview</p>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-xl md:text-2xl font-bold text-teal-400">87.3%</p>
                    <p className="text-xs text-gray-500">success</p>
                </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-3">
                {data.map((item, index) => {
                    const totalHeightPx = (item.calls / maxCalls) * 200
                    const successHeightPx = (item.successful / maxCalls) * 200
                    const failedHeightPx = totalHeightPx - successHeightPx
                    return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full relative" style={{ height: `${totalHeightPx}px` }}>
                                <div
                                    className="absolute top-0 inset-x-0 bg-gray-700/50 rounded-t-lg transition-all hover:bg-gray-600"
                                    style={{ height: `${failedHeightPx}px` }}
                                ></div>
                                <div
                                    className="absolute bottom-0 inset-x-0 bg-teal-400 rounded-t-lg transition-all hover:bg-teal-300"
                                    style={{ height: `${successHeightPx}px` }}
                                >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                        <div>{item.calls} total</div>
                                        <div>{item.successful} success</div>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{item.day}</span>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center gap-4 md:gap-6 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-700 rounded"></div>
                    <span className="text-xs text-gray-400">Total</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-teal-400 rounded"></div>
                    <span className="text-xs text-gray-400">Successful</span>
                </div>
            </div>
        </div>
    )
}
