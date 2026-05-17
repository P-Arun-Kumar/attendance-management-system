const jwt = require("jsonwebtoken");
const User = require("../models/User");
// ================= PROTECT ROUTES =================
exports.protect = async (req, res, next) => {
    try {
        // console.log("🔥 AUTH MIDDLEWARE HIT");
        // console.log("AUTH HEADER:", req.headers.authorization);
        let token;
        // Check token exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
        }
        // If token missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing"
            });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("DECODED TOKEN:", decoded)
        // Get logged in user
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authorized, invalid token"
        });
    }
};
