const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    regulation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    batchDuration: {
        type: String,
        required: true
    },
    units: [
        {
            unit: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            topics: [
                {
                    type: String
                }
            ]
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Subject", subjectSchema);