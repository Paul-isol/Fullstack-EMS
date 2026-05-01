import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({ error: "Unauthorized" });
        }
        const session = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!session){
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.session = session;
        next();
    } catch (error) {
        console.error("auth middleware failed: ", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
}

export const protectAdmin = async (req, res, next) => {
    try {
        if(req.session?.role !== "ADMIN"){
            return res.status(403).json({error: "Not authorized"});
        }
        
        next();
    } catch (error) {
        console.error("auth middleware failed: ", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
}
