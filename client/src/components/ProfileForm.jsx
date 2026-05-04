import { User, Mail, Briefcase, FileText, Save, ShieldAlert, Camera } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";
const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    position: initialData?.position || "",
    bio: initialData?.bio || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await api.post("/profile",formData)
      setMessage("Profile Updated Successfully")
      onSuccess();
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="terminal-card bg-white p-8 animate-fade-in overflow-hidden relative">
      {/* Decorative background accent */}
      <User size={200} className="absolute -right-20 -top-20 text-slate-50 pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-1 h-4 bg-slate-900" />
          <h2 className="text-xl font-light text-slate-900 tracking-tight flex items-center gap-3">
            <User size={18} className="text-slate-400" /> 
            Public Identity Profile
          </h2>
        </div>

        {/* Feedback Consoles */}
        {(error || message) && (
          <div className="space-y-3">
            {error && (
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono tracking-widest uppercase flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
                Error: {error}
              </div>
            )}
            {message && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono tracking-widest uppercase flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 animate-terminal-pulse" />
                {message}
              </div>
            )}
          </div>
        )}

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Avatar Section */}
          <div className="col-span-1 md:col-span-2 flex items-center gap-6 pb-4 border-b border-slate-50">
            <div className="relative group">
              <div className="w-20 h-20 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900 transition-all cursor-pointer overflow-hidden">
                {initialData?.image ? (
                  <img src={initialData.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} />
                )}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera size={18} className="text-white" />
                </div>
              </div>
            </div>
            <div>
              <span className="label-technical block mb-1">IMAGE: IDENTITY_VISUAL</span>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide uppercase">
                JPG, PNG. Max size 2MB
              </p>
            </div>
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <label className="label-technical text-slate-900 flex items-center gap-2">
              <User size={12} className="text-slate-400" />
              NAME: INITIAL
            </label>
            <input
              required
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="label-technical text-slate-900 flex items-center gap-2">
              <User size={12} className="text-slate-400" />
              NAME: SURNAME
            </label>
            <input
              required
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="label-technical text-slate-900 flex items-center gap-2">
              <Mail size={12} className="text-slate-400" />
              CONTACT: PRIMARY_EMAIL
            </label>
            <input
              required
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Position */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="label-technical text-slate-900 flex items-center gap-2">
              <Briefcase size={12} className="text-slate-400" />
              TECHNICAL: ASSIGNED_POSITION
            </label>
            <input
              required
              type="text"
              placeholder="Senior Software Architect"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>

          {/* Bio */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="label-technical text-slate-900 flex items-center gap-2">
              <FileText size={12} className="text-slate-400" />
              DESC: SYSTEM_BIOGRAPHY
            </label>
            <textarea
              rows="4"
              className="resize-none"
              placeholder="Provide a brief technical biography..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>
        </div>

        {/* Action Console */}
        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
          {initialData?.isDeleted ? (
            <div className="flex items-center gap-3 text-amber-600">
              <ShieldAlert size={18} />
              <span className="label-technical font-medium">TERMINAL_LOCKED: Account Deactivated</span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button
                type="submit"
                disabled={loading}
                className="btn-terminal btn-terminal-primary md:w-64"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                    <span className="animate-terminal-pulse uppercase text-[10px] tracking-[0.2em]">Synchronizing...</span>
                  </div>
                ) : (
                  <>
                    <Save size={14} />
                    Commit Profile Changes
                  </>
                )}
              </button>
            </div>
          )}
          
          <div className="hidden md:flex items-center gap-4 text-slate-300">
             <div className="w-1 h-1 bg-slate-200" />
             <span className="label-technical text-[8px]">EMS-SEC-LAYER v2.0</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
