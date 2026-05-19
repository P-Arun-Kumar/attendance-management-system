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
// MARK ATTENDANCE
// FACULTY + ADMIN
router.post(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    markAttendance
);
// GET ALL ATTENDANCE
// FACULTY -> own data
// ADMIN -> all data
router.get(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getAllAttendance
);
// GET SINGLE ATTENDANCE
// FACULTY + ADMIN
router.get(
    "/single",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getAttendance
);
// GET SINGLE STUDENT ATTENDANCE
// FACULTY + ADMIN
router.get(
    "/student",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getStudentAttendance
);
// UPDATE ATTENDANCE
// FACULTY + ADMIN
router.put(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    updateStudentAttendance
);
// DELETE ATTENDANCE
// ADMIN ONLY
router.delete(
    "/",
    protect,
    authorizeRole("ADMIN"),
    deleteAttendance
);
module.exports = router;