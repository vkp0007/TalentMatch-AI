import {
    Sparkles,
    ArrowLeft
} from "lucide-react";


const RecommendationHeader = ({
    onBack
}) => {

    return (

        <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
            mb-8
        ">

            {/* =========================================
                TITLE
            ========================================= */}

            <div className="
                flex
                items-center
                gap-3
            ">

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
                    text-gray-700
                    shadow-sm
                ">

                    <Sparkles
                        size={17}
                        strokeWidth={1.8}
                    />

                </div>


                <div>

                    <h1 className="
                        text-2xl
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        Recommendations
                    </h1>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                    ">
                        Personalized ways to improve your
                        fit for this role.
                    </p>

                </div>

            </div>


            {/* =========================================
                BACK TO ANALYSIS
            ========================================= */}

            <button
                type="button"
                onClick={onBack}
                className="
                    shrink-0
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-gray-900
                    text-white
                    text-sm
                    font-medium
                    shadow-sm
                    hover:bg-gray-800
                    hover:shadow-md
                    hover:-translate-y-0.5
                    active:translate-y-0
                    transition-all
                    duration-200
                "
            >

                <ArrowLeft
                    size={15}
                />

                Analysis

            </button>

        </div>
    );
};


export default RecommendationHeader;