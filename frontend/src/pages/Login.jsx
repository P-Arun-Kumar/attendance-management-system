import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );
            // Store Token
            localStorage.setItem(
                "token",
                response.data.token
            );
            // Store Role
            localStorage.setItem(
                "role",
                response.data.user.role
            );
            alert("Login Successful");
            console.log(response.data);
            // Role Based Redirect
            const role = response.data.user.role;
            if (role === "FACULTY") {
                navigate("/faculty-dashboard");
            }
            else if (role === "ADMIN") {
                navigate("/admin-dashboard");
            }
        }
        catch (error) {
            console.log(error.response.data);
            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };
    return (
        <div>
            <h2>Login Page</h2>
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}
export default Login;