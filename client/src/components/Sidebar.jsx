import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [username, setUsername] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate()

  const { user, loading, logout } = useAuth();
  const role = user?.role;
  useEffect(() => {
    api.get("/profile").then(({ data }) => {
      if (data.firstName) {
        setUsername(`${data.firstName} ${data.lastName}`.trim());
      }
    });
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Attendance", path: "/attendance", icon: Calendar },
    role === "ADMIN" && { name: "Employees", path: "/employees", icon: Users },
    { name: "Leave", path: "/leave", icon: Briefcase },
    { name: "PaySlips", path: "/payslip", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = ()=>{
    logout();
    navigate("/login")
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-slate-200 rounded-none md:hidden transition-all duration-200 active:scale-95"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-none shadow-lg shadow-slate-200">
              <Shield className="text-white w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tighter uppercase leading-none">
                EMS Admin
              </h2>
              <p className="text-[9px] font-mono text-slate-400 tracking-[0.2em] uppercase mt-1">
                Terminal v2.0
              </p>
            </div>
          </div>
          <div className="w-8 h-px bg-slate-200 mb-6" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 group-hover:bg-black">
              <div className="relative flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border border-white/10" />
                <div className="absolute inset-0 rounded-full border border-transparent border-t-white animate-[spin_0.8s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
              </div>
            </div>
          ) : (
            navItems.filter(Boolean).map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3.5 transition-all duration-200 group relative ${
                      isActive
                        ? "text-slate-900 bg-slate-50 font-medium"
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-50/50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2 : 1.5}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "text-slate-900"
                            : "text-slate-300 group-hover:text-slate-900"
                        }`}
                      />
                      <span className="text-[13px] tracking-tight">
                        {item.name}
                      </span>

                      {/* Sharp Active Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })
          )}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 mt-auto">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-none group hover:border-slate-200 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-none bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                
                  <span className="text-xs font-mono text-slate-400">
                    {username
                      ? username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "UE"}
                  </span>
                
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-slate-900 truncate">
                  {username || "System User"}
                </p>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest">
                  {user?.email}
                </p>
              </div>
            </div>

            <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 text-slate-500 text-[10px] font-mono tracking-widest uppercase hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 active:scale-95">
              <LogOut size={12} strokeWidth={2} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
