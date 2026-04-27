import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginLanding from "./pages/LoginLanding";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import PaySlips from "./pages/PaySlips";
import Settings from "./pages/Settings";
import PrintPaySlip from "./pages/PrintPaySlip";
import LoginForm from "./components/LoginForm";
const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />} />
        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subTitle="Full Access,Manage Everything"/>} />
        <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subTitle="Manage Attendance,Leave & Payslips"/>} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslip" element={<PaySlips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/print/payslip/:id" element={<PrintPaySlip />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;
