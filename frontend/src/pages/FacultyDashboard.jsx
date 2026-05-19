import { useNavigate } from "react-router-dom";
function FacultyDashboard() {
    const navigate = useNavigate();
    return (
        <div style={{ padding: "20px" }}>
            <h1>Faculty Dashboard</h1>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button onClick={() => navigate("/mark-attendance")}>
                    Mark Attendance
                </button>
                <button onClick={() => navigate("/students")}>
                    Students
                </button>
                <button onClick={() => navigate("/subjects")}>
                    Subjects
                </button>
                <button onClick={() => navigate("/attendance-history")}>
                    Attendance History
                </button>
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
export default FacultyDashboard;