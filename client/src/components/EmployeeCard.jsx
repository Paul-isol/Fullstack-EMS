import { MoreVertical, Mail, Phone } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
const EmployeeCard = ({ emp, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/employees/${emp._id}`);
        toast.success("Employee deleted");
        onDelete(emp._id);
      } catch (error) {
        toast.error(error.response.data.error || "Failed to delete employee");
      }
    }
  };
  return (
    <div
      key={emp._id}
      className="group relative bg-white border border-slate-200 rounded-none overflow-hidden transition-all duration-300 hover:border-slate-900 hover:shadow-[10px_10px_40px_-15px_rgba(0,0,0,0.05)]"
    >
      {/* Status Indicator */}
      <div
        className={`absolute top-0 right-0 w-12 h-1 ${emp.employmentStatus === "ACTIVE" ? "bg-emerald-500" : "bg-slate-200"}`}
      />

      {emp.isDeleted && (
        <div className="absolute top-0 right-0 px-2 py-1 bg-rose-50 text-rose-600 text-[8px] font-mono tracking-[0.2em] uppercase border-l border-b border-rose-100 z-10">
          Deleted
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-400 font-light text-lg border border-slate-100 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
            {emp.firstName[0]}
            {emp.lastName[0]}
          </div>
          <button className="p-1.5 text-slate-300 hover:text-slate-900 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>

        <div className="space-y-1 mb-6">
          <h3 className="text-base font-medium text-slate-900 truncate">
            {emp.firstName} {emp.lastName}
          </h3>
          <p className="text-[11px] text-slate-500 font-light truncate">
            {emp.position}
          </p>
          <div className="pt-1.5">
            <span className="text-[8px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 tracking-wider uppercase border border-slate-100 group-hover:border-slate-200 transition-colors">
              {emp.department}
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-3 text-slate-400">
            <Mail size={12} strokeWidth={1.5} />
            <span className="text-[10px] truncate">{emp.email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <Phone size={12} strokeWidth={1.5} />
            <span className="text-[10px]">{emp.phone}</span>
          </div>
        </div>
      </div>
      <div className="flex opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out border-t border-slate-100">
        <button
          className="w-full py-3 bg-slate-50 text-slate-400 text-[9px] font-mono tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all duration-300"
          onClick={() => onEdit(emp)}
        >
          Edit
        </button>
        <button
          className="w-full py-3 bg-slate-50 text-slate-400 text-[9px] font-mono tracking-widest uppercase border-l border-slate-100 hover:bg-red-900 hover:text-white transition-all duration-300"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
