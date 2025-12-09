import type React from "react"
export function StatsCard({
  title,
  value,
  change,
  icon,
  bgColor,
  textColor,
}: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  bgColor: string
  textColor: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`${bgColor} ${textColor} p-3 rounded-lg`}>{icon}</div>
      </div>
      <p className="text-emerald-600 text-sm font-medium">{change}</p>
    </div>
  )
}
