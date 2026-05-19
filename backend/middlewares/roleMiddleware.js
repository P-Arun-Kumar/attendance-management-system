exports.authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        // req.user is added by protect middleware
        console.log("USER ROLE:", req.user.role);
        console.log("ALLOWED ROLES:", allowedRoles);
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied: insufficient permissions"
            });
        }
        next();
    };
};