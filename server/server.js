import express from "express"
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser"
import "dotenv/config"
import connectDB from "./config/db.js"
import authRouter from "./routes/authRoutes.js"
import employeeRouter from "./routes/EmployeeRoutes.js"
import profileRouter from "./routes/profileRoutes.js"
import attendanceRouter from "./routes/attendanceRoutes.js"
import leaveAppRouter from "./routes/leaveApplicationRoutes.js"

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(multer().none())

// Routes
app.get("/", (req, res) => {
    res.send("Backend is running...")
})

app.use("/api/auth", authRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveAppRouter);

await connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})