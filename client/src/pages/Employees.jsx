import { useCallback, useEffect, useState } from "react";
import { DEPARTMENTS } from "../assets/assets";
import { Search, Plus, Filter, ChevronDown, X } from "lucide-react";
import Loading from "../components/Loading";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/axios";
import toast from "react-hot-toast";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModel, setShowCreateModel] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    // Simulate API call
    try {
      const url = selectedDepartment
        ? `/employees?department=${selectedDepartment}`
        : `/employees`;
      const res = await api.get(url);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees", error);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position} ${emp.department}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  if (loading) return <Loading />;

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="w-10 h-px bg-slate-200 mb-6" />
          <h1 className="text-3xl font-light text-slate-900 tracking-tight mb-3">
            Workforce Terminal
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase">
              Administrative Console
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-200" />
            <span className="text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase">
              {employees.length} Records Found
            </span>
          </div>
        </div>

        <button
          className="flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white text-[10px] font-mono tracking-widest uppercase hover:bg-black transition-all duration-300 active:scale-95 group self-start md:self-auto"
          onClick={() => setShowCreateModel(true)}
        >
          <Plus
            size={14}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Add Employee
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-1 bg-slate-50 border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, position, or department..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-transparent focus:border-slate-900 outline-none transition-all text-[13px] placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Filter
              size={12}
              className="text-slate-400 group-hover:text-slate-900 transition-colors"
            />
            <span className="text-[9px] font-mono text-slate-300 tracking-widest uppercase">
              Dept:
            </span>
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="appearance-none pl-20 pr-12 py-3.5 bg-white border border-transparent hover:border-slate-200 focus:border-slate-900 outline-none transition-all text-slate-600 text-[10px] font-mono tracking-widest uppercase cursor-pointer min-w-[200px]"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Filter size={12} className="opacity-0" /> {/* Spacer */}
            <ChevronDown
              size={14}
              className="text-slate-300 group-hover:text-slate-900 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.length === 0 ? (
            <div className="py-40 flex flex-col items-center justify-center text-slate-300 space-y-4 w-full">
              <Search size={40} strokeWidth={1} />
              <p className="text-[11px] font-mono tracking-widest uppercase">
                No matching records found
              </p>
            </div>
          ) : (
            filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                emp={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}

      {/* Employee Modal (Create/Edit) */}
      {(showCreateModel || editEmployee) && (
        <div
          onClick={() => {
            setShowCreateModel(false);
            setEditEmployee(null);
          }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-none shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-slate-900 px-8 py-6 flex-shrink-0 flex justify-between items-center">
              <div className="space-y-1">
                <div className="w-8 h-px bg-slate-400" />
                <h2 className="text-[11px] font-mono text-white tracking-[0.3em] uppercase">
                  {showCreateModel ? "Initialize Record" : "Update Records"}
                </h2>
                <p className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">
                  Terminal ID:{" "}
                  {showCreateModel
                    ? "NEW_ENTRY"
                    : editEmployee?._id?.substring(0, 8)}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCreateModel(false);
                  setEditEmployee(null);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <EmployeeForm
                initialData={editEmployee}
                onSuccess={() => {
                  setShowCreateModel(false)
                  setEditEmployee(null);
                  fetchEmployees();
                }}
                onCancel={() => {
                  setShowCreateModel(false)
                  setEditEmployee(null)}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
