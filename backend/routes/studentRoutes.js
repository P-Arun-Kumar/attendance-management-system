const express = require("express");
const router = express.Router();
const {
    addStudents,
    getStudents,
    getStudentByRollNumber,
    updateStudentByRollNumber,
    deleteStudentByRollNumber
} = require("../controllers/studentController");
// ================= ROUTES =================
// Add Students
router.post("/", addStudents);
// Get All Students
router.get("/", getStudents);
// Get Single Student by Roll Number
router.get("/:rollNumber", getStudentByRollNumber);
// Update Student by Roll Number
router.put("/:rollNumber", updateStudentByRollNumber);
// Delete Student by Roll Number
router.delete("/:rollNumber", deleteStudentByRollNumber);
module.exports = router;