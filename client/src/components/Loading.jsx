
import { Shield } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] selection:bg-slate-100">
      <div className="relative group">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-slate-900/5 blur-xl transition-colors duration-500" />
        
        <div className="relative flex items-center justify-center">
          {/* Main Spinner Ring */}
          <div className="w-20 h-20 rounded-full border-[1.5px] border-slate-100" />
          
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-slate-900 border-r-slate-400/30 animate-[spin_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
          
          {/* Secondary Counter-rotating Ring */}
          <div className="absolute w-14 h-14 rounded-full border-[1px] border-transparent border-b-slate-200 animate-[spin_2s_linear_infinite_reverse]" />
          
          {/* Center Icon */}
          <div className="absolute flex items-center justify-center bg-white rounded-full p-2">
            <Shield size={16} className="text-slate-900 opacity-80" strokeWidth={1.5} />
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