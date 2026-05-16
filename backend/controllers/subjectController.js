const Subject = require("../models/Subject");
// ================= ADD SUBJECT(S) =================
exports.addSubjects = async (req, res) => {
    try {
        const data = req.body;
        // BULK INSERT
        if (Array.isArray(data)) {
            const subjects = await Subject.insertMany(data);
            return res.status(201).json({
                success: true,
                message: "Subjects added successfully",
                count: subjects.length,
                subjects
            });
        }
        // SINGLE INSERT
        const subject = await Subject.create(data);
        res.status(201).json({
            success: true,
            message: "Subject added successfully",
            subject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding subject",
            error: error.message
        });
    }
};
// ================= GET ALL =================
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json({
            success: true,
            count: subjects.length,
            subjects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subjects",
            error: error.message
        });
    }
};
// ================= GET BY CODE =================
exports.getSubjectByCode = async (req, res) => {
    try {
        const subject = await Subject.findOne({
            subjectCode: req.params.subjectCode
        });
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }
        res.status(200).json({
            success: true,
            subject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching subject",
            error: error.message
        });
    }
};
// ================= UPDATE =================
exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findOneAndUpdate(
            { subjectCode: req.params.subjectCode },
            req.body,
            { new: true, runValidators: true }
        );
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Subject updated successfully",
            subject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating subject",
            error: error.message
        });
    }
};
// ================= DELETE =================
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findOneAndDelete({
            subjectCode: req.params.subjectCode
        });
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Subject deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting subject",
            error: error.message
        });
    }
};