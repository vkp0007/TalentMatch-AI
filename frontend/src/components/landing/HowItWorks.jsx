import {
    FileText,
    BriefcaseBusiness,
    ScanSearch,
    ArrowRight
} from "lucide-react";


const HowItWorks = () => {

    const steps = [

        {
            number: "01",
            icon: FileText,
            title: "Add your resume",
            text: "Upload your current resume and let TalentMatch AI understand your skills, projects, and background."
        },

        {
            number: "02",
            icon: BriefcaseBusiness,
            title: "Add a job",
            text: "Enter the role you're targeting and provide the job posting so the platform can understand its requirements."
        },

        {
            number: "03",
            icon: ScanSearch,
            title: "Analyze your fit",
            text: "Get a clear view of your match score, matched skills, gaps, and areas that need attention."
        },

        {
            number: "04",
            icon: ArrowRight,
            title: "Take action",
            text: "Use AI recommendations, application emails, referral drafts, and interview preparation to move forward."
        }

    ];


    return (

        <section
            id="how-it-works"
            className="
                scroll-mt-20
                border-t
                border-[#E8E2D7]
                bg-white
            "
        >

            <div className="
                max-w-7xl
                mx-auto
                px-6
                py-16
                lg:py-20
            ">


                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div className="
                    max-w-2xl
                ">

                    <span className="
                        inline-flex
                        items-center
                        px-3
                        py-1.5
                        rounded-full
                        bg-[#F7F3EA]
                        border
                        border-[#E8E2D7]
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-gray-500
                    ">
                        How it works
                    </span>


                    <h2 className="
                        mt-4
                        text-3xl
                        sm:text-4xl
                        font-semibold
                        tracking-tight
                        leading-tight
                        text-gray-900
                    ">
                        From resume to
                        application strategy.
                    </h2>


                    <p className="
                        mt-4
                        max-w-xl
                        text-sm
                        sm:text-base
                        leading-6
                        text-gray-500
                    ">
                        TalentMatch AI connects your resume
                        with the opportunity you're targeting
                        and turns the analysis into practical
                        next steps.
                    </p>

                </div>


                {/* =================================================
                    STEPS
                ================================================= */}

                <div className="
                    relative
                    mt-12
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-4
                ">

                    {/* CONNECTING LINE */}

                    <div className="
                        hidden
                        lg:block
                        absolute
                        top-8
                        left-[8%]
                        right-[8%]
                        h-px
                        bg-[#E8E2D7]
                    " />


                    {steps.map((step) => {

                        const Icon =
                            step.icon;


                        return (

                            <article
                                key={step.number}
                                className="
                                    relative
                                    z-10
                                    bg-[#F7F3EA]
                                    border
                                    border-[#E8E2D7]
                                    rounded-2xl
                                    p-5
                                    hover:-translate-y-1
                                    hover:shadow-md
                                    hover:border-[#DCD4C6]
                                    transition-all
                                    duration-200
                                "
                            >

                                {/* TOP */}

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div className="
                                        w-11
                                        h-11
                                        rounded-xl
                                        bg-white
                                        border
                                        border-[#E8E2D7]
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-700
                                        shadow-sm
                                    ">

                                        <Icon
                                            size={18}
                                            strokeWidth={1.8}
                                        />

                                    </div>


                                    <span className="
                                        text-xs
                                        font-semibold
                                        tracking-wider
                                        text-gray-400
                                    ">
                                        {step.number}
                                    </span>

                                </div>


                                {/* CONTENT */}

                                <h3 className="
                                    mt-6
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                ">
                                    {step.title}
                                </h3>


                                <p className="
                                    mt-2
                                    text-sm
                                    leading-5
                                    text-gray-500
                                ">
                                    {step.text}
                                </p>


                            </article>

                        );

                    })}

                </div>

            </div>

        </section>
    );
};


export default HowItWorks;