const mongoose = require("mongoose");
const facultyAssignmentSchema = new mongoose.Schema(
    {
        facultyId: {
            type: String,
            required: true,
            trim: true
        },
        subjectCode: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        semester: {
            type: Number,
            required: true
        },
        section: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model(
    "FacultyAssignment",
    facultyAssignmentSchema
);