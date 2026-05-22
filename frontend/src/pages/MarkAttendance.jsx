import { useEffect, useState } from "react";
import API from "../services/api";

function MarkAttendance() {

    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);

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

    // LOAD FACULTY ASSIGNMENTS
    useEffect(() => {

        const fetchAssignments = async () => {
            try {
                const res =
                    await API.get("/assignments");

                console.log(
                    "ASSIGNMENTS RESPONSE:",
                    res.data
                );

                setAssignments(
                    res.data.assignments
                );
            }
            catch (err) {
                console.log(
                    err.response?.data
                );
            }
        };

        fetchAssignments();

    }, []);

    // SUBJECT SELECTION
    const handleAssignmentSelect = (e) => {

        const selected =
            assignments.find(
                a => a.subjectCode === e.target.value
            );

        if (!selected) return;

        setForm(prev => ({
            ...prev,
            subjectCode: selected.subjectCode,
            department: selected.department,
            year: selected.year,
            semester: selected.semester,
            section: selected.section
        }));
    };

    // LOAD STUDENTS
    const loadStudents = async () => {

        try {

            const res =
                await API.get("/students");

            const filteredStudents =
                res.data.students.filter(
                    s =>
                        s.department === form.department &&
                        s.year == form.year &&
                        s.semester == form.semester &&
                        s.section === form.section
                );

            setStudents(filteredStudents);

        }
        catch (err) {
            console.log(
                err.response?.data
            );
        }
    };

    // ATTENDANCE STATUS
    const handleStatusChange = (
        rollNumber,
        status
    ) => {

        setStudents(prev =>
            prev.map(s =>
                s.rollNumber === rollNumber
                    ? { ...s, status }
                    : s
            )
        );
    };

    // SUBMIT
    const submitAttendance = async () => {

        try {

            const payload = {

                ...form,

                students:
                    students.map(s => ({
                        rollNumber: s.rollNumber,
                        status: s.status || "P"
                    }))
            };

            const res =
                await API.post(
                    "/attendance",
                    payload
                );

            alert(
                "Attendance Saved Successfully"
            );

            console.log(res.data);

        }
        catch (err) {

            console.log(
                err.response?.data
            );

            alert(
                "Error saving attendance"
            );
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Mark Attendance</h2>

            {/* SUBJECT DROPDOWN */}

            <select
                onChange={handleAssignmentSelect}
            >

                <option>
                    Select Subject
                </option>

                {
                    assignments.map(
                        (a, index) => (

                            <option
                                key={index}
                                value={a.subjectCode}
                            >
                                {a.subjectCode}
                                {" - "}
                                {a.section}
                            </option>
                        )
                    )
                }

            </select>

            <br /><br />

            {/* AUTO FILLED DETAILS */}

            <input
                placeholder="Department"
                value={form.department}
                readOnly
            />

            <input
                placeholder="Year"
                value={form.year}
                readOnly
            />

            <input
                placeholder="Semester"
                value={form.semester}
                readOnly
            />

            <input
                placeholder="Section"
                value={form.section}
                readOnly
            />

            <br /><br />

            <input
                type="date"
                onChange={(e) =>
                    setForm({
                        ...form,
                        date: e.target.value
                    })
                }
            />

            <input
                placeholder="Hour"
                onChange={(e) =>
                    setForm({
                        ...form,
                        hour: e.target.value
                    })
                }
            />

            <hr />

            {/* TOPIC */}

            <input
                placeholder="Unit"
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

            <input
                placeholder="Topic Covered"
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

            <table
                border="1"
                cellPadding="10"
            >

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        students.map(
                            (s, index) => (

                                <tr key={index}>

                                    <td>
                                        {s.name}
                                    </td>

                                    <td>
                                        {s.rollNumber}
                                    </td>

                                    <td>

                                        <select
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    s.rollNumber,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="P">
                                                Present
                                            </option>

                                            <option value="A">
                                                Absent
                                            </option>

                                        </select>

                                    </td>

                                </tr>
                            )
                        )
                    }

                </tbody>

            </table>

            <br />

            <button
                onClick={submitAttendance}
            >
                Submit Attendance
            </button>

        </div>
    );
}

export default MarkAttendance;