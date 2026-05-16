const Student = require("../models/Student");
// ================= ADD STUDENTS =================
exports.addStudents = async (req, res) => {
    try {
        if (!req.body || req.body.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No student data provided"
            });
        }
        const students = await Student.insertMany(req.body);
        res.status(201).json({
            success: true,
            message: "Students Added Successfully",
            students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add students",
            error: error.message
        });
    }
};
// ================= GET ALL STUDENTS =================
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            success: true,
            count: students.length,
            students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message
        });
    }
};
// ================= GET STUDENT BY ROLL NUMBER =================
exports.getStudentByRollNumber = async (req, res) => {
    try {
        const student = await Student.findOne({
            rollNumber: req.params.rollNumber
        });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch student",
            error: error.message
        });
    }
};
// ================= UPDATE STUDENT BY ROLL NUMBER =================
exports.updateStudentByRollNumber = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            {
                rollNumber: req.params.rollNumber
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update student",
            error: error.message
        });
    }
};
// ================= DELETE STUDENT BY ROLL NUMBER =================
exports.deleteStudentByRollNumber = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            rollNumber: req.params.rollNumber
        });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete student",
            error: error.message
        });
    }
};