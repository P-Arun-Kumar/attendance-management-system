import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import StudentAdd from "./pages/StudentAdd";
import StudentList from "./pages/StudentList";
import MarkAttendance from "./pages/MarkAttendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />

        {/* FACULTY PROTECTED ROUTES */}
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mark-attendance"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <MarkAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["FACULTY", "ADMIN"]}>
              <StudentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute allowedRoles={["FACULTY", "ADMIN"]}>
              <StudentAdd />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PROTECTED ROUTE */}
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