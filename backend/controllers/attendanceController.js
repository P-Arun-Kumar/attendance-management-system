const Attendance = require("../models/Attendance");
// ================= MARK ATTENDANCE =================
exports.markAttendance = async (req, res) => {
    try {
        const {
            subjectCode,
            topicCovered,
            department,
            year,
            semester,
            section,
            date,
            hour,
            students
        } = req.body;
        // 🔥 FacultyId comes from token (NOT request body)
        const facultyId = req.user.facultyId;
        const totalStudents = students.length;
        const presentCount = students.filter(s => s.status === "P").length;
        const absentCount = students.filter(s => s.status === "A").length;
        const attendance = await Attendance.create({
            facultyId,
            subjectCode,
            topicCovered,
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
        let attendance;
        if (req.user.role === "ADMIN") {
            // ADMIN → all data
            attendance = await Attendance.find();
        } else {
            // FACULTY → own data only
            attendance = await Attendance.find({
                facultyId: req.user.facultyId
            });
        }
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
// ================= GET ATTENDANCE (SINGLE CLASS) =================
exports.getAttendance = async (req, res) => {
    try {
        const { facultyId: queryFacultyId, date, hour } = req.query;
        const facultyId =
            req.user.role === "ADMIN"
                ? queryFacultyId
                : req.user.facultyId;
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
        const { facultyId: queryFacultyId, date, hour, rollNumber } = req.query;

        const facultyId =
            req.user.role === "ADMIN"
                ? queryFacultyId
                : req.user.facultyId;

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
            s => s.rollNumber === rollNumber
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
            facultyId: bodyFacultyId,
            date,
            hour,
            rollNumber,
            status
        } = req.body;
        const facultyId =
            req.user.role === "ADMIN"
                ? bodyFacultyId
                : req.user.facultyId;
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
            s => s.rollNumber === rollNumber
        );
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        student.status = status;
        // Recalculate counts
        attendance.presentCount = attendance.students.filter(s => s.status === "P").length;
        attendance.absentCount = attendance.students.filter(s => s.status === "A").length;
        attendance.totalStudents = attendance.students.length;
        await attendance.save();
        res.status(200).json({
            success: true,
            message: "Student attendance updated successfully",
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
        const { facultyId: bodyFacultyId, date, hour } = req.body;

        const facultyId =
            req.user.role === "ADMIN"
                ? bodyFacultyId
                : req.user.facultyId;
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
            message: "Attendance deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete attendance",
            error: error.message
        });
    }
};