const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
dotenv.config();
const app = express();
// Database Connection
connectDB();
// ================= MIDDLEWARES =================
// Allows frontend/backend communication
app.use(cors());
// Allows JSON data from frontend/Postman
app.use(express.json());
// ================= ROUTES =================
// Student Routes
app.use("/api/students", studentRoutes);
// Faculty Routes
app.use("/api/faculty", facultyRoutes);
// Subject Routes
app.use("/api/subjects", subjectRoutes);
// Attendance Routes
app.use("/api/attendance", attendanceRoutes);
// Auth Routes
app.use("/api/auth", authRoutes);
// Faculty Assignment Routes
app.use("/api/assignments", assignmentRoutes);
// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});
// ================= SERVER =================
const PORT = process.env.PORT || 5000;
const errorHandler = require("./middlewares/errorMiddleware");
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});