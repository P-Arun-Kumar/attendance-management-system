const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ================= REGISTER =================
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};
// ================= LOGIN =================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // check password
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
    });
}
        // create token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            "SECRET_KEY",
            { expiresIn: "1d" }
        );
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};