import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { loginUser } from "../../api/auth.api.js";
import { useAuth } from "../../context/AuthContext.jsx";


const Login = () => {

    const navigate = useNavigate();

    const {
        login
    } = useAuth();


    const [
        formData,
        setFormData
    ] = useState({
        email: "",
        password: ""
    });


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (current) => ({
                ...current,
                [name]: value
            })
        );

        setError("");
    };


const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    if (
        !formData.email.trim() ||
        !formData.password
    ) {

        setError(
            "Please enter your email and password."
        );

        return;
    }


    try {

        setLoading(true);


        const response =
            await loginUser(
                formData
            );


        const data =
            response?.data;


        if (
            !data?.token ||
            !data?.user
        ) {

            throw new Error(
                "Invalid login response."
            );
        }


        login(data);


        navigate(
            "/dashboard",
            {
                replace: true
            }
        );


    } catch (error) {

        console.error(
            "Login failed:",
            error
        );


        setError(
            error.response?.data?.message ||
            error.message ||
            "Login failed. Please try again."
        );

    } finally {

        setLoading(false);
    }
};

    return (

        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* Brand */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold">
                        TalentMatch AI
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Sign in to continue
                    </p>

                </div>


                {/* Card */}

                <div className="bg-white border rounded-2xl shadow-sm p-8">

                    <h2 className="text-xl font-semibold">
                        Welcome back
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Sign in to your account
                    </p>


                    {/* Error */}

                    {error && (

                        <div className="mt-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="mt-6 space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="you@example.com"
                                autoComplete="email"
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                            />

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {loading
                                ? "Signing in..."
                                : "Sign In"}

                        </button>

                    </form>


                    {/* Register */}

                    <p className="mt-6 text-center text-sm text-gray-600">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-medium text-black hover:underline"
                        >
                            Create one
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
};


export default Login;