const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");

const {
    assignSubject,
    getMyAssignments
} = require("../controllers/assignmentController");

// ADMIN assigns subject to faculty
router.post(
    "/",
    protect,
    authorizeRole("ADMIN"),
    assignSubject
);

// FACULTY sees their assigned subjects
router.get(
    "/",
    protect,
    authorizeRole("FACULTY", "ADMIN"),
    getMyAssignments
);

module.exports = router;