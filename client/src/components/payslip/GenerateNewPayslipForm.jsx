import { X, User, DollarSign, Calendar, Terminal, ShieldCheck, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";


const GenerateNewPayslipForm = ({ open, onClose, onSuccess, employees }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    basicSalary: "",
    allowances: "",
    deductions: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const netSalary = useMemo(() => {
    const basic = parseFloat(formData.basicSalary) || 0;
    const allow = parseFloat(formData.allowances) || 0;
    const deduct = parseFloat(formData.deductions) || 0;
    return (basic + allow - deduct).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [formData.basicSalary, formData.allowances, formData.deductions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/payslips", formData);
      toast.success("Payslip generated successfully");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      toast.error(err.response.data.error || "Failed to generate payslip");
    } finally {
      setLoading(false);
    }
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess?.();
      onClose?.();
    }, 1500);
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="terminal-card w-full max-w-2xl bg-white relative shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 p-6 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-1 h-4 bg-slate-900" />
            <div>
              <h2 className="text-xl font-light text-slate-900 tracking-tight">Initialize Payroll Transaction</h2>
              <div className="flex items-center gap-2">
                <span className="label-technical text-[9px]">Status: </span>
                <span className="label-technical text-[9px] text-emerald-600">SECURED_INPUT_MODE</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Employee Selection */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <User size={12} className="text-slate-400" />
                SUBJECT: TARGET_EMPLOYEE
              </label>
              <select
                required
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              >
                <option value="">Select Employee Terminal ID</option>
                {employees?.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.firstName} {emp.lastName} [{emp._id?.substring(0, 8).toUpperCase()}]
                  </option>
                ))}
              </select>
            </div>

            {/* Fiscal Period: Month */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Calendar size={12} className="text-slate-400" />
                LOG: PERIOD_MONTH
              </label>
              <select
                required
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
              >
                {months.map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>

            {/* Fiscal Period: Year */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Calendar size={12} className="text-slate-400" />
                LOG: PERIOD_YEAR
              </label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              />
            </div>

            {/* Financials: Basic Salary */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <DollarSign size={12} className="text-slate-400" />
                VALUE: BASE_COMPENSATION
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                value={formData.basicSalary}
                onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
              />
            </div>

            {/* Financials: Allowances */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Plus size={12} className="text-emerald-500" />
                VALUE: TOTAL_ALLOWANCES
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                value={formData.allowances}
                onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
              />
            </div>

            {/* Financials: Deductions */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Terminal size={12} className="text-amber-500" />
                VALUE: TOTAL_DEDUCTIONS
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                value={formData.deductions}
                onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-terminal btn-terminal-primary flex-1 relative overflow-hidden h-14"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin" />
                  <span className="animate-terminal-pulse tracking-widest uppercase text-[10px]">Authorizing Transaction...</span>
                </div>
              ) : (
                <>
                  <Terminal size={16} />
                  Authorize & Generate Statement
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-terminal btn-terminal-secondary md:w-40 h-14"
            >
              Abort Transaction
            </button>
          </div>
        </form>

        {/* System Metadata Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-500 animate-terminal-pulse" />
            <span className="label-technical text-[8px]">Payroll Logic Unit: ACTIVE</span>
          </div>
          <span className="label-technical text-[8px] text-slate-400 italic">
            SEC_VER: v2.04.88
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenerateNewPayslipForm;