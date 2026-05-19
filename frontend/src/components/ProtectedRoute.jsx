import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // 1. If no token → send to login
    if (!token) {
        return <Navigate to="/" />;
    }
    // 2. If role not allowed → block access
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <h2>Access Denied</h2>;
    }
    // 3. If everything OK → allow page
    return children;
}
export default ProtectedRoute;