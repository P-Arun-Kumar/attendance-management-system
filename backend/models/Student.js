const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
    },
    academicYear: {
        type: String,
        required: true,
        trim: true
    },
    batchDuration: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Student", studentSchema);