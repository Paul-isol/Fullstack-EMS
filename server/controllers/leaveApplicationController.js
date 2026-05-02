import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

// create application
// POST /api/leave
export const createLeaveApplication = async(req,res) => {
    try{
        const session = req.session;
        const employee = await Employee.findById(session.userId);
        if(!employee) return res.status(404).json({message:"Employee not found"});
        if(employee.isDeleted) return res.status(403).json({error: "Your account has been deactivated"})

        const {type,startDate,endDate,reason} = req.body;
        if(!type || !startDate || !endDate || !reason) return res.status(400).json({error:"Please fill all the required fields"});

        const today = new Date();
        today.setHours(0,0,0,0);
        if(new Date(startDate) <= today || new Date(endDate) <= today) return res.status(400).json({error:"Start and end date must be greater than today"});
        if(new Date(endDate) < new Date(startDate)) return res.status(400).json({error:"End date must be greater than start date"});

        const leave = await LeaveApplication.create({
            employeeId: employee._id,
            type,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            status:"PENDING"
        });

        await inngest.send({
            name: "leave/pending",
            data: {
                leaveApplicationId: leave._id.toString()
            }
        });

        return res.status(201).json({ success: true, data: leave});
    }catch(err){
        return res.status(500).json({error: "Failed to create leave application"});
    }
}

// get all applications
// GET /api/leave
export const getLeaveApplications = async(req,res) => {
    try{
        const session = req.session;
        const isAdmin = session.role === "ADMIN";
        if(isAdmin){
            const status = req.query.status;
            const where = status ? {status} : {};
            const leaves = (await LeaveApplication.find(where).populate("employeeId")).sort({createdAt: -1});
            const data = leaves.map((leave) => {
                const obj = leave.toObject();
                return {
                    ...obj,
                    id: obj._id.toString(),
                    employee: obj.employeeId,
                    employeeId: obj.employeeId._id?.toString(),
                }
            })
            return res.status(200).json({success: true, data: data});
        } else {
            const employee = await Employee.findById(session.userId);

            if(!employee) return res.status(404).json({message:"Employee not found"});

            const leaves = (await LeaveApplication.find({employeeId: employee._id}).sort({createdAt: -1}));

            return res.status(200).json({success: true, data: leaves, employee: {...employee, id: employee._id.toString()} });
        }
        
        
    }catch(err){
        return res.status(500).json({error: "Failed to get leave applications"});
    }
}

// update application
// PUT /api/leave/:id
export const updateLeaveApplication = async(req,res) => {
    try{
        const {status} = req.body;

        if(!status) return res.status(400).json({error: "Please fill all the required fields"});
        if(!["APPROVED","REJECTED"].includes(status)) return res.status(400).json({error: "Invalid status"});

        const leave = await LeaveApplication.findByIdAndUpdate(req.params.id, {status}, {returnDocument: "after"});
        if(!leave) return res.status(404).json({message:"Leave application not found"});

        return res.status(200).json({success: true, data: leave});
    }catch(err){
        return res.status(500).json({error: "Failed to update leave application"});
    }
}
