const express = require("express");
const router = express.Router();
const {
    markAttendance,
    getAllAttendance,
    getAttendance,
    getStudentAttendance,
    updateStudentAttendance,
    deleteAttendance
} = require("../controllers/attendanceController")
// ================= ROUTES =================
// Mark Attendance
router.post("/", markAttendance);
// Get All Attendance
router.get("/", getAllAttendance);
// Get Attendance
// facultyId + date + hour
router.get("/single", getAttendance);
// Get Single Student Attendance
router.get("/student", getStudentAttendance);
// Update Student Attendance
router.put("/", updateStudentAttendance);
// Delete Attendance
router.delete("/", deleteAttendance);
module.exports = router;