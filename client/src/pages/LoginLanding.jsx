import LoginLeftSide from "../components/LoginLeftSide";
import { ArrowRight, ShieldIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

const LoginLanding = () => {
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, payroll, departments & system config.",
      icon: ShieldIcon,
      tag: "Administrative",
      badge: "Full access",
      stripe: "bg-gradient-to-b from-indigo-400 to-indigo-500",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
      tagColor: "text-indigo-300",
      hoverTitle: "group-hover:text-indigo-600",
      ctaColor: "text-indigo-500",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-400",
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View attendance, apply for leave & download payslips.",
      icon: UserIcon,
      tag: "Self-service",
      badge: "Personal",
      stripe: "bg-gradient-to-b from-emerald-400 to-emerald-500",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      tagColor: "text-emerald-300",
      hoverTitle: "group-hover:text-emerald-600",
      ctaColor: "text-emerald-500",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-400",
    },
  ];
  return (
    <div className="h-screen flex flex-col md:flex-row bg-white selection:bg-slate-100 overflow-hidden">
      <LoginLeftSide />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 sm:px-16 lg:px-24 py-12 md:py-20 relative overflow-y-auto">
        <div className="w-full max-w-sm mx-auto md:mx-0">
          {/* Header */}
          <div className="mb-12">
            <div className="w-10 h-px bg-slate-200 mb-6" />
            <h1 className="text-3xl font-light text-slate-900 tracking-tight mb-3">
              Welcome back
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed font-light">
              Select your portal to continue to your workspace.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="flex flex-col gap-4">
            {portalOptions.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="group relative flex items-center gap-5 bg-white border border-slate-200 rounded-none overflow-hidden pr-6 transition-all duration-300 hover:border-slate-900 hover:shadow-[10px_10px_40px_-15px_rgba(0,0,0,0.1)]"
                >
                  {/* Left color stripe */}
                  <div
                    className={`self-stretch w-1 flex-shrink-0 transition-all duration-300 group-hover:w-1.5 ${portal.stripe}`}
                  />

                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-none ${portal.iconBg} flex items-center justify-center transition-all duration-300 group-hover:bg-white my-5`}
                  >
                    <Icon
                      className={`w-[22px] h-[22px] ${portal.iconColor} transition-transform duration-300 group-hover:scale-110`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 py-5">
                    <p
                      className={`font-mono text-[9px] tracking-[0.25em] uppercase mb-1.5 ${portal.tagColor}`}
                    >
                      {portal.tag}
                    </p>
                    <p className="text-[15px] font-medium text-slate-800 mb-1 transition-colors duration-300 group-hover:text-black">
                      {portal.title}
                    </p>
                    <p className="text-[12.5px] text-slate-400 leading-relaxed font-light line-clamp-1">
                      {portal.description}
                    </p>
                  </div>

                  {/* CTA Icon */}
                  <div className="flex-shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <ArrowRight className={`w-4 h-4 ${portal.ctaColor}`} strokeWidth={2} />
                  </div>

                  {/* Badge */}
                  <span
                    className={`absolute top-4 right-6 font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-none ${portal.badgeBg} ${portal.badgeText}`}
                  >
                    {portal.badge}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px w-8 bg-slate-100" />
            <p className="text-[10px] font-mono text-slate-300 tracking-[0.4em] uppercase">
              EMS Terminal v2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
