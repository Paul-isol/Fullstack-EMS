import { Router } from "express";
import { clockInOut, getAttendanceByUser } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const attendanceRouter = Router();

attendanceRouter.post("/", protect, clockInOut);
attendanceRouter.get("/", protect, getAttendanceByUser);

export default attendanceRouter;