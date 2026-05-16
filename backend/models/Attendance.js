const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
    {
        facultyId: {
            type: String,
            required: true,
            trim: true
        },
        subjectCode: {
            type: String,
            required: true,
            trim: true
        },
        department: {
            type: String,
            required: true,
            trim: true
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
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        hour: {
            type: Number,
            required: true
        },
        totalStudents: {
            type: Number,
            default: 0
        },
        presentCount: {
            type: Number,
            default: 0
        },
        absentCount: {
            type: Number,
            default: 0
        },
        students: [
            {
                rollNumber: {
                    type: String,
                    required: true,
                    trim: true
                },
                status: {
                    type: String,
                    enum: ["P", "A"],
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);
// 🚫 Duplicate Attendance Protection
attendanceSchema.index(
    {
        facultyId: 1,
        date: 1,
        hour: 1,
        subjectCode: 1,
        section: 1
    },
    {
        unique: true
    }
);
module.exports = mongoose.model("Attendance", attendanceSchema);