import { DEPARTMENTS } from "../constants/departments.js";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

//get dashboard for employee and admin
// GET /api/dashboard
export const getDashboard = async(req,res) => {
    try {
        const session = req.session;
        const isAdmin = session.role === "ADMIN";
        if(isAdmin) {
            const [totalEmployees, totalAttendance, totalPendingLeaves] = await Promise.all([
                Employee.countDocuments({isDeleted: {$ne: true}}),
                Attendance.countDocuments({
                    date: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        $lt: new Date(new Date().setHours(24, 0, 0, 0))
                    }
                }),
                LeaveApplication.countDocuments({
                    status: "PENDING"
                })
            ])

            return res.status(200).json({
                success: true,
                role: "ADMIN",
                totalEmployees,
                totalAttendance,
                totalPendingLeaves,
                totalDepartments: DEPARTMENTS.length
            })
        } else {
            const employee = await Employee.findById(session.userId);
            if(!employee) return res.status(404).json({message: "Employee not found"});

            const today = new Date();

            const [currentMonthAttendance, totalPendingLeaves, latestPayslip ] = await Promise.all([
                Attendance.countDocuments({
                    employeeId: employee._id,
                    date: {
                        $gte: new Date(today.getFullYear(), today.getMonth(), 1),
                        $lt: new Date(today.getFullYear(), today.getMonth() + 1, 1)
                    }
                }),
                LeaveApplication.countDocuments({
                    employeeId: employee._id,
                    status: "PENDING"
                }),
                Payslip.findOne({employeeId: employee._id}).sort({createdAt: -1}).lean()
            ]);

            return res.status(200).json({
                success: true,
                role: "EMPLOYEE",
                employee: {...employee, id: employee._id.toString()},
                currentMonthAttendance,
                totalPendingLeaves,
                latestPayslip: latestPayslip? {...latestPayslip, id: latestPayslip._id.toString()}: null,
            })
            
        }
    }catch(err){
        return res.status(500).json({error: "Failed to get dashboard"});
    }
}