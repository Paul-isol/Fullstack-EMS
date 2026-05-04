import { ChevronDown } from "lucide-react";
import { DEPARTMENTS } from "../assets/assets";
import { useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Gather form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Saving employee record:", data);
    if (isEditMode) {
      if (!data.password) {
        delete data.password;
      }
    }

    try {
      const url = isEditMode ? `/employees/${initialData.id}` : "/employees";
      const method = isEditMode ? "put" : "post";
      await api[method](url, data);
      toast.success(isEditMode ? "Employee updated" : "Employee created");
      onSuccess();
    } catch (error) {
      toast.error(error.response.data.error || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className={`space-y-12 transition-opacity duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      onSubmit={handleSubmit}
    >
      {/* Section 1: Personnel Details */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-4 bg-slate-900" />
          <h2 className="text-[11px] font-mono text-slate-900 tracking-[0.3em] uppercase font-bold">
            Personnel Details
          </h2>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              required
              defaultValue={initialData?.firstName || ""}
              placeholder="e.g. David"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              required
              defaultValue={initialData?.lastName || ""}
              placeholder="e.g. Michael"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Contact Line
            </label>
            <input
              name="phone"
              type="text"
              required
              defaultValue={initialData?.phone || ""}
              placeholder="+1 (000) 000-0000"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Hire Date
            </label>
            <input
              name="joinDate"
              type="date"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Personnel Bio
            </label>
            <textarea
              name="bio"
              rows="3"
              defaultValue={initialData?.bio || ""}
              placeholder="Brief record description..."
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Employment Details */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-4 bg-slate-900" />
          <h2 className="text-[11px] font-mono text-slate-900 tracking-[0.3em] uppercase font-bold">
            Employment Details
          </h2>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Department Unit
            </label>
            <div className="relative">
              <select
                name="department"
                required
                defaultValue={initialData?.department || ""}
                className="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none cursor-pointer"
              >
                <option value="">Select Unit</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Designation
            </label>
            <input
              name="position"
              type="text"
              required
              defaultValue={initialData?.position || ""}
              placeholder="System Architect"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Basic Salary
            </label>
            <input
              name="basicSalary"
              type="number"
              required
              defaultValue={initialData?.basicSalary || ""}
              placeholder="0.00"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Allowances
            </label>
            <input
              name="allowances"
              type="number"
              required
              defaultValue={initialData?.allowances || ""}
              placeholder="0.00"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Deductions
            </label>
            <input
              name="deductions"
              type="number"
              required
              defaultValue={initialData?.deductions || ""}
              placeholder="0.00"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Deployment Status
            </label>
            <div className="relative">
              <select
                name="employmentStatus"
                required
                defaultValue={initialData?.employmentStatus || "ACTIVE"}
                className="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none cursor-pointer"
              >
                <option value="ACTIVE">ACTIVE_SERVICE</option>
                <option value="INACTIVE">OFFLINE</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Account Setup */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-4 bg-slate-900" />
          <h2 className="text-[11px] font-mono text-slate-900 tracking-[0.3em] uppercase font-bold">
            Account Setup
          </h2>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Work Email
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue={initialData?.email || ""}
              placeholder="work@terminal.ems"
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Access Password
            </label>
            <input
              name="password"
              type="password"
              required={!isEditMode}
              placeholder={
                isEditMode
                  ? "•••••••• (Keep empty to preserve)"
                  : "Initialize password..."
              }
              className="w-full bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none placeholder:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
              Security Role
            </label>
            <div className="relative">
              <select
                name="role"
                required
                defaultValue={initialData?.userId?.role || "EMPLOYEE"}
                className="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-3 text-[13px] outline-none focus:border-slate-900 focus:bg-white transition-all rounded-none cursor-pointer"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-8 border-t border-slate-50 flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-8 py-3 text-[10px] font-mono tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50"
        >
          Abort
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 bg-slate-900 text-white text-[10px] font-mono tracking-widest uppercase hover:bg-black transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : isEditMode
              ? "Commit Changes"
              : "Finalize Entry"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
