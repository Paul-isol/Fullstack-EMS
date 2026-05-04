import { useState, useEffect } from "react"
import Loading from "../components/Loading"
import { Lock, ShieldCheck, Key, Settings2, ShieldAlert } from "lucide-react"
import ProfileForm from "../components/ProfileForm"
import ChangePasswordModel from "../components/ChangePasswordModel"
import api from "../api/axios"
const Settings = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordModel, setShowPasswordModel] = useState(false)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) return <Loading />
  
  return (
    <div className="space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative">
        <div className="w-10 h-px bg-slate-200 mb-6" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-light text-slate-900 tracking-tight mb-3">
              Account Control Terminal
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span className="label-technical text-slate-900">SECURE_PREFERENCES</span>
              </div>
              <div className="w-1 h-1 rounded-none bg-slate-200" />
              <span className="label-technical text-slate-400">
                Authorized User Session: {profile?.email}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2">
            <div className="w-2 h-2 bg-emerald-500 animate-terminal-pulse" />
            <span className="label-technical text-slate-600 text-[9px]">Biometric Auth Sync: ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Profile Form */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center gap-3">
             <div className="w-1 h-3 bg-slate-900" />
             <span className="label-technical text-slate-900 uppercase">Identity Configuration</span>
           </div>
           {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile}/>}
        </div>

        {/* Right Column: Security & Actions */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-3 bg-slate-900" />
            <span className="label-technical text-slate-900 uppercase">System Security</span>
          </div>

          <div className="terminal-card terminal-card-hover p-8 group overflow-hidden relative">
            <Key size={120} className="absolute -right-8 -bottom-8 text-slate-50 group-hover:text-slate-100 transition-colors pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                  <Lock size={20} />
                </div>
                <div className="w-8 h-px bg-slate-100" />
              </div>

              <div className="space-y-2">
                <h3 className="label-technical text-slate-900">CREDENTIAL_ROTATION</h3>
                <p className="text-[13px] text-slate-500 font-light leading-relaxed">
                  Update your authentication tokens and security keys to maintain terminal integrity.
                </p>
              </div>

              <button 
                onClick={() => setShowPasswordModel(true)}
                className="btn-terminal btn-terminal-secondary w-full"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="terminal-card p-8 bg-slate-50 border-dashed space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-slate-100 text-amber-500">
                <ShieldAlert size={18} />
              </div>
              <h4 className="label-technical text-slate-900 text-[10px]">Security Protocols</h4>
            </div>
            
            <p className="text-[12px] text-slate-500 leading-relaxed font-light italic">
              Changes to core identity records may require administrative verification before synchronization is completed across all systems.
            </p>
            
            <div className="pt-2">
               <span className="label-technical text-[8px] text-slate-300">LOG_LEVEL: VERBOSE_SECURITY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="terminal-card p-10 border-slate-900 bg-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        {/* Animated background element */}
        <Settings2 size={180} className="absolute -right-10 -bottom-10 text-slate-50 group-hover:rotate-45 transition-transform duration-700 pointer-events-none" />
        
        <div className="relative z-10 space-y-3 text-center md:text-left">
          <h3 className="text-2xl font-light tracking-tight text-slate-900">Advanced Terminal Config</h3>
          <p className="text-slate-500 text-[14px] font-light max-w-xl leading-relaxed">
            Configure system-level environment variables, notification webhooks, and administrative access privileges.
          </p>
        </div>
        
        <button className="btn-terminal btn-terminal-primary px-12 relative z-10">
          Open Advanced Tools
        </button>
      </div>
      <ChangePasswordModel open={showPasswordModel} onClose={()=>setShowPasswordModel(false)}/>
    </div>
  )
}

export default Settings