import {

    useState

} from "react";

import {

    Link,
    useNavigate

} from "react-router";

import AuthLayout
from "../components/auth/AuthLayout";

import {

    loginUser

} from "../api/authApi";

import {

    useAuth

} from "../context/AuthContext";



const LoginPage = () => {

    const navigate =
        useNavigate();


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


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        setError("");


        try {

            setLoading(true);


            const response =
                await loginUser(
                    formData
                );


            login(response);

            navigate("/dashboard");

        } catch(error) {

            setError(

                error.response?.data
                    ?.message ||

                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };



    return (

        <AuthLayout

            title="Welcome Back"

            subtitle="Login to continue your AI resume analysis"

        >

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {

                error && (

                    <div
                        className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-2xl mb-6"
                    >
                        {error}
                    </div>
                )
            }


            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Email */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700 mb-3"
                    >
                        Email
                    </label>


                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="

                        w-full
                        bg-white
                        border
                        border-slate-300
                        focus:border-slate-900
                        outline-none
                        rounded-2xl
                        px-5
                        py-4
                        text-slate-900
                        placeholder:text-slate-400
                        transition-all
                        duration-300

                        "
                    />

                </div>


                {/* Password */}

                <div>

                    <label
                        className="block text-sm font-medium text-slate-700 mb-3"
                    >
                        Password
                    </label>


                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="

                        w-full
                        bg-white
                        border
                        border-slate-300
                        focus:border-slate-900
                        outline-none
                        rounded-2xl
                        px-5
                        py-4
                        text-slate-900
                        placeholder:text-slate-400
                        transition-all
                        duration-300

                        "
                    />

                </div>


                {/* Button */}

                <button
                    type="submit"
                    disabled={loading}
                    className="

                    w-full
                    bg-slate-900
                    hover:bg-slate-800
                    text-white
                    transition-all
                    duration-300
                    py-4
                    rounded-2xl
                    font-medium

                    "
                >

                    {

                        loading

                        ?

                        "Signing In..."

                        :

                        "Sign In"
                    }

                </button>

            </form>


            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <p
                className="text-slate-500 mt-8 text-center"
            >

                Don’t have an account?

                <Link
                    to="/register"
                    className="text-slate-900 ml-2 hover:text-slate-700 transition-colors font-medium"
                >
                    Register
                </Link>

            </p>

        </AuthLayout>
    );
};

export default LoginPage;