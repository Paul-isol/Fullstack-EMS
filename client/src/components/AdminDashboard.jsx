import { Building2Icon, Calendar1Icon, FileTextIcon, UsersIcon, ArrowUpRight, Settings, LayoutGrid, CreditCard } from "lucide-react"

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UsersIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active Workforce",
      color: "text-blue-600",
      bg: "bg-blue-50/50",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      description: "Organization Units",
      color: "text-indigo-600",
      bg: "bg-indigo-50/50",
    },
    {
      icon: Calendar1Icon,
      value: data.totalAttendance,
      label: "Today's Attendance",
      description: "Checked in today",
      color: "text-emerald-600",
      bg: "bg-emerald-50/50",
    },
    {
      icon: FileTextIcon,
      value: data.totalPendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting Approval",
      color: "text-amber-600",
      bg: "bg-amber-50/50",
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div>
        <div className="w-10 h-px bg-slate-200 mb-6" />
        <h1 className="text-3xl font-light text-slate-900 tracking-tight mb-3">
          Terminal Overview
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase">
            Admin Control Center
          </span>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <span className="text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase text-emerald-600">
            System Online
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group p-8 bg-white border border-slate-200 rounded-none transition-all duration-300 hover:border-slate-900 hover:shadow-[10px_10px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-none ${stat.bg} transition-colors duration-300 group-hover:bg-slate-900`}>
                  <Icon className={`w-5 h-5 ${stat.color} group-hover:text-white transition-colors duration-300`} strokeWidth={1.5} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900 tracking-tight mb-1">
                  {stat.value}
                </p>
                <h3 className="text-[13px] font-medium text-slate-800 mb-1.5">
                  {stat.label}
                </h3>
                <p className="text-[11px] text-slate-400 font-light">
                  {stat.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Management Console */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[11px] font-mono text-slate-300 tracking-[0.3em] uppercase">
            Management Console
          </h2>
          <div className="h-px flex-1 bg-slate-50" />
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white text-[10px] font-mono tracking-widest uppercase hover:bg-black transition-all duration-300 active:scale-95 group">
            <LayoutGrid size={14} className="group-hover:rotate-45 transition-transform duration-300" />
            Workforce Portal
          </button>
          <button className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-mono tracking-widest uppercase hover:border-slate-900 hover:text-slate-900 transition-all duration-300 active:scale-95">
            <CreditCard size={14} />
            Payroll Engine
          </button>
          <button className="flex items-center gap-3 px-6 py-3.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-mono tracking-widest uppercase hover:border-slate-900 hover:text-slate-900 transition-all duration-300 active:scale-95">
            <Settings size={14} />
            Terminal Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard