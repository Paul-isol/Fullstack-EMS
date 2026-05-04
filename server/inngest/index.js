import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "fullstack-ems" });

const getEmailTemplate = (name, message, buttonText, ref) => `
<div style="font-family: 'Inter', -apple-system, sans-serif; background-color: #fafbfc; padding: 40px; color: #475569; line-height: 1.5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; padding: 40px; border-radius: 0;">
        <div style="width: 40px; height: 1px; background-color: #e2e8f0; margin-bottom: 24px;"></div>
        <h1 style="color: #0f172a; font-size: 24px; font-weight: 300; letter-spacing: -0.025em; margin: 0 0 8px 0;">EMS Terminal Update</h1>
        <p style="font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #94a3b8; margin: 0 0 32px 0;">Ref: ${ref}</p>
        
        <p style="font-size: 14px; margin: 0 0 32px 0;">Hello ${name},<br><br>${message}</p>
        
        <a href="${process.env.CLIENT_URL}/attendance" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 14px 28px; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; border-radius: 0;">${buttonText}</a>
        
        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="vertical-align: middle;">
                        <div style="display: inline-block; width: 6px; height: 6px; background-color: #10b981; margin-right: 8px;"></div>
                        <span style="font-family: monospace; font-size: 8px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em;">System Standby</span>
                    </td>
                    <td style="text-align: right; vertical-align: middle;">
                        <span style="font-family: monospace; font-size: 8px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">EMS-SECURED-SYNC</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
`;

// auto checkout for employees:
const autoCheckOut = inngest.createFunction(
    { id: "auto-check-out", triggers: [{ event: "employee/check-out" }] },
    async ({ event, step }) => {
        const { employeeId, attendanceId } = event.data;

        // sleep 9 hours
        await step.sleepUntil("wait-for-9-hours", new Date(new Date().getTime() + 9 * 60 * 60 * 1000));

        // get attendance data
        let attendance = await Attendance.findById(attendanceId);

        if (!attendance?.checkOut) {
            const employee = await Employee.findById(employeeId);

            // send reminder email
            await sendEmail({
                to: employee.email,
                subject: "Reminder: Terminate Session (Check Out)",
                body: getEmailTemplate(
                    employee.firstName, 
                    "System logs indicate that your session has not been terminated for today. Please synchronize your status through the EMS terminal.",
                    "Access Terminal",
                    'EMS-TERM-LOGOUT'
                ),
            })

            // After 10 hours mark attendance as checked out with status "LATE"
            await step.sleepUntil("wait-for-1-hour", new Date(new Date().getTime() + 1 * 60 * 60 * 1000));

            attendance = await Attendance.findById(attendanceId);

            if (!attendance?.checkOut) {
                attendance.checkOut = new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000;
                attendance.status = "LATE";
                attendance.dayType = "Half Day";
                attendance.workingHours = 4;

                await attendance.save();
            }

        }


    },
);

// send leave application reminder to admin if didnt take action within 24 hrs
const leaveApplicationReminder = inngest.createFunction(
    { id: "leave-application-reminder", triggers: [{ event: "leave/pending" }] },
    async ({ event, step }) => {
        const { leaveApplicationId } = event.data;

        // wait 24 hrs
        await step.sleepUntil("wait-24-hrs", new Date(new Date().getTime() + 24 * 60 * 60 * 1000));

        const leaveApplication = await LeaveApplication.findById(leaveApplicationId);

        if (leaveApplication.status === "PENDING") {
            const employee = await Employee.findById(leaveApplication.employeeId);

            // send email
            await sendEmail({
                to: process.env.ADMIN_EMAIL,
                subject: "Reminder: Pending Leave Application",
                body: getEmailTemplate(
                    "Administrator",
                    `A leave application from <strong>${employee.firstName} ${employee.lastName}</strong> has been pending for over 24 hours. Please review the request to ensure timely processing.`,
                    "Review Application",
                    'EMS-ADMIN-LEAVE-PENDING'
                ),
            })
        }
    }
);

// cron: check attendance at 11:30 am IST (06:00 utc) and email absentees employees
const attendanceReminder = inngest.createFunction(
    { id: "attendance-reminder", triggers: [{ cron: "TZ=Asia/Kolkata 30 11 * * *" }] }, // 6 am IST on weekdays
    async ({ event, step }) => {
        // step 1 : get todays date range
        const today = await step.run("get-today-date", () => {
            const startUtc = new Date(new Date().toLocaleDateString(
                "en-CA", { timeZone: "Asia/Kolkata" }
            ) + "T00:00:00+05:30");
            const endUtc = new Date(startUtc.getTime() + 24 * 60 * 60 * 1000);
            return { startUtc: startUtc.toISOString(), endUtc: endUtc.toISOString() };
        });

        //step 2 : get active employees
        const activeEmployees = await step.run("get-active-employees", async () => {
            const employees = await Employee.find({
                isDeleted: false,
                employmentStatus: "ACTIVE",
            }).lean();
            return employees.map((emp) => ({
                _id: emp._id.toString(),
                firstName: emp.firstName,
                lastName: emp.lastName,
                email: emp.email,
                department: emp.department
            }))
        });

        // step 3 : get employees ids on approved leave today
        const onLeaveIds = await step.run("get-on-leave-ids", async () => {
            const leaveApplications = await LeaveApplication.find({
                status: "APPROVED",
                startDate: { $lte: new Date(today.endUtc) },
                endDate: { $gte: new Date(today.startUtc) }
            }).lean();

            return leaveApplications.map((l) => l.employeeId.toString());
        });

        // step 4 : get employees who have checked in today
        const checkedInIds = await step.run("get-checked-in-ids", async () => {
            const attendances = await Attendance.find({
                date: { $gte: new Date(today.startUtc), $lt: new Date(today.endUtc) },
                checkIn: { $ne: null },
            }).lean();

            return attendances.map((a) => a.employeeId.toString());
        });

        // step 5 : filter absent employees
        const absentEmployees = activeEmployees.filter(
            (emp) => !onLeaveIds.includes(emp._id) && !checkedInIds.includes(emp._id)
        );

        //step 6 : send email to absentees
        if (absentEmployees.length > 0) {
            await step.run("send-absentee-emails", async () => {
                const emailPromises = absentEmployees.map((emp) => {
                    return sendEmail({
                        to: emp.email,
                        subject: "Reminder: Initialize Session (Check In)",
                        body: getEmailTemplate(
                            emp.firstName,
                            "System logs indicate that your session has not been initialized for today. Please synchronize your status through the EMS terminal.",
                            "Access Terminal",
                            'EMS-TERM-LOGIN'
                        ),
                    })
                });
                return Promise.all(emailPromises);
            })
        }
        return { totalActive: activeEmployees.length, onLeave: onLeaveIds.length, checkedIn: checkedInIds.length, totalAbsent: absentEmployees.length }


    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [autoCheckOut, leaveApplicationReminder, attendanceReminder];