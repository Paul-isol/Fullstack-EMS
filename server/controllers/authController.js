import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config"
// login for admin and employee
// POST api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" });
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        if (role_type === "admin" && user.role !== "ADMIN") {
            return res.status(401).json({ error: "Not authorized as admin" });
        }
        if (role_type === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({ error: "Not authorized as admin" });
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.json({ user: payload });
    } catch (error) {
        console.error("login failed: ", error);
        return res.status(500).json({ error: "login failed" });
    }
}

// get session
// GET api/auth/session
export const session = async (req,res) => {
    const session = req.session;
    return res.json({user: session});
}

// change password
// POST /api/auth/change-password
export const changePassword = async (req, res) => {
    try {
        const session = req.session;
        const { currentPassword, newPassword } = req.body;
        if(!currentPassword || !newPassword){
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findById(session.userId);
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if(!isValid){
            return res.status(401).json({ error: "Invalid Current Password" });
        }
        const hash = await bcrypt.hash(newPassword,10);
        user.password = hash;
        await user.save();
        return res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("change password failed: ", error);
        return res.status(500).json({ error: "change password failed" });
    }
}

// logout
// POST /api/auth/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("logout failed: ", error);
        return res.status(500).json({ error: "logout failed" });
    }
}
