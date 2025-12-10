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
    <div className="bg-linear-to-br from-[#f9f7fe] via-[#fef9f5] to-[#faf4ed] 
        rounded-xl border border-[#d4a574]/40 
        p-5 transition hover:shadow-md hover:border-[#d4a574]">
      
      {/* Top section */}
      <div className="flex items-start justify-between mb-4">

        {/* Text */}
        <div>
          <p className="text-[#555557] text-xs font-medium uppercase tracking-wide">
            {title}
          </p>

          {/* Value */}
          <p className="text-3xl font-bold text-black mt-3">
            {value}
          </p>
        </div>

        {/* Icon container (styled) */}
        <div className={`${bgColor} ${textColor} p-3 rounded-lg shadow-sm 
            border border-white/20`}>
          {icon}
        </div>
      </div>

      {/* Change text */}
      <p className="text-[#555557] text-xs">
        {change}
      </p>
    </div>
  )
}
