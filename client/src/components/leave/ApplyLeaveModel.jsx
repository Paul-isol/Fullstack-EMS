import { X, Calendar, MessageSquare, Tag, Terminal } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios.js";

const ApplyLeaveModel = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     const formData = new FormData(e.target);
     const data = Object.fromEntries(formData.entries());

    // Simulate API call
    try {
      await api.post("/leave",data);
      toast.success("Leave application submitted successfully");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to apply for leave");
    }finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="terminal-card w-full max-w-xl bg-white relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 p-6 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-1 h-4 bg-slate-900" />
            <div>
              <h2 className="text-xl font-light text-slate-900 tracking-tight">Apply for Leave</h2>
              <div className="flex items-center gap-2">
                <span className="label-technical text-[9px]">Module: </span>
                <span className="label-technical text-[9px] text-indigo-600">HR-LOG-TERMINAL</span>
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
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Leave Type */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Tag size={12} className="text-slate-400" />
                TYPE: Classification
              </label>
              <select
                name="type"
                required
                defaultValue="ANNUAL"
                className="w-full"
              >
                <option value="ANNUAL">Annual Leave</option>
                <option value="SICK">Sick Leave</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="MATERNITY">Maternity Leave</option>
                <option value="PATERNITY">Paternity Leave</option>
              </select>
            </div>

            {/* Leave Duration Label (placeholder for grid alignment) */}
            <div className="hidden md:block" />

            {/* Start Date */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Calendar size={12} className="text-slate-400" />
                DATE: Start
              </label>
              <input
                name="startDate"
                type="date"
                required
                min={minDate}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Calendar size={12} className="text-slate-400" />
                DATE: End
              </label>
              <input
                name="endDate"
                type="date"
                required
                min={minDate}
              />
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <label className="label-technical text-slate-900 flex items-center gap-2">
              <MessageSquare size={12} className="text-slate-400" />
              DESC: Justification
            </label>
            <textarea
              name="reason"
              required
              rows="4"
              placeholder="Provide a technical justification for this request..."
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-terminal btn-terminal-primary flex-1 relative overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                  <span className="animate-terminal-pulse">Processing...</span>
                </div>
              ) : (
                <>
                  <Terminal size={14} />
                  Submit Application
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-terminal btn-terminal-secondary md:w-32"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* System Metadata Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 animate-terminal-pulse" />
            <span className="label-technical text-[8px]">System Standby</span>
          </div>
          <span className="label-technical text-[8px] text-slate-400 italic">
            Reference ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveModel;
