import { Router } from "express";
import { login, session, changePassword, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/session",protect, session);
authRouter.post("/change-password",protect, changePassword);
authRouter.post("/logout",protect, logout);

export default authRouter;