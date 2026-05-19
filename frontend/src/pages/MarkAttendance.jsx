import { useEffect, useState } from "react";
import API from "../services/api";
function MarkAttendance() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        subjectCode: "",
        department: "",
        year: "",
        semester: "",
        section: "",
        date: "",
        hour: "",
        topicCovered: {
            unit: "",
            topic: ""
        }
    });
    // Load students based on class
    const loadStudents = async () => {
        try {
            const res = await API.get("/students");
            setStudents(res.data.students);
        } catch (err) {
            console.log(err.response?.data);
        }
    };
    // Handle attendance change
    const handleStatusChange = (rollNumber, status) => {
        setStudents(prev =>
            prev.map(s =>
                s.rollNumber === rollNumber
                    ? { ...s, status }
                    : s
            )
        );
    };
    // Submit attendance
    const submitAttendance = async () => {
        try {
            const payload = {
                ...form,
                students: students.map(s => ({
                    rollNumber: s.rollNumber,
                    status: s.status || "P"
                }))
            };
            const res = await API.post("/attendance", payload);
            alert("Attendance Saved Successfully");
            console.log(res.data);
        } catch (err) {
            console.log(err.response?.data);
            alert("Error saving attendance");
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h2>Mark Attendance</h2>
            {/* CLASS DETAILS */}
            <div>
                <input placeholder="Subject Code"
                    onChange={(e) =>
                        setForm({ ...form, subjectCode: e.target.value })
                    }
                />
                <input placeholder="Department"
                    onChange={(e) =>
                        setForm({ ...form, department: e.target.value })
                    }
                />
                <input placeholder="Year"
                    onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                    }
                />
                <input placeholder="Semester"
                    onChange={(e) =>
                        setForm({ ...form, semester: e.target.value })
                    }
                />
                <input placeholder="Section"
                    onChange={(e) =>
                        setForm({ ...form, section: e.target.value })
                    }
                />
                <input type="date"
                    onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                    }
                />
                <input placeholder="Hour"
                    onChange={(e) =>
                        setForm({ ...form, hour: e.target.value })
                    }
                />
                <hr />
                {/* TOPIC COVERED */}
                <input placeholder="Unit"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            topicCovered: {
                                ...form.topicCovered,
                                unit: e.target.value
                            }
                        })
                    }
                />
                <input placeholder="Topic Covered"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            topicCovered: {
                                ...form.topicCovered,
                                topic: e.target.value
                            }
                        })
                    }
                />
                <hr />
                <button onClick={loadStudents}>
                    Load Students
                </button>
            </div>
            {/* STUDENT TABLE */}
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s, index) => (
                        <tr key={index}>
                            <td>{s.name}</td>
                            <td>{s.rollNumber}</td>
                            <td>
                                <select
                                    onChange={(e) =>
                                        handleStatusChange(
                                            s.rollNumber,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="P">Present</option>
                                    <option value="A">Absent</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button onClick={submitAttendance}>
                Submit Attendance
            </button>
        </div>
    );
}
export default MarkAttendance;