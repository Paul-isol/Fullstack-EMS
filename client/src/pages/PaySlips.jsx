import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets"
import Loading from "../components/Loading"
import PayslipList from "../components/payslip/PayslipList"
import { ShieldCheck, Plus, FileText, Database } from "lucide-react"
import GenerateNewPayslipForm from "../components/payslip/GenerateNewPayslipForm"

const PaySlips = () => {
  const [payslips, setPayslips] = useState([])
  const [employees, setEmployees] = useState([])
  const [showPayslipModel, setShowPayslipModel] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Mocking isAdmin for design purposes
  const isAdmin = true

  const fetchPayslips = useCallback(async () => {
    // Simulate API delay
    setLoading(true)
    setShowPayslipModel(false)
    setTimeout(() => {
      setPayslips(dummyPayslipData)
      setLoading(false)
    }, 800)
  }, [])
  
  useEffect(() => {
    fetchPayslips()
  }, [fetchPayslips])
  
  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData)
  }, [isAdmin])

  if (loading) return <Loading />

  return (
    <div className="space-y-10 animate-fade-in pb-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="relative">
        <div className="w-10 h-px bg-slate-200 mb-6" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-light text-slate-900 tracking-tight mb-3">
              Payroll Management
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span className="label-technical text-slate-900">
                  {isAdmin ? "Admin Payroll Console" : "Employee Financial Portal"}
                </span>
              </div>
              <div className="w-1 h-1 rounded-none bg-slate-200" />
              <span className="label-technical text-slate-400">
                {isAdmin ? "System-wide salary distribution" : "Terminal Logs: Archived Statements"}
              </span>
            </div>
          </div>
          
          {isAdmin && (
            <button 
              className="btn-terminal btn-terminal-primary group"
              onClick={() => setShowPayslipModel(true)}
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              Initialize New Payslip
            </button>
          )}
          <GenerateNewPayslipForm 
            open={showPayslipModel} 
            employees={employees} 
            onSuccess={fetchPayslips} 
            onClose={() => setShowPayslipModel(false)}
          />
        </div>
      </div>

      {/* Summary Bento Grid (Optional/Placeholder for visual balance) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="terminal-card p-6 flex items-start gap-4 bg-slate-50/50">
          <div className="p-3 bg-white border border-slate-100 text-slate-400">
            <Database size={20} />
          </div>
          <div>
            <h4 className="label-technical text-slate-900 mb-1">Fiscal Year</h4>
            <p className="text-2xl font-light text-slate-900 tracking-tight">2026-27</p>
          </div>
        </div>
        <div className="terminal-card p-6 flex items-start gap-4 bg-slate-50/50">
          <div className="p-3 bg-white border border-slate-100 text-slate-400">
            <FileText size={20} />
          </div>
          <div>
            <h4 className="label-technical text-slate-900 mb-1">Statements</h4>
            <p className="text-2xl font-light text-slate-900 tracking-tight">{payslips.length}</p>
          </div>
        </div>
        <div className="terminal-card p-6 flex items-start gap-4 border-dashed">
          <div className="p-3 bg-white border border-slate-100 text-slate-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="label-technical text-slate-900 mb-1">Security</h4>
            <p className="text-[11px] text-slate-500 leading-tight pt-1">
              All financial records are encrypted and verified by the system controller.
            </p>
          </div>
        </div>
      </div>

      {/* Payslip List Terminal */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-3 bg-slate-900" />
          <span className="label-technical text-slate-900">Payroll Terminal Logs</span>
        </div>
        <PayslipList payslips={payslips} isAdmin={isAdmin} />
      </div>

      {/* Quick Access Info */}
      <div className="terminal-card p-8 bg-slate-900 text-white border-none flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        {/* Decorative background logo */}
        <FileText size={160} className="absolute -right-10 -bottom-10 text-white/5" />
        
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <h4 className="text-xl font-light tracking-tight">Financial Support</h4>
          <p className="text-slate-400 text-[13px] font-light max-w-md">
            For any discrepancies in your salary statements or tax calculations, please contact the finance department terminal directly.
          </p>
        </div>
        <button className="btn-terminal bg-white text-slate-900 hover:bg-slate-100 px-10 relative z-10">
          Open Finance Ticket
        </button>
      </div>
    </div>
  )
}

export default PaySlips