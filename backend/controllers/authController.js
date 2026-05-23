const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER (SINGLE + BULK) =================
exports.register = async (req, res) => {
    try {

        // ================= BULK INSERT =================
        if (Array.isArray(req.body)) {

            const users = req.body;

            // 1. Check duplicates in DB
            const emails = users.map(u => u.email);

            const existingUsers = await User.find({
                email: { $in: emails }
            });

            if (existingUsers.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Some emails already exist",
                    existing: existingUsers.map(u => u.email)
                });
            }

            // 2. Hash passwords properly
            const hashedUsers = await Promise.all(
                users.map(async (u) => ({
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    facultyId: u.facultyId,
                    password: await bcrypt.hash(u.password, 10)
                }))
            );

            // 3. Insert bulk
            const createdUsers = await User.insertMany(hashedUsers);

            return res.status(201).json({
                success: true,
                message: "Bulk users created successfully",
                count: createdUsers.length,
                users: createdUsers
            });
        }

        // ================= SINGLE INSERT =================
        const { name, email, password, role, facultyId } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            facultyId
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

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                facultyId: user.facultyId || null
            },
            process.env.JWT_SECRET,
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