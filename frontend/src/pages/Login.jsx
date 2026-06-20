import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    if (token) {

        if (role === "admin") {

            navigate("/admin");

        } else {

            navigate("/student");

        }

    }

}, [navigate]);

    // Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Event Handler
const handleLogin = async () => {

        if (

    !email.trim() ||

    !password.trim()

) {

    setError(
        "Email and Password are required."
    );

    return;

}

    try {

        setLoading(true);

        setError("");

        const response =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

        

localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "role",
    response.data.role
);

         if (
    response.data.role === "admin"
) {

    navigate("/admin");

} else {

    navigate("/student");

}



    } catch (error) {

        setError(
            error.response?.data?.message ||
            "Login Failed"
        );

    } finally {

        setLoading(false);

    }

};



    return (

        <div className="p-10">

            <h1 className="text-2xl font-bold">
                Login
            </h1>

            <br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                className="border p-2"
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="border p-2"
            />

            <br />
            <br />

            <button
                onClick={handleLogin}
                className="border p-2"
            >
                Login
            </button>

            <br />
            <br />

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

        </div>

    );

}

export default Login;