import {Router} from "express";
import { createLeaveApplication, getLeaveApplications, updateLeaveApplication } from "../controllers/leaveApplicationController.js";
import { protect, protectAdmin } from "../middleware/authMiddleware.js";

const leaveAppRouter = Router();

leaveAppRouter.post("/", protect, createLeaveApplication);
leaveAppRouter.get("/", protect, getLeaveApplications);
leaveAppRouter.patch("/:id", protect, protectAdmin, updateLeaveApplication);

export default leaveAppRouter;