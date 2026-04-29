import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import { format } from "date-fns";
import { ShieldCheck, Printer, User, Mail, Briefcase, Calendar, Terminal, DollarSign, FileText } from "lucide-react";

const PrintPaySlip = () => {
  const { id } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    const found = dummyPayslipData.find((slip) => slip._id === id);
    setPayslip(found);
    setTimeout(() => setLoading(false), 600);
  }, [id]);

  if (loading) return <Loading />;

  if (!payslip)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="terminal-card p-12 bg-white border-amber-200 text-center space-y-4">
          <ShieldCheck size={48} className="text-amber-500 mx-auto" />
          <h2 className="label-technical text-amber-700 text-xl tracking-[0.2em]">RECORD_NOT_FOUND</h2>
          <p className="text-slate-400 font-light max-w-xs">The requested payroll statement could not be retrieved from the terminal logs.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto space-y-10 animate-fade-in print:space-y-6">
        
        {/* Print Action Bar */}
        <div className="flex justify-between items-center print:hidden">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-emerald-500 animate-terminal-pulse" />
             <span className="label-technical text-[10px] text-slate-600 uppercase tracking-widest">System Record: Verified</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="btn-terminal btn-terminal-primary px-8 group"
          >
            <Printer size={16} className="group-hover:scale-110 transition-transform" />
            Initialize Print Sequence
          </button>
        </div>

        {/* Main Document Terminal */}
        <div className="terminal-card bg-white p-10 md:p-16 border-slate-200 shadow-xl print:shadow-none print:border-slate-300 print:p-0">
          
          {/* Statement Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 border-b border-slate-50 pb-12 print:mb-10 print:pb-8">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-slate-900 mb-6" />
              <h1 className="text-4xl font-light text-slate-900 tracking-tighter uppercase print:text-3xl">
                Official Payroll <span className="font-bold">Statement</span>
              </h1>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="label-technical text-slate-900 text-[11px] font-bold">
                      PERIOD: {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy").toUpperCase()}
                    </span>
                 </div>
                 <div className="w-1 h-1 bg-slate-200" />
                 <span className="label-technical text-slate-400 text-[11px]">ID: {payslip._id?.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="text-right hidden md:block print:block">
              <div className="flex flex-col items-end gap-1">
                 <div className="p-3 border border-slate-900 text-slate-900 mb-2">
                   <Terminal size={24} strokeWidth={1.5} />
                 </div>
                 <span className="label-technical text-[10px] text-slate-900 font-bold tracking-[0.3em]">SECURED TERMINAL</span>
                 <span className="label-technical text-[8px] text-slate-400">EMS CORE SYSTEM v2.0</span>
              </div>
            </div>
          </div>

          {/* Identity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 mb-20 print:mb-12 print:gap-y-6">
            <div className="space-y-4">
              <h3 className="label-technical text-slate-400 border-b border-slate-50 pb-2 flex items-center gap-2">
                <User size={12} /> SUBJECT_IDENTIFICATION
              </h3>
              <div className="space-y-1">
                <p className="text-2xl font-light text-slate-900 tracking-tight">
                  {payslip.employee?.firstName} {payslip.employee?.lastName}
                </p>
                <p className="label-technical text-slate-500 text-[11px] uppercase tracking-wider">
                  ID: {payslip.employee?._id?.substring(0, 12).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="label-technical text-slate-400 border-b border-slate-50 pb-2 flex items-center gap-2">
                <Briefcase size={12} /> TECHNICAL_POSITION
              </h3>
              <div className="space-y-1">
                <p className="text-lg font-light text-slate-900 uppercase tracking-wide">
                  {payslip.employee?.position}
                </p>
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={12} />
                  <span className="text-[12px] font-mono tracking-tighter">{payslip.employee?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Breakdown Terminal */}
          <div className="space-y-4 mb-20 print:mb-12">
            <h3 className="label-technical text-slate-900 flex items-center gap-2">
              <DollarSign size={14} /> TRANSACTION_BREAKDOWN
            </h3>
            
            <div className="border border-slate-100 print:border-slate-300">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 print:bg-slate-100 print:border-slate-300">
                    <th className="px-8 py-5 label-technical text-slate-900">DESCRIPTION_ENTRY</th>
                    <th className="px-8 py-5 label-technical text-slate-900 text-right">VALUE_METRIC (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 print:divide-slate-200">
                  <tr className="group">
                    <td className="px-8 py-5 text-[14px] text-slate-600 font-light uppercase tracking-wide">Base Compensation</td>
                    <td className="px-8 py-5 text-[14px] font-mono text-slate-900 text-right">
                      ${payslip.basicSalary?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="group">
                    <td className="px-8 py-5 text-[14px] text-slate-600 font-light uppercase tracking-wide">System Allowances</td>
                    <td className="px-8 py-5 text-[14px] font-mono text-emerald-600 text-right">
                      +${payslip.allowances?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="group">
                    <td className="px-8 py-5 text-[14px] text-slate-600 font-light uppercase tracking-wide">Mandatory Deductions</td>
                    <td className="px-8 py-5 text-[14px] font-mono text-amber-600 text-right">
                      -${payslip.deductions?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="bg-slate-900 text-white print:bg-slate-900">
                    <td className="px-8 py-6 label-technical text-white text-[13px] font-bold">TOTAL_NET_DISBURSEMENT</td>
                    <td className="px-8 py-6 text-2xl font-light text-right tracking-tighter font-mono italic">
                      ${payslip.netSalary?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Authenticity Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pt-12 border-t border-slate-50 print:pt-8">
             <div className="space-y-4">
                <h4 className="label-technical text-slate-400 text-[10px]">VERIFICATION_SIGNATURE</h4>
                <div className="border-b border-slate-900 w-64 h-12 flex items-end pb-2">
                   <p className="text-xl font-serif italic text-slate-400 opacity-40">System Controller</p>
                </div>
                <p className="label-technical text-[9px] text-slate-400 uppercase italic">Digitally verified via EMS-CORE</p>
             </div>
             
             <div className="text-right space-y-2">
                <div className="flex items-center justify-end gap-2 text-slate-900">
                   <ShieldCheck size={14} className="text-emerald-600" />
                   <span className="label-technical text-[10px] font-bold tracking-widest uppercase">Authentic Record</span>
                </div>
                <div className="space-y-1">
                   <p className="label-technical text-[9px] text-slate-400 italic lowercase">
                     Generated on: {format(new Date(), "yyyy-MM-dd HH:mm:ss")}
                   </p>
                   <p className="label-technical text-[9px] text-slate-400 italic lowercase">
                     Server Node: US-EAST-02 / LOG_ID: {payslip._id?.substring(0, 8)}
                   </p>
                </div>
             </div>
          </div>

          {/* Watermark for Screen View */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none print:hidden">
             <FileText size={500} />
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="text-center pb-10 print:pb-0">
           <p className="text-[10px] text-slate-400 font-light uppercase tracking-[0.3em]">
             End of Statement • Confidentially Protected
           </p>
        </div>
      </div>
    </div>
  );
};

export default PrintPaySlip;
