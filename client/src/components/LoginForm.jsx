import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import LoginLeftSide from "./LoginLeftSide";

const LoginForm = ({ role, title, subTitle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRoleAdmin = role === "admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white selection:bg-slate-100 overflow-hidden">
      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 sm:px-16 lg:px-24 py-12 md:py-20 relative overflow-y-auto">
        <div className="w-full max-w-sm mx-auto md:mx-0">
          {/* Back Navigation */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2.5 text-slate-400 hover:text-slate-900 transition-all duration-200 group mb-12"
          >
            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center transition-colors group-hover:border-slate-300 group-hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Portal Selection</span>
          </Link>

          {/* Form Container */}
          <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-12">
              <div
                className={`w-10 h-px mb-6 ${isRoleAdmin ? "bg-indigo-400" : "bg-emerald-400"}`}
              />
              <h1 className="text-3xl font-light text-slate-900 tracking-tight mb-3">
                {title}
              </h1>
              <p className="text-[13px] text-slate-400 leading-relaxed font-light">
                {subTitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-7">
                {/* Email Field */}
                <div className="group relative">
                  <label className="absolute -top-2.5 left-0 text-[9px] uppercase tracking-[0.25em] text-slate-400 bg-white px-1 z-10 transition-colors group-focus-within:text-slate-900">
                    Identity
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-slate-900 transition-colors">
                      <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3.5 bg-transparent border-b border-slate-200 rounded-none focus:outline-none focus:border-slate-900 transition-all duration-300 text-[14px] placeholder:text-slate-200 placeholder:font-light"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group relative">
                  <label className="absolute -top-2.5 left-0 text-[9px] uppercase tracking-[0.25em] text-slate-400 bg-white px-1 z-10 transition-colors group-focus-within:text-slate-900">
                    Security Key
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-slate-900 transition-colors">
                      <Lock className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter security key"
                      className="w-full pl-10 pr-12 py-3.5 bg-transparent border-b border-slate-200 rounded-none focus:outline-none focus:border-slate-900 transition-all duration-300 text-[14px] placeholder:text-slate-200 placeholder:font-light"
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-300 hover:text-slate-900 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                      ) : (
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-3.5 h-3.5 border border-slate-200 rounded-none checked:bg-slate-900 checked:border-slate-900 transition-all duration-200"
                    />
                    <ShieldCheck className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-600 transition-colors font-light">
                    Stay authorized
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[11px] text-slate-400 hover:text-slate-900 transition-colors font-light border-b border-transparent hover:border-slate-900 pb-0.5"
                >
                  Forgot identity?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full py-4.5 bg-slate-900 text-white text-[11px] font-mono tracking-[0.3em] uppercase transition-all duration-300 hover:bg-black overflow-hidden rounded-none flex items-center justify-center gap-3 ${
                  isSubmitting ? "opacity-90 cursor-wait" : ""
                }`}
              >
                <span
                  className={`transition-all duration-300 ${isSubmitting ? "translate-x-2 opacity-0" : ""}`}
                >
                  Authenticate
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    isSubmitting ? "opacity-0" : "group-hover:translate-x-1"
                  }`}
                  strokeWidth={2.5}
                />
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white animate-spin" />
                  </div>
                )}
              </button>
            </form>

            {/* Verification Footer */}
            <div className="mt-16 flex flex-col items-center">
              <div className="flex items-center gap-4 w-full">
                <div className="h-px flex-1 bg-slate-50" />
                <p className="text-[10px] font-mono text-slate-200 tracking-[0.4em] uppercase">
                  Secured Terminal
                </p>
                <div className="h-px flex-1 bg-slate-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
