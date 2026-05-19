import { useEffect, useState } from "react";
import API from "../services/api";
function StudentList() {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    // Fetch students
    const fetchStudents = async () => {
        try {
            const response = await API.get("/students");
            setStudents(response.data.students);
        } catch (error) {
            console.log(error.response?.data);
        }
    };
    useEffect(() => {
        fetchStudents();
    }, []);
    // Delete student
    const deleteStudent = async (rollNumber) => {
        try {
            await API.delete(`/students/${rollNumber}`);
            alert("Student Deleted Successfully");
            fetchStudents();
        } catch (error) {
            console.log(error.response?.data);
        }
    };
    // Start Edit
    const startEdit = (student) => {
        setEditingStudent(student);
    };
    // Handle edit change
    const handleEditChange = (e) => {
        setEditingStudent({
            ...editingStudent,
            [e.target.name]: e.target.value
        });
    };
    // Update student
    const updateStudent = async () => {
        try {
            await API.put(
                `/students/${editingStudent.rollNumber}`,
                editingStudent
            );
            alert("Student Updated Successfully");

            setEditingStudent(null);
            fetchStudents();
        } catch (error) {
            console.log(error.response?.data);
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h2>Student List</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Section</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.department}</td>
                            <td>{student.year}</td>
                            <td>{student.section}</td>
                            <td>
                                <button onClick={() => startEdit(student)}>
                                    Edit
                                </button>
                                <button onClick={() => deleteStudent(student.rollNumber)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* EDIT FORM */}
            {editingStudent && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Edit Student</h3>
                    <input
                        name="name"
                        value={editingStudent.name}
                        onChange={handleEditChange}
                    />
                    <br /><br />
                    <input
                        name="department"
                        value={editingStudent.department}
                        onChange={handleEditChange}
                    />
                    <br /><br />
                    <input
                        name="year"
                        value={editingStudent.year}
                        onChange={handleEditChange}
                    />
                    <br /><br />
                    <input
                        name="section"
                        value={editingStudent.section}
                        onChange={handleEditChange}
                    />
                    <br /><br />
                    <button onClick={updateStudent}>
                        Update
                    </button>
                    <button onClick={() => setEditingStudent(null)}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
export default StudentList;