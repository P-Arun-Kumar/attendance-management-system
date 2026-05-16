const express = require("express");
const router = express.Router();
const {
    addSubjects,
    getSubjects,
    getSubjectByCode,
    updateSubject,
    deleteSubject
} = require("../controllers/subjectController");
// CREATE (single + bulk)
router.post("/", addSubjects);
// READ
router.get("/", getSubjects);
router.get("/:subjectCode", getSubjectByCode);
// UPDATE
router.put("/:subjectCode", updateSubject);
// DELETE
router.delete("/:subjectCode", deleteSubject);
module.exports = router;