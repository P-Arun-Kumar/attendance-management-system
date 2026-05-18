exports.authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        // req.user is added by protect middleware
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