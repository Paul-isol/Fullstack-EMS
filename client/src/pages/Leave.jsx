import { useCallback, useEffect, useState } from "react"
import { dummyLeaveData } from "../assets/assets"
import Loading from "../components/Loading"
import { Palmtree, Thermometer, Umbrella, Plus, ShieldCheck, ArrowUpRight } from "lucide-react"
import LeaveHistory from "../components/leave/LeaveHistory"
import ApplyLeaveModel from "../components/leave/ApplyLeaveModel"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import api from "../api/axios.js"


const Leave = () => {
  const {user} = useAuth()
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModel, setShowModel] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  // Mocking isAdmin for design purposes (could be passed as prop or from context)
  const isAdmin = user?.role === "ADMIN"; 

  const fetchLeaveData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get("/leave")
      setLeaves(response.data.data)
    } catch (error) {
      toast.error(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeaveData()
  }, [fetchLeaveData])

  if (loading) {
    return <Loading />
  }

  const sickCount = leaves.filter(l => l.type === "SICK" && l.status === "APPROVED").length
  const casualCount = leaves.filter(l => l.type === "CASUAL" && l.status === "APPROVED").length
  const annualCount = leaves.filter(l => l.type === "ANNUAL" && l.status === "APPROVED").length

  const leaveStats = [
    { 
      label: "Sick Leave", 
      value: String(sickCount).padStart(2, '0'), 
      icon: Thermometer,
      color: "text-amber-600",
      bg: "bg-amber-50/30",
      description: "Health recovery"
    },
    { 
      label: "Casual Leave", 
      value: String(casualCount).padStart(2, '0'), 
      icon: Umbrella,
      color: "text-indigo-600",
      bg: "bg-indigo-50/30",
      description: "Personal time"
    },
    { 
      label: "Annual Leave", 
      value: String(annualCount).padStart(2, '0'), 
      icon: Palmtree,
      color: "text-emerald-600",
      bg: "bg-emerald-50/30",
      description: "Planned vacation"
    }
  ]

  return (
    <div className="space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative">
        <div className="w-10 h-px bg-slate-200 mb-6" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-light text-slate-900 tracking-tight mb-3">
              Leave Management
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span className="label-technical text-slate-900">
                  {isAdmin ? "Admin Console" : "Employee Portal"}
                </span>
              </div>
              <div className="w-1 h-1 rounded-none bg-slate-200" />
              <span className="label-technical text-slate-400">
                {isAdmin ? "Overseeing global applications" : "Terminal Logs: Leave History"}
              </span>
            </div>
          </div>
          
          {!isAdmin && !isDeleted && (
            <button 
              className="btn-terminal btn-terminal-primary group" 
              onClick={() => setShowModel(true)}
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              Request New Leave
            </button>
          )}
        </div>
      </div>

      {/* Stats Bento Grid (Only for Employees) */}
      {!isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaveStats.map((stat) => (
            <div 
              key={stat.label} 
              className="terminal-card terminal-card-hover p-6 group relative overflow-hidden"
            >
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
                  <span className="label-technical text-[8px]">{stat.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leave History Log */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-3 bg-slate-900" />
          <span className="label-technical text-slate-900">Application Records</span>
        </div>
        <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaveData} />
      </div>

      {/* Quick Access Info */}
      {!isAdmin && (
        <div className="terminal-card p-8 bg-slate-50/50 border-dashed">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white border border-slate-100 text-slate-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="label-technical text-slate-900 mb-1">Policy Notice</h4>
              <p className="text-[12px] text-slate-500 leading-relaxed max-w-2xl">
                Leave requests must be submitted at least 48 hours in advance for processing. 
                Sick leave requires medical documentation for requests exceeding two consecutive days.
              </p>
            </div>
          </div>
        </div>
      )}
      <ApplyLeaveModel open={showModel} onClose={() => setShowModel(false)} onSuccess={fetchLeaveData}/>
    </div>
  )
}

export default Leave