import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router";

import {
    registerUser
} from "../../api/auth.api.js";


const Register = () => {

    const navigate =
        useNavigate();


    const [
        formData,
        setFormData
    ] = useState({

        name: "",
        email: "",
        password: "",
        confirmPassword: ""

    });


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        success,
        setSuccess
    ] = useState("");


    const handleChange = (
        event
    ) => {

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
        setSuccess("");
    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            setError(
                "Please fill in all fields."
            );

            return;
        }


        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        if (
            formData.password.length < 6
        ) {

            setError(
                "Password must be at least 6 characters."
            );

            return;
        }


        try {

            setLoading(true);


            await registerUser({

                name:
                    formData.name.trim(),

                email:
                    formData.email.trim(),

                password:
                    formData.password

            });


            setSuccess(
                "Account created successfully. Redirecting to login..."
            );


            setTimeout(
                () => {

                    navigate(
                        "/login",
                        {
                            replace: true
                        }
                    );

                },
                1000
            );


        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
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
                        Create your account
                    </p>

                </div>


                {/* Card */}

                <div className="bg-white border rounded-2xl shadow-sm p-8">

                    <h2 className="text-xl font-semibold">
                        Create account
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Get started with TalentMatch AI
                    </p>


                    {/* Error */}

                    {error && (

                        <div className="mt-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>

                    )}


                    {/* Success */}

                    {success && (

                        <div className="mt-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                            {success}
                        </div>

                    )}


                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="mt-6 space-y-5"
                    >

                        {/* Name */}

                        <div>

                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Your name"
                                autoComplete="name"
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                            />

                        </div>


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
                                placeholder="Create a password"
                                autoComplete="new-password"
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                            />

                        </div>


                        {/* Confirm Password */}

                        <div>

                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Confirm your password"
                                autoComplete="new-password"
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
                                ? "Creating account..."
                                : "Create Account"}

                        </button>

                    </form>


                    {/* Login */}

                    <p className="mt-6 text-center text-sm text-gray-600">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-medium text-black hover:underline"
                        >
                            Sign in
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
};


export default Register;