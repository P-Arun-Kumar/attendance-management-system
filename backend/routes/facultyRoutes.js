const express = require("express");
const router = express.Router();
const {
    addFaculty,
    getFaculty,
    getFacultyById,
    updateFaculty,
    deleteFaculty
} = require("../controllers/facultyController");
// CREATE
router.post("/", addFaculty);
// READ ALL
router.get("/", getFaculty);
// READ ONE
router.get("/:facultyId", getFacultyById);
// UPDATE
router.put("/:facultyId", updateFaculty);
// DELETE
router.delete("/:facultyId", deleteFaculty);
module.exports = router;