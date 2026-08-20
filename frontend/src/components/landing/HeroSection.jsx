import {
    ArrowRight,
    CheckCircle2,
    Sparkles
} from "lucide-react";

import {
    Link
} from "react-router";

import {
    useAuth
} from "../../context/AuthContext.jsx";

import ProductPreview
    from "./ProductPreview";


const HeroSection = () => {

    const { user } = useAuth();

    const analyzePath =
        user
            ? "/analysis/new"
            : "/register";


    return (

        <section className="
            max-w-7xl
            mx-auto
            px-6
            pt-10
            pb-12
            lg:pt-10
            lg:pb-12
        ">

            <div className="
                grid
                lg:grid-cols-2
                gap-10
                xl:gap-12
                items-center
            ">

                {/* =================================================
                    LEFT
                ================================================= */}

                <div>

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-full
                        bg-white
                        border
                        border-[#E8E2D7]
                        text-xs
                        font-medium
                        text-gray-600
                    ">

                        <Sparkles
                            size={13}
                        />

                        AI-powered career workspace

                    </div>


                    <h1 className="
                        mt-7
                        text-4xl
                        sm:text-5xl
                        lg:text-6xl
                        font-semibold
                        tracking-tight
                        leading-[1.05]
                        max-w-2xl
                    ">

                        Make every job
                        application

                        <span className="
                            text-gray-400
                        ">
                            {" "}smarter.
                        </span>

                    </h1>


                    <p className="
                        mt-6
                        max-w-xl
                        text-base
                        sm:text-lg
                        leading-7
                        text-gray-500
                    ">

                        Analyze your resume against
                        real opportunities, identify
                        what matters, and create
                        better application materials
                        with AI.

                    </p>


                    {/* =================================================
                        CTA
                    ================================================= */}

                    <div className="
                        mt-8
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                    ">

                        <Link
                            to={analyzePath}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                bg-gray-900
                                text-white
                                text-sm
                                font-medium
                                shadow-sm
                                hover:bg-gray-800
                                hover:shadow-md
                                transition
                            "
                        >

                            Analyze My Resume

                            <ArrowRight
                                size={16}
                            />

                        </Link>


                        <a
                            href="#how-it-works"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                px-5
                                py-3
                                rounded-xl
                                bg-white
                                border
                                border-[#E8E2D7]
                                text-gray-700
                                text-sm
                                font-medium
                                hover:border-gray-300
                                transition
                            "
                        >
                            See How It Works
                        </a>

                    </div>


                    {/* =================================================
                        SUPPORTING TEXT
                    ================================================= */}

                    <div className="
                        mt-8
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-400
                    ">

                        <CheckCircle2
                            size={14}
                        />

                        Built around your resume,
                        skills and target role.

                    </div>

                </div>


                {/* =================================================
                    RIGHT
                ================================================= */}

                <ProductPreview />

            </div>

        </section>
    );
};


export default HeroSection;