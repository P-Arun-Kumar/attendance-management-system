const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
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
// router.post("/", markAttendance);
router.post("/", protect, markAttendance);
// Get All Attendance
router.get("/", protect, getAllAttendance);
// Get Attendance
// facultyId + date + hour
router.get("/single", protect, getAttendance);
// Get Single Student Attendance
router.get("/student", protect, getStudentAttendance);
// Update Student Attendance
router.put("/", protect, updateStudentAttendance);
// Delete Attendance
router.delete("/", protect, deleteAttendance);
module.exports = router;