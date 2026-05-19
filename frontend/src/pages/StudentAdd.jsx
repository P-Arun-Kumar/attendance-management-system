import { useState } from "react";
import API from "../services/api";
function StudentAdd() {
    const [form, setForm] = useState({
        name: "",
        rollNumber: "",
        department: "",
        year: "",
        semester: "",
        section: "",
        academicYear: "",
        batchDuration: ""
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/students", [form]); // bulk format (your backend uses insertMany)
            console.log(response.data);
            alert("Student Added Successfully");
            // reset form
            setForm({
                name: "",
                rollNumber: "",
                department: "",
                year: "",
                semester: "",
                section: "",
                academicYear: "",
                batchDuration: ""
            });
        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Error adding student");
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={form.rollNumber}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    name="year"
                    placeholder="Year"
                    value={form.year}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    name="semester"
                    placeholder="Semester"
                    value={form.semester}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    name="section"
                    placeholder="Section"
                    value={form.section}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    name="academicYear"
                    placeholder="Academic Year"
                    value={form.academicYear}
                    onChange={handleChange}
                />
                <br /><br />
                <input
                    name="batchDuration"
                    placeholder="Batch Duration"
                    value={form.batchDuration}
                    onChange={handleChange}
                />
                <br /><br />
                <button type="submit">
                    Add Student
                </button>
            </form>
        </div>
    );
}
export default StudentAdd;