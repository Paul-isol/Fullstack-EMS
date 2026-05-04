import { X, Lock, Key, ShieldCheck, ShieldAlert, Terminal } from "lucide-react";
import { useState } from "react";
import api from "../api/axios"

const ChangePasswordModel = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validate
    if (passwords.newPassword !== passwords.confirmPassword) {
      setTimeout(() => {
        setLoading(false);
        setMessage({ type: "error", text: "Security mismatch: New credentials do not align." });
      }, 500);
      return;
    }

    const currentPassword = passwords.oldPassword;
    const newPassword = passwords.newPassword;
    
    try {
      const {data} = await api.post("/auth/change-password",{currentPassword, newPassword});
      // handle error and response
      if(!data.success){
        setMessage({type: "error", text:data.message || "Unknown error occurred"})
      }else{
        setMessage({type: "success", text:data.message || "Password changed successfully"})
        setPasswords({oldPassword: "", newPassword: "", confirmPassword: ""})
        onClose();
      }
    } catch(err){
      setMessage({type: "error", text:err.response?.data?.message || "Unknown error occurred"})
    } finally{
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
        className="terminal-card w-full max-w-md bg-white relative shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-100 p-6 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-1 h-4 bg-slate-900" />
            <div>
              <h2 className="text-xl font-light text-slate-900 tracking-tight">Credential Rotation Terminal</h2>
              <div className="flex items-center gap-2">
                <span className="label-technical text-[9px]">Security Port: </span>
                <span className="label-technical text-[9px] text-emerald-600 font-bold tracking-widest">ENCRYPTED_PORT_04</span>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto flex-1">
          {/* Security Message Console */}
          {message.text && (
            <div className={`p-4 border ${
              message.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                : "bg-amber-50 border-amber-200 text-amber-700"
            } text-[11px] font-mono tracking-widest uppercase flex items-center gap-3 animate-fade-in`}>
              <span className={`w-1.5 h-1.5 ${message.type === "success" ? "bg-emerald-500" : "bg-amber-500"} animate-terminal-pulse`} />
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {/* Old Password */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Lock size={12} className="text-slate-400" />
                CURRENT_PASSWORD
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <Key size={12} className="text-slate-400" />
                NEW_PASSWORD
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="label-technical text-slate-900 flex items-center gap-2">
                <ShieldCheck size={12} className="text-slate-400" />
                CONFIRM_NEW_PASSWORD
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-terminal btn-terminal-primary h-14"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                  <span className="animate-terminal-pulse uppercase text-[10px] tracking-[0.2em]">Verifying Security Keys...</span>
                </div>
              ) : (
                <>
                  <Terminal size={16} />
                  Authorize Rotation
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-terminal btn-terminal-secondary h-14"
            >
              Abort Transaction
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
             <ShieldAlert size={10} />
             <span className="label-technical text-[8px]">ENCRYPTION_LEVEL: AES-256</span>
          </div>
          <span className="label-technical text-[8px] text-slate-300">
            SYSTEM_TIME: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModel;
