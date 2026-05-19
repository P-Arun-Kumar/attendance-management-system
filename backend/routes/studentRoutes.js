const express = require("express");
const router = express.Router();
const {
    addStudents,
    getStudents,
    getStudentByRollNumber,
    updateStudentByRollNumber,
    deleteStudentByRollNumber
} = require("../controllers/studentController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");
// ================= ROUTES =================
// Add Students (FACULTY + ADMIN)
router.post(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    addStudents
);
// Get All Students (FACULTY + ADMIN)
router.get(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getStudents
);
// Get Student by Roll Number
router.get(
    "/:rollNumber",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getStudentByRollNumber
);
// Update Student
router.put(
    "/:rollNumber",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    updateStudentByRollNumber
);
// Delete Student (ADMIN only recommended)
router.delete(
    "/:rollNumber",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    deleteStudentByRollNumber
);
module.exports = router;