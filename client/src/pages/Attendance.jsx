import { useCallback, useEffect, useState } from "react"
import { dummyAttendanceData } from "../assets/assets"
import Loading from "../components/Loading"
import { ArrowUpRight, FileText, Settings2, ShieldCheck } from "lucide-react"
import CheckinButton from "../components/attendance/CheckinButton"
import AttendanceStats from "../components/attendance/AttendanceStats"
import AttendanceHistory from "../components/attendance/AttendanceHistory"

const Attendance = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    // Simulate API delay
    setLoading(true)
    setTimeout(() => {
      setHistory(dummyAttendanceData)
      setLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const today = new Date()
  today.setHours(0,0,0,0)
  const todayRecord = history.find(r => {
    const recordDate = new Date(r.date)
    recordDate.setHours(0,0,0,0)
    return recordDate.getTime() === today.getTime()
  })

  if (loading) return <Loading />

  return (
    <div className="space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative">
        <div className="w-10 h-px bg-slate-200 mb-6" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-light text-slate-900 tracking-tight mb-3">
              Attendance Terminal
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span className="label-technical text-slate-900">Secured Session</span>
              </div>
              <div className="w-1 h-1 rounded-none bg-slate-200" />
              <span className="label-technical">ID: EMS-TERM-0428</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2">
            <div className="w-2 h-2 bg-emerald-500 animate-terminal-pulse" />
            <span className="label-technical text-slate-600 text-[9px]">Server Sync Active</span>
          </div>
        </div>
      </div>

      {/* Main Action Terminal */}
      <div className="animate-fade-in [animation-delay:100ms]">
        {isDeleted ? (
          <div className="p-6 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono tracking-widest uppercase flex items-center gap-4">
            <span className="w-2 h-2 bg-amber-500 animate-pulse" />
            Terminal Access Revoked: Employee record marked for deletion.
          </div>
        ) : (
          <CheckinButton todayRecord={todayRecord} onAction={fetchData} />
        )}
      </div>

      {/* Statistics Bento Grid */}
      <div className="space-y-4 animate-fade-in [animation-delay:200ms]">
        <div className="flex items-center gap-3">
          <div className="w-1 h-3 bg-slate-900" />
          <span className="label-technical text-slate-900">System Metrics</span>
        </div>
        <AttendanceStats history={history} />
      </div>

      {/* Attendance Log Table */}
      <div className="space-y-4 animate-fade-in [animation-delay:300ms]">
        <AttendanceHistory history={history} />
      </div>

      {/* Quick Actions Console */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in [animation-delay:400ms]">
        <div className="terminal-card terminal-card-hover p-8 group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-slate-900 transition-colors">
              <FileText size={20} />
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
          <h3 className="label-technical text-slate-900 mb-2">Export Summary</h3>
          <p className="text-[13px] text-slate-500 font-light mb-8 leading-relaxed">
            Generate and download your attendance analytics for the current pay period in PDF format.
          </p>
          <button className="label-technical text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2">
            Initialize Download <span className="text-[14px]">_</span>
          </button>
        </div>

        <div className="terminal-card terminal-card-hover p-8 group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-slate-900 transition-colors">
              <Settings2 size={20} />
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
          <h3 className="label-technical text-slate-900 mb-2">Request Adjustment</h3>
          <p className="text-[13px] text-slate-500 font-light mb-8 leading-relaxed">
            Submit a correction request if you identify any discrepancies in your recorded terminal logs.
          </p>
          <button className="label-technical text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2">
            Open Support Ticket <span className="text-[14px]">_</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Attendance
