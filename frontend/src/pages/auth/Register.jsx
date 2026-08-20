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
        showPassword,
        setShowPassword
    ] = useState(false);


    const [
        showConfirmPassword,
        setShowConfirmPassword
    ] = useState(false);


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
        setSuccess("");
    };


    const passwordLength =
        formData.password.length;


    const passwordStrength =
        passwordLength === 0
            ? 0
            : passwordLength < 6
                ? 1
                : passwordLength < 10
                    ? 2
                    : 3;


    const strengthLabel = {
        0: "",
        1: "Weak",
        2: "Good",
        3: "Strong"
    };


    const handleSubmit = async event => {

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


    const passwordInputClass = `
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
    `;


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
                    LEFT — BRAND
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

                            Build your next opportunity

                        </div>


                        <h1 className="
                            mt-8
                            text-4xl
                            font-semibold
                            tracking-tight
                            leading-tight
                        ">

                            Your resume.
                            <br />

                            Your opportunities.
                            <br />

                            <span className="text-gray-400">
                                One AI workspace.
                            </span>

                        </h1>


                        <p className="
                            mt-5
                            max-w-md
                            text-sm
                            leading-6
                            text-gray-400
                        ">

                            Create an account and bring
                            your resume, applications and
                            interview preparation together.

                        </p>

                    </div>


                    <div className="
                        relative
                        space-y-3
                    ">

                        {[
                            "Analyze your resume against jobs",
                            "Generate tailored application content",
                            "Prepare for interviews with AI"
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


                    <p className="
                        relative
                        text-xs
                        text-gray-500
                    ">
                        TalentMatch AI
                    </p>

                </div>


                {/* =================================================
                    RIGHT — REGISTER
                ================================================= */}

                <div className="
                    p-6
                    sm:p-8
                    lg:p-10
                ">

                    <div className="
                        w-full
                        max-w-md
                        mx-auto
                    ">


                        {/* Mobile brand */}

                        <div className="
                            lg:hidden
                            mb-7
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
                                Get started
                            </p>


                            <h2 className="
                                mt-2
                                text-3xl
                                font-semibold
                                tracking-tight
                                text-gray-900
                            ">
                                Create your account
                            </h2>


                            <p className="
                                mt-2
                                text-sm
                                text-gray-500
                            ">
                                Start building a smarter job search.
                            </p>

                        </div>


                        {/* Messages */}

                        {error && (

                            <div className="
                                mt-5
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


                        {success && (

                            <div className="
                                mt-5
                                rounded-xl
                                border
                                border-green-200
                                bg-green-50
                                px-4
                                py-3
                                text-sm
                                text-green-700
                            ">
                                {success}
                            </div>

                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="
                                mt-6
                                space-y-4
                            "
                        >


                            {/* Name */}

                            <div>

                                <label
                                    htmlFor="name"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-800
                                        mb-2
                                    "
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

                                <label
                                    htmlFor="password"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-800
                                        mb-2
                                    "
                                >
                                    Password
                                </label>


                                <div className="relative">

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
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        disabled={loading}
                                        className={
                                            passwordInputClass
                                        }
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
                                        "
                                    >

                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}

                                    </button>

                                </div>


                                {/* Password strength */}

                                {formData.password && (

                                    <div className="
                                        mt-2
                                    ">

                                        <div className="
                                            flex
                                            gap-1
                                        ">

                                            {[1, 2, 3].map(
                                                level => (

                                                    <div
                                                        key={level}
                                                        className={`
                                                            h-1
                                                            flex-1
                                                            rounded-full
                                                            ${
                                                                passwordStrength >= level
                                                                    ? "bg-gray-800"
                                                                    : "bg-gray-200"
                                                            }
                                                        `}
                                                    />

                                                )
                                            )}

                                        </div>


                                        <p className="
                                            mt-1
                                            text-[11px]
                                            text-gray-400
                                        ">
                                            {strengthLabel[
                                                passwordStrength
                                            ]}
                                        </p>

                                    </div>

                                )}

                            </div>


                            {/* Confirm Password */}

                            <div>

                                <label
                                    htmlFor="confirmPassword"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-800
                                        mb-2
                                    "
                                >
                                    Confirm Password
                                </label>


                                <div className="relative">

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                        disabled={loading}
                                        className={
                                            passwordInputClass
                                        }
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
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
                                        "
                                    >

                                        {showConfirmPassword ? (
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
                                    mt-2
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
                                    ? "Creating account..."
                                    : "Create Account"
                                }


                                {!loading && (

                                    <ArrowRight
                                        size={16}
                                    />

                                )}

                            </button>

                        </form>


                        {/* Login */}

                        <p className="
                            mt-6
                            text-center
                            text-sm
                            text-gray-500
                        ">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="
                                    font-medium
                                    text-gray-900
                                    hover:underline
                                "
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default Register;