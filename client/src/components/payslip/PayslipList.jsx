import { format } from "date-fns";
import { FileText, Download, User, DollarSign, Calendar } from "lucide-react";

const PayslipList = ({ payslips, isAdmin }) => {
  return (
    <div className="terminal-card overflow-hidden animate-fade-in">
      <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-3 bg-slate-900" />
          <span className="label-technical text-slate-900">Archived Payroll Records</span>
        </div>
        <span className="label-technical text-[9px]">{payslips.length} Statements Found</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30 border-b border-slate-100">
              {isAdmin && (
                <th className="px-8 py-5 label-technical">
                  <div className="flex items-center gap-2">
                    <User size={10} /> Employee
                  </div>
                </th>
              )}
              <th className="px-8 py-5 label-technical">
                <div className="flex items-center gap-2">
                  <Calendar size={10} /> Period
                </div>
              </th>
              <th className="px-8 py-5 label-technical text-center">
                <div className="flex items-center justify-center gap-2">
                  <DollarSign size={10} /> Gross (Base)
                </div>
              </th>
              <th className="px-8 py-5 label-technical text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <DollarSign size={10} /> Net Payable
                </div>
              </th>
              <th className="px-8 py-5 label-technical text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payslips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-300 space-y-4">
                    <FileText size={40} strokeWidth={1} />
                    <p className="label-technical tracking-[0.3em]">No terminal logs detected</p>
                  </div>
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => (
                <tr
                  key={payslip._id}
                  className="group hover:bg-slate-50/30 transition-colors duration-200"
                >
                  {isAdmin && (
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">
                          <User size={14} />
                        </div>
                        <div>
                          <span className="block text-[13px] font-medium text-slate-900 tracking-tight">
                            {payslip.employee?.firstName} {payslip.employee?.lastName}
                          </span>
                          <span className="label-technical text-[8px] text-slate-400 uppercase">
                            ID: {payslip.employee?._id?.substring(0, 8)}
                          </span>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-8 py-6">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 px-3 py-1 border border-slate-100 uppercase tracking-wider">
                      {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-[13px] font-mono text-slate-600">
                      ${payslip.basicSalary?.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-[13px] font-mono text-slate-900 font-semibold bg-emerald-50 px-3 py-1 border border-emerald-100/50">
                      ${payslip.netSalary?.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => window.open(`/print/payslip/${payslip.id || payslip._id}`)}
                      className="btn-terminal btn-terminal-secondary py-1.5 px-4 h-auto inline-flex group/btn"
                    >
                      <Download size={12} className="group-hover/btn:translate-y-0.5 transition-transform" />
                      <span className="text-[9px]">Download</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-50/30 p-4 px-8 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 animate-terminal-pulse" />
          <span className="label-technical text-[8px]">Payroll Server Synchronized</span>
        </div>
        <span className="label-technical text-[8px] text-slate-400">
          Last Updated: {format(new Date(), "HH:mm:ss")}
        </span>
      </div>
    </div>
  );
};

export default PayslipList;