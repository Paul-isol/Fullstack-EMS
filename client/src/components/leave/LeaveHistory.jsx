import { useState } from "react"
import {
  Clock,
  Calendar,
  Loader2,
  Check,
  X,
  FileText,
  User,
} from "lucide-react";
import { format } from "date-fns";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null)

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id)
    // Simulate API call
    setTimeout(() => {
      setProcessing(null)
      onUpdate()
    }, 1000)
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPROVED": return "badge-emerald";
      case "REJECTED": return "badge-slate"; // Or badge-danger if we add it
      case "PENDING": return "badge-amber";
      default: return "badge-slate";
    }
  }

  return (
    <div className="terminal-card overflow-hidden">
      <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-3 bg-slate-900" />
          <span className="label-technical text-slate-900">System Logs: Leave</span>
        </div>
        <span className="label-technical text-[9px]">{leaves.length} Applications Registered</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30 border-b border-slate-100">
              {isAdmin && <th className="px-8 py-5 label-technical">Employee</th>}
              <th className="px-8 py-5 label-technical">Classification</th>
              <th className="px-8 py-5 label-technical text-center">Period</th>
              <th className="px-8 py-5 label-technical">Reasoning</th>
              <th className="px-8 py-5 label-technical text-center">Status</th>
              {isAdmin && <th className="px-8 py-5 label-technical text-right">Terminal Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-300 space-y-4">
                    <Calendar size={40} strokeWidth={1} />
                    <p className="label-technical tracking-[0.3em]">No terminal logs detected</p>
                  </div>
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="group hover:bg-slate-50/30 transition-colors duration-200"
                >
                  {isAdmin && (
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                          <User size={14} />
                        </div>
                        <span className="text-[13px] font-medium text-slate-900 tracking-tight">
                          {leave.employee?.firstName} {leave.employee?.lastName}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="px-8 py-6">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 px-3 py-1 border border-slate-100 uppercase tracking-wider">
                      {leave.type}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex flex-col items-center gap-1 text-[11px] font-mono text-slate-600 bg-slate-50 px-4 py-2 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock size={10} className="text-slate-400" />
                        <span>{format(new Date(leave.startDate), "MMM dd")} - {format(new Date(leave.endDate), "MMM dd")}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 opacity-70">
                        {Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1} DAYS
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-start gap-2 max-w-xs">
                      <FileText size={12} className="text-slate-300 mt-0.5 flex-shrink-0" />
                      <span className="text-[12px] text-slate-600 font-light line-clamp-2 italic">
                        "{leave.reason}"
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`terminal-badge ${getStatusStyle(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-8 py-6 text-right">
                      {leave.status === "PENDING" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            disabled={processing === (leave.id || leave._id)}
                            onClick={() => handleStatusUpdate(leave.id || leave._id, "APPROVED")}
                            className="p-2 border border-slate-200 text-emerald-600 hover:border-emerald-600 hover:bg-emerald-50 transition-all active:scale-90"
                          >
                            {processing === (leave.id || leave._id) ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                          </button>
                          <button 
                            disabled={processing === (leave.id || leave._id)}
                            onClick={() => handleStatusUpdate(leave.id || leave._id, "REJECTED")}
                            className="p-2 border border-slate-200 text-amber-600 hover:border-amber-600 hover:bg-amber-50 transition-all active:scale-90"
                          >
                            {processing === (leave.id || leave._id) ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
                          </button>
                        </div>
                      ) : (
                        <span className="label-technical text-[8px] text-slate-300">Action Resolved</span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveHistory