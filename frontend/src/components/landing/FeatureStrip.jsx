import {
    Target,
    Sparkles,
    FileText,
    Mail,
    MessageSquare
} from "lucide-react";


const FeatureStrip = () => {

    const features = [

        {
            icon: Target,
            title: "Resume Analysis",
            text: "Understand your fit"
        },

        {
            icon: Sparkles,
            title: "AI Recommendations",
            text: "Know what to improve"
        },

        {
            icon: FileText,
            title: "Referral Drafts",
            text: "Create better requests"
        },

        {
            icon: Mail,
            title: "Application Emails",
            text: "Write targeted emails"
        },

        {
            icon: MessageSquare,
            title: "Interview Coach",
            text: "Prepare with AI"
        }

    ];


    return (

        <section
            id="features"
            className="
                scroll-mt-20
                border-y
                border-[#E8E2D7]
                bg-white
            "
        >

            <div className="
                max-w-7xl
                mx-auto
                px-6
                py-6
                lg:py-7
            ">


                {/* =================================================
                    LABEL
                ================================================= */}

                <div className="
                    flex
                    items-center
                    gap-3
                    mb-5
                ">

                    <span className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-gray-400
                    ">
                        Everything you need
                    </span>


                    <div className="
                        h-px
                        flex-1
                        bg-[#E8E2D7]
                    " />

                </div>


                {/* =================================================
                    FEATURES
                ================================================= */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-5
                    gap-3
                ">

                    {features.map(feature => {

                        const Icon =
                            feature.icon;


                        return (

                            <div
                                key={feature.title}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    p-3
                                    rounded-xl
                                    border
                                    border-transparent
                                    hover:border-[#E8E2D7]
                                    hover:bg-[#F7F3EA]
                                    transition-all
                                    duration-200
                                "
                            >

                                {/* ICON */}

                                <div className="
                                    w-10
                                    h-10
                                    shrink-0
                                    rounded-xl
                                    bg-[#F7F3EA]
                                    border
                                    border-[#E8E2D7]
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-600
                                    group-hover:bg-white
                                    group-hover:shadow-sm
                                    transition-all
                                ">

                                    <Icon
                                        size={17}
                                        strokeWidth={1.8}
                                    />

                                </div>


                                {/* TEXT */}

                                <div className="
                                    min-w-0
                                ">

                                    <p className="
                                        text-xs
                                        font-semibold
                                        text-gray-900
                                        truncate
                                    ">
                                        {feature.title}
                                    </p>


                                    <p className="
                                        mt-0.5
                                        text-[11px]
                                        text-gray-400
                                        truncate
                                    ">
                                        {feature.text}
                                    </p>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
};


export default FeatureStrip;