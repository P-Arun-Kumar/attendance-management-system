const Faculty = require("../models/Faculty");
// ================= ADD FACULTY =================
exports.addFaculty = async (req, res) => {
    try {
        const facultyData = req.body;
        const faculty = await Faculty.insertMany(facultyData);
        res.status(201).json({
            success: true,
            message: "Faculty added successfully",
            faculty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add faculty",
            error: error.message
        });
    }
};
// ================= GET ALL FACULTY =================
exports.getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.status(200).json({
            success: true,
            count: faculty.length,
            faculty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch faculty",
            error: error.message
        });
    }
};
// ================= GET BY ID =================
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findOne({ facultyId: req.params.facultyId });
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found"
            });
        }
        res.status(200).json({
            success: true,
            faculty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch faculty",
            error: error.message
        });
    }
};
// ================= UPDATE FACULTY =================
exports.updateFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findOneAndUpdate(
            { facultyId: req.params.facultyId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Faculty updated successfully",
            faculty
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update faculty",
            error: error.message
        });
    }
};
// ================= DELETE FACULTY =================
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findOneAndDelete({
            facultyId: req.params.facultyId
        });
        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Faculty deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete faculty",
            error: error.message
        });
    }
};