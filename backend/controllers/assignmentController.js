const FacultyAssignment = require("../models/FacultyAssignment");

// ================= ASSIGN SUBJECT (ADMIN) =================
exports.assignSubject = async (req, res) => {

    try {

        const {
            facultyId,
            subjectCode,
            department,
            year,
            semester,
            section
        } = req.body;

        const assignment =
            await FacultyAssignment.create({

                facultyId,
                subjectCode,
                department,
                year,
                semester,
                section

            });

        res.status(201).json({

            success: true,
            message:
                "Subject assigned successfully",

            assignment

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,
            message:
                "Error assigning subject",

            error: error.message

        });

    }
};

// ================= GET MY ASSIGNMENTS =================
exports.getMyAssignments = async (req, res) => {

    try {

        let assignments;

        // ADMIN → ALL ASSIGNMENTS
        if (req.user.role === "ADMIN") {

            assignments =
                await FacultyAssignment.find();

        }

        // FACULTY → OWN ASSIGNMENTS
        else {

            assignments =
                await FacultyAssignment.find({

                    facultyId:
                        req.user.facultyId

                });

        }

        res.status(200).json({

            success: true,
            count: assignments.length,
            assignments

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,
            message:
                "Error fetching assignments",

            error: error.message

        });

    }
};