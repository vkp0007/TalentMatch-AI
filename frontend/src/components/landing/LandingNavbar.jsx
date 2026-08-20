import {
    Sparkles,
    ArrowRight
} from "lucide-react";

import {
    Link
} from "react-router";

import {
    useAuth
} from "../../context/AuthContext.jsx";


const LandingNavbar = () => {

    const { user } = useAuth();

    const actionPath =
        user
            ? "/analysis/new"
            : "/register";


    return (

        <header className="
            sticky
            top-0
            z-50
            border-b
            border-[#E8E2D7]/80
            bg-[#F7F3EA]/85
            backdrop-blur-xl
        ">

            <div className="
                max-w-7xl
                mx-auto
                h-16
                px-6
                flex
                items-center
                justify-between
            ">


                {/* =================================================
                    BRAND
                ================================================= */}

                <Link
                    to="/"
                    className="
                        group
                        flex
                        items-center
                        gap-2.5
                    "
                >

                    <div className="
                        relative
                        w-9
                        h-9
                        rounded-xl
                        bg-gray-900
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-sm
                        group-hover:shadow-md
                        group-hover:-translate-y-0.5
                        transition-all
                        duration-200
                    ">

                        <Sparkles
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div className="
                        flex
                        flex-col
                        leading-none
                    ">

                        <span className="
                            text-sm
                            font-semibold
                            tracking-tight
                            text-gray-900
                        ">
                            TalentMatch AI
                        </span>


                        <span className="
                            hidden
                            sm:block
                            mt-1
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.12em]
                            text-gray-400
                        ">
                            Career Intelligence
                        </span>

                    </div>

                </Link>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav className="
                    hidden
                    md:flex
                    items-center
                    gap-1
                    p-1
                    rounded-xl
                    bg-white/50
                    border
                    border-[#E8E2D7]/70
                ">

                    <a
                        href="#features"
                        className="
                            px-3.5
                            py-2
                            rounded-lg
                            text-xs
                            font-medium
                            text-gray-500
                            hover:bg-white
                            hover:text-gray-900
                            transition-all
                        "
                    >
                        Features
                    </a>


                    <a
                        href="#how-it-works"
                        className="
                            px-3.5
                            py-2
                            rounded-lg
                            text-xs
                            font-medium
                            text-gray-500
                            hover:bg-white
                            hover:text-gray-900
                            transition-all
                        "
                    >
                        How it works
                    </a>

                </nav>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    {!user && (

                        <Link
                            to="/login"
                            className="
                                hidden
                                sm:inline-flex
                                items-center
                                px-3
                                py-2
                                rounded-lg
                                text-sm
                                font-medium
                                text-gray-600
                                hover:bg-white
                                hover:text-gray-900
                                transition-all
                            "
                        >
                            Sign in
                        </Link>

                    )}


                    <Link
                        to={actionPath}
                        className="
                            group
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-gray-900
                            text-white
                            text-xs
                            sm:text-sm
                            font-medium
                            shadow-sm
                            hover:bg-gray-800
                            hover:shadow-md
                            active:scale-[0.98]
                            transition-all
                        "
                    >

                        <span>
                            {user
                                ? "Analyze Resume"
                                : "Get Started"
                            }
                        </span>


                        <ArrowRight
                            size={15}
                            className="
                                group-hover:translate-x-0.5
                                transition-transform
                            "
                        />

                    </Link>

                </div>

            </div>

        </header>
    );
};


export default LandingNavbar;