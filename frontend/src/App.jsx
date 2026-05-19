import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentAdd from "./pages/StudentAdd";
import StudentList from "./pages/StudentList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<StudentAdd />} />
        {/* Faculty Protected Route */}
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        {/* Admin Protected Route */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;