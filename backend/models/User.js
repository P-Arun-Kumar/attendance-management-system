const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    facultyId: {
        type: String,
        required: function () {
            return this.role === "FACULTY";
        }
    },
    role: {
        type: String,
        enum: ["FACULTY", "ADMIN"],
        default: "FACULTY"
    }
},
{
    timestamps: true
}
);
// ================= HASH PASSWORD =================
userSchema.pre("save", async function () {
    // only hash if password modified
    if (!this.isModified("password")) {
        return;
    }
    // hash password
    this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);