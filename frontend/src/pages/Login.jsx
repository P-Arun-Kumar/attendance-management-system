import { useState } from "react";
import API from "../services/api";
function Login() {
    const handleLogin = async () => {
        try {
            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );
            console.log(response.data);

        }
        catch (error) {
            console.log(error.response.data);

        }
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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