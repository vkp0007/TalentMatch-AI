import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router";

import {
    Eye,
    EyeOff,
    Sparkles,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

import {
    loginUser
} from "../../api/auth.api.js";

import {
    useAuth
} from "../../context/AuthContext.jsx";


const Login = () => {

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
        showPassword,
        setShowPassword
    ] = useState(false);


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const handleChange = event => {

        const {
            name,
            value
        } = event.target;


        setFormData(current => ({
            ...current,
            [name]: value
        }));


        setError("");
    };


    const handleSubmit = async event => {

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

        <div className="
            min-h-screen
            bg-[#F7F3EA]
            flex
            items-center
            justify-center
            p-4
        ">

            <div className="
                w-full
                max-w-5xl
                grid
                lg:grid-cols-2
                bg-white
                rounded-3xl
                border
                border-[#E8E2D7]
                shadow-xl
                overflow-hidden
            ">


                {/* =================================================
                    LEFT — BRAND PANEL
                ================================================= */}

                <div className="
                    hidden
                    lg:flex
                    relative
                    flex-col
                    justify-between
                    bg-gray-950
                    text-white
                    p-10
                    overflow-hidden
                ">

                    {/* Decorative elements */}

                    <div className="
                        absolute
                        -top-24
                        -right-24
                        w-72
                        h-72
                        rounded-full
                        bg-white/5
                    " />

                    <div className="
                        absolute
                        -bottom-32
                        -left-20
                        w-80
                        h-80
                        rounded-full
                        bg-white/5
                    " />


                    {/* Brand */}

                    <div className="relative">

                        <div className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            text-xs
                            text-gray-300
                        ">

                            <Sparkles
                                size={13}
                            />

                            AI-powered career workspace

                        </div>


                        <h1 className="
                            mt-8
                            text-4xl
                            font-semibold
                            tracking-tight
                            leading-tight
                        ">

                            Turn your resume
                            <br />

                            into your
                            <span className="text-gray-400">
                                {" "}career advantage.
                            </span>

                        </h1>


                        <p className="
                            mt-5
                            max-w-md
                            text-sm
                            leading-6
                            text-gray-400
                        ">

                            Analyze opportunities, improve
                            your applications, and prepare
                            smarter with AI.

                        </p>

                    </div>


                    {/* Features */}

                    <div className="
                        relative
                        space-y-3
                    ">

                        {[
                            "AI-powered resume analysis",
                            "Personalized application recommendations",
                            "Referral and application email assistance"
                        ].map(feature => (

                            <div
                                key={feature}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-sm
                                    text-gray-300
                                "
                            >

                                <CheckCircle2
                                    size={17}
                                    className="text-gray-400"
                                />

                                {feature}

                            </div>

                        ))}

                    </div>


                    {/* Footer */}

                    <p className="
                        relative
                        text-xs
                        text-gray-500
                    ">
                        TalentMatch AI
                    </p>

                </div>


                {/* =================================================
                    RIGHT — LOGIN
                ================================================= */}

                <div className="
                    p-6
                    sm:p-8
                    lg:p-10
                    flex
                    items-center
                ">

                    <div className="
                        w-full
                        max-w-md
                        mx-auto
                    ">


                        {/* Brand mobile */}

                        <div className="
                            lg:hidden
                            mb-8
                        ">

                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-gray-900
                            ">

                                <div className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    bg-gray-900
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <Sparkles
                                        size={15}
                                    />

                                </div>

                                TalentMatch AI

                            </div>

                        </div>


                        {/* Heading */}

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-wider
                                text-gray-400
                            ">
                                Welcome back
                            </p>


                            <h2 className="
                                mt-2
                                text-3xl
                                font-semibold
                                tracking-tight
                                text-gray-900
                            ">
                                Sign in to continue
                            </h2>


                            <p className="
                                mt-2
                                text-sm
                                text-gray-500
                            ">
                                Your career workspace is waiting.
                            </p>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="
                                mt-6
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                text-red-700
                            ">
                                {error}
                            </div>

                        )}


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="
                                mt-7
                                space-y-5
                            "
                        >


                            {/* Email */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-800
                                        mb-2
                                    "
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
                                    className="
                                        w-full
                                        h-11
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        px-3.5
                                        text-sm
                                        text-gray-900
                                        outline-none
                                        transition
                                        focus:bg-white
                                        focus:border-gray-400
                                        focus:ring-4
                                        focus:ring-gray-100
                                        disabled:opacity-50
                                    "
                                />

                            </div>


                            {/* Password */}

                            <div>

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    mb-2
                                ">

                                    <label
                                        htmlFor="password"
                                        className="
                                            text-sm
                                            font-medium
                                            text-gray-800
                                        "
                                    >
                                        Password
                                    </label>

                                </div>


                                <div className="
                                    relative
                                ">

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            formData.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        disabled={loading}
                                        className="
                                            w-full
                                            h-11
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            pl-3.5
                                            pr-11
                                            text-sm
                                            text-gray-900
                                            outline-none
                                            transition
                                            focus:bg-white
                                            focus:border-gray-400
                                            focus:ring-4
                                            focus:ring-gray-100
                                            disabled:opacity-50
                                        "
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                current =>
                                                    !current
                                            )
                                        }
                                        tabIndex={-1}
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                            hover:text-gray-700
                                            transition
                                        "
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full
                                    h-11
                                    rounded-xl
                                    bg-gray-900
                                    text-white
                                    text-sm
                                    font-medium
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    hover:bg-gray-800
                                    active:bg-gray-950
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >

                                {loading
                                    ? "Signing in..."
                                    : "Sign In"
                                }


                                {!loading && (

                                    <ArrowRight
                                        size={16}
                                    />

                                )}

                            </button>

                        </form>


                        {/* Register */}

                        <p className="
                            mt-7
                            text-center
                            text-sm
                            text-gray-500
                        ">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="
                                    font-medium
                                    text-gray-900
                                    hover:underline
                                "
                            >
                                Create one
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default Login;