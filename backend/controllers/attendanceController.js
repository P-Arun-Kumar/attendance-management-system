const Attendance = require("../models/Attendance");
// ================= MARK ATTENDANCE =================
exports.markAttendance = async (req, res) => {
    try {
        const {
            facultyId,
            subjectCode,
            department,
            year,
            semester,
            section,
            date,
            hour,
            students
        } = req.body;
        // Dynamic Counts
        const totalStudents = students.length;
        const presentCount = students.filter(
            student => student.status === "P"
        ).length;
        const absentCount = students.filter(
            student => student.status === "A"
        ).length;
        // Create Attendance
        const attendance = await Attendance.create({
            facultyId,
            subjectCode,
            department,
            year,
            semester,
            section,
            date,
            hour,
            totalStudents,
            presentCount,
            absentCount,
            students
        });
        res.status(201).json({
            success: true,
            message: "Attendance Marked Successfully",
            attendance
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Attendance already marked for this faculty/date/hour"
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to mark attendance",
            error: error.message
        });
    }
};
// ================= GET ALL ATTENDANCE =================
exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance",
            error: error.message
        });
    }
};
// ================= GET ATTENDANCE =================
// facultyId + date + hour
exports.getAttendance = async (req, res) => {
    try {
        const { facultyId, date, hour } = req.query;
        const attendance = await Attendance.findOne({
            facultyId,
            date,
            hour
        });
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance not found"
            });
        }
        res.status(200).json({
            success: true,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance",
            error: error.message
        });
    }
};
// ================= GET SINGLE STUDENT ATTENDANCE =================
exports.getStudentAttendance = async (req, res) => {
    try {
        const {
            facultyId,
            date,
            hour,
            rollNumber
        } = req.query;
        const attendance = await Attendance.findOne({
            facultyId,
            date,
            hour,
            "students.rollNumber": rollNumber
        });
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance not found"
            });
        }
        const student = attendance.students.find(
            student => student.rollNumber === rollNumber
        );
        res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch student attendance",
            error: error.message
        });
    }
};
// ================= UPDATE STUDENT ATTENDANCE =================
exports.updateStudentAttendance = async (req, res) => {
    try {
        const {
            facultyId,
            date,
            hour,
            rollNumber,
            status
        } = req.body;
        const attendance = await Attendance.findOne({
            facultyId,
            date,
            hour
        });
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance not found"
            });
        }
        const student = attendance.students.find(
            student => student.rollNumber === rollNumber
        );
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        // Update Status
        student.status = status;
        // Recalculate Counts
        attendance.presentCount = attendance.students.filter(
            student => student.status === "P"
        ).length;
        attendance.absentCount = attendance.students.filter(
            student => student.status === "A"
        ).length;
        attendance.totalStudents = attendance.students.length;
        await attendance.save();
        res.status(200).json({
            success: true,
            message: "Student Attendance Updated Successfully",
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update attendance",
            error: error.message
        });
    }
};
// ================= DELETE ATTENDANCE =================
exports.deleteAttendance = async (req, res) => {
    try {
        const {
            facultyId,
            date,
            hour
        } = req.body;
        const attendance = await Attendance.findOneAndDelete({
            facultyId,
            date,
            hour
        });
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Attendance Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete attendance",
            error: error.message
        });
    }
};