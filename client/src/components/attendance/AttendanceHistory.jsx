import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { Clock, CheckCircle2, XCircle, Calendar, ArrowDownRight } from "lucide-react";
import { format } from "date-fns";

const AttendanceHistory = ({ history }) => {
  return (
    <div className="terminal-card overflow-hidden">
      <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-3 bg-slate-900" />
          <span className="label-technical text-slate-900">Attendance Logs</span>
        </div>
        <span className="label-technical text-[9px]">{history.length} Records Found</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30 border-b border-slate-100">
              <th className="px-8 py-5 label-technical">Date</th>
              <th className="px-8 py-5 label-technical text-center">Session Start</th>
              <th className="px-8 py-5 label-technical text-center">Session End</th>
              <th className="px-8 py-5 label-technical text-center">Duration</th>
              <th className="px-8 py-5 label-technical">Classification</th>
              <th className="px-8 py-5 label-technical text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-300 space-y-4">
                    <Calendar size={40} strokeWidth={1} />
                    <p className="label-technical tracking-[0.3em]">No terminal logs detected</p>
                  </div>
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);
                return (
                  <tr
                    key={record._id}
                    className="group hover:bg-slate-50/30 transition-colors duration-200"
                  >
                    <td className="px-8 py-6">
                      <span className="text-[13px] font-medium text-slate-900 tracking-tight">
                        {format(new Date(record.date), "dd MMM, yyyy")}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 px-3 py-1 border border-slate-100">
                        <ArrowDownRight size={10} className="text-emerald-500" />
                        {record.checkIn ? format(new Date(record.checkIn), "HH:mm:ss") : "--:--:--"}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 px-3 py-1 border border-slate-100">
                        <Clock size={10} className="text-amber-500" />
                        {record.checkOut ? format(new Date(record.checkOut), "HH:mm:ss") : "ACTIVE"}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-[11px] font-mono text-slate-900 font-medium">
                        {getWorkingHoursDisplay(record)}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`terminal-badge ${dayType.className}`}>
                        {dayType.label}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {record.status === "PRESENT" || record.status === "LATE" ? (
                          <div className="flex items-center gap-2 text-emerald-600">
                            <span className="label-technical text-[9px] font-medium">Verified</span>
                            <CheckCircle2 size={14} strokeWidth={1.5} />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-amber-500">
                            <span className="label-technical text-[9px] font-medium">Absent</span>
                            <XCircle size={14} strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;