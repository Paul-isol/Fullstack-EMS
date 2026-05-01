import "dotenv/config";
import connectDB from "./config/db.js";
import bcrypt from "bcrypt";
import User from "./models/User.js";
async function seedAdmin(){
    try {
        const admin_email = process.env.ADMIN_EMAIL;
        if(!admin_email) {
            console.error("Admin email not found in env file");
            process.exit(1);
        }

        await connectDB();

        const existingAdmin = await User.findOne({email: admin_email});
        if(existingAdmin){
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            email: admin_email,
            password: hashedPassword,
            role: "ADMIN"
        })
        console.log("Admin created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Failed to seed admin", error);
        process.exit(1);
    }
}

seedAdmin();