import { LogIn, LogOut, Clock, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const CheckinButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAttendance = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAction();
    }, 1200); // Slightly longer for "Terminal Processing" feel
  };

  const isCheckedIn = !!todayRecord?.isCheckedIn;
  const isCompleted = !!todayRecord?.checkOut;

  if (isCompleted) {
    return (
      <div className="terminal-card p-12 flex flex-col items-center justify-center text-center space-y-6 bg-slate-900 text-white">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-terminal-pulse">
          <Terminal size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-light tracking-tight">Work Day Completed</h3>
          <p className="label-technical text-slate-400">System logged out successfully</p>
        </div>
        <div className="font-mono text-[10px] text-slate-500 tracking-[0.3em] uppercase pt-4 border-t border-white/5 w-full max-w-xs">
          See you tomorrow
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="space-y-6 text-center md:text-left">
        <div className="space-y-1">
          <span className="label-technical">System Time</span>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Clock size={20} className="text-slate-300" />
            <span className="text-4xl font-light text-slate-900 tracking-tighter font-mono">
              {format(currentTime, "HH:mm:ss")}
            </span>
          </div>
          <span className="label-technical text-[9px] text-indigo-600 block pt-1">
            {format(currentTime, "EEEE, MMMM do yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-4 justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-none ${isCheckedIn ? 'bg-emerald-500 animate-terminal-pulse' : 'bg-slate-200'}`} />
            <span className="label-technical text-[9px]">
              {isCheckedIn ? 'Active Session' : 'Standby Mode'}
            </span>
          </div>
          <div className="w-px h-3 bg-slate-100" />
          <div className="label-technical text-[9px]">
            Server: <span className="text-slate-900">EMS-PRIMARY</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`relative group h-32 w-full md:w-80 terminal-card flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
          isCheckedIn 
            ? 'hover:bg-amber-50 hover:border-amber-500 text-amber-600' 
            : 'hover:bg-indigo-50 hover:border-indigo-500 text-indigo-600'
        } ${loading ? 'opacity-80' : ''}`}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-900 animate-spin" />
            <span className="label-technical text-slate-900 animate-terminal-pulse">Processing...</span>
          </div>
        ) : (
          <>
            <div className={`p-4 ${isCheckedIn ? 'bg-amber-100/50' : 'bg-indigo-100/50'} group-hover:scale-110 transition-transform`}>
              {isCheckedIn ? <LogOut size={24} /> : <LogIn size={24} />}
            </div>
            <div className="text-center">
              <span className="block text-sm font-medium text-slate-900 uppercase tracking-widest">
                {isCheckedIn ? 'Clock Out' : 'Clock In'}
              </span>
              <span className="label-technical text-[8px]">
                {isCheckedIn ? 'Terminate active shift' : 'Initiate work session'}
              </span>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default CheckinButton;