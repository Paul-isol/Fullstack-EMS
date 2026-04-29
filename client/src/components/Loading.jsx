
import { Shield } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] selection:bg-slate-100 backdrop-blur-xl bg-white/30 relative">
      {/* Premium Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="relative group">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-slate-900/5 blur-2xl transition-colors duration-500" />
        
        <div className="relative flex items-center justify-center">
          {/* Main Spinner Ring */}
          <div className="w-24 h-24 rounded-full border-[1px] border-slate-100" />
          
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-slate-900 border-r-slate-400/20 animate-[spin_1.5s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
          
          {/* Secondary Counter-rotating Ring */}
          <div className="absolute w-16 h-16 rounded-full border-[1px] border-transparent border-b-slate-200 animate-[spin_3s_linear_infinite_reverse]" />
          
          {/* Center Icon */}
          <div className="absolute flex items-center justify-center bg-white shadow-sm rounded-full p-3 border border-slate-50">
            <Shield size={18} className="text-slate-900 opacity-90" strokeWidth={1.2} />
          </div>
        </div>
      </div>

      {/* Technical Progress indicator */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <div className="h-px w-6 bg-slate-100" />
          <p className="text-[9px] font-mono text-slate-400 tracking-[0.4em] uppercase animate-pulse">
            Session Encrypting
          </p>
          <div className="h-px w-6 bg-slate-100" />
        </div>
        <p className="text-[10px] font-mono text-slate-200 tracking-[0.1em] uppercase">
          Finalizing System Assets...
        </p>
      </div>
    </div>
  );
};

export default Loading;