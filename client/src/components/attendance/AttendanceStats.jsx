import { AlertCircle, Calendar, Clock, Activity } from "lucide-react"

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter((h) => h.status === "PRESENT" || h.status === "LATE").length
  const totalLate = history.filter((h) => h.status === "LATE").length
  
  const stats = [
    { 
      label: "Days Present", 
      value: String(totalPresent).padStart(2, '0'), 
      icon: Calendar,
      color: "text-emerald-600",
      bg: "bg-emerald-50/30"
    },
    { 
      label: "Late Arrivals", 
      value: String(totalLate).padStart(2, '0'), 
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50/30"
    },
    { 
      label: "Avg. Work Hrs", 
      value: "08:12", 
      icon: Clock,
      color: "text-indigo-600",
      bg: "bg-indigo-50/30"
    },
    { 
      label: "Efficiency", 
      value: "94%", 
      icon: Activity,
      color: "text-slate-900",
      bg: "bg-slate-50"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className="terminal-card terminal-card-hover p-6 group relative overflow-hidden"
        >
          {/* Subtle Background Icon Decoration */}
          <stat.icon 
            size={80} 
            className="absolute -right-4 -bottom-4 text-slate-50 opacity-50 group-hover:text-slate-100 transition-colors" 
          />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="label-technical">{stat.label}</span>
              <div className={`p-2 ${stat.bg} ${stat.color}`}>
                <stat.icon size={14} />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light text-slate-900 tracking-tighter">
                {stat.value}
              </span>
              <span className="label-technical text-[8px]">Current Period</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AttendanceStats