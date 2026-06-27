import { useEffect, useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    EnvelopeIcon
} from "@heroicons/react/24/outline";

import api from "../services/api";

import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";

function Login() {

    const navigate = useNavigate();

    

    const [password, setPassword] =
        useState("");

    const savedEmail = localStorage.getItem("rememberEmail") || "";

const [email, setEmail] = useState(savedEmail);

const [rememberMe, setRememberMe] = useState(
    savedEmail !== ""
);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        const role =
            localStorage.getItem("role");

        

        if (token) {

            if (role === "admin") {

                navigate("/admin");

            }

            else {

                navigate("/student");

            }

        }

    }, [navigate]);

    const handleLogin = async () => {

        if (
            !email.trim() ||
            !password.trim()
        ) {

            setError(
                "Please fill all fields."
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

            if (rememberMe) {

                localStorage.setItem(
                    "rememberEmail",
                    email
                );

            }

            if (
                response.data.role ===
                "admin"
            ) {

                navigate("/admin");

            }

            else {

                navigate("/student");

            }

        }

        catch (error) {

            setError(

                error.response?.data?.message ||

                "Invalid Email or Password"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-br
                from-blue-700
                via-indigo-700
                to-purple-700
                flex
                justify-center
                items-center
                p-6
            "
        >

            <AuthCard

                title="Welcome Back 👋"

                subtitle="Login to continue using HostelConnect"

            >

                {

                    error && (

                        <div
                            className="
                                bg-red-100
                                border
                                border-red-300
                                text-red-700
                                rounded-xl
                                p-3
                                mb-5
                                text-sm
                            "
                        >

                            {error}

                        </div>

                    )

                }

                <AuthInput

                    label="Email"

                    type="email"

                    value={email}

                    placeholder="Enter your email"

                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }

                    icon={
                        <EnvelopeIcon
                            className="w-5 h-5"
                        />
                    }

                />

                <PasswordInput

                    value={password}

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }

                    placeholder="Enter Password"

                />

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        mb-6
                    "
                >

                    <label
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-gray-600
                        "
                    >

                        <input

                            type="checkbox"

                            checked={rememberMe}

                            onChange={() =>
                                setRememberMe(
                                    !rememberMe
                                )
                            }

                            className="
                                accent-blue-600
                            "
                        />

                        Remember Me

                    </label>

                                        <Link
                        to="/register"
                        className="
                            text-sm
                            text-blue-600
                            hover:text-blue-800
                            font-medium
                        "
                    >
                        Create Account
                    </Link>

                </div>

                <button

                    onClick={handleLogin}

                    disabled={loading}

                    className="
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        disabled:bg-gray-400
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all
                        duration-200
                        shadow-lg
                        hover:shadow-xl
                        hover:-translate-y-0.5
                    "
                >

                    {

                        loading

                            ? "Logging In..."

                            : "Login"

                    }

                </button>

                <div
                    className="
                        mt-8
                        text-center
                        text-sm
                        text-gray-600
                    "
                >

                    Don't have an account?

                    <Link

                        to="/register"

                        className="
                            ml-2
                            font-semibold
                            text-blue-600
                            hover:text-blue-800
                        "
                    >

                        Register

                    </Link>

                </div>

            </AuthCard>

        </div>

    );

}

export default Login;