const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");
const {
    markAttendance,
    getAllAttendance,
    getAttendance,
    getStudentAttendance,
    updateStudentAttendance,
    deleteAttendance
} = require("../controllers/attendanceController");
// ================= ROUTES =================
// Mark Attendance (FACULTY + ADMIN)
router.post(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    markAttendance
);
// Get All Attendance (ADMIN ONLY)
router.get(
    "/",
    protect,
    authorizeRole("ADMIN"),
    getAllAttendance
);
// Get Attendance (FACULTY + ADMIN)
router.get(
    "/single",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getAttendance
);
// Get Student Attendance (FACULTY + ADMIN)
router.get(
    "/student",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getStudentAttendance
);
// Update Attendance (FACULTY + ADMIN)
router.put(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    updateStudentAttendance
);
// Delete Attendance (ADMIN ONLY)
router.delete(
    "/",
    protect,
    authorizeRole("ADMIN"),
    deleteAttendance
);
module.exports = router;