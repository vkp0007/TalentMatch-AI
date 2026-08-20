import {
    Plus,
    Sparkles
} from "lucide-react";


const DashboardHeader = ({
    onNewAnalysis
}) => {

    return (

        <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
            mb-7
        ">

            {/* =================================================
                LEFT
            ================================================= */}

            <div>

                <div className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1
                    rounded-full
                    bg-white
                    border
                    border-[#E8E2D7]
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-500
                ">

                    <Sparkles
                        size={11}
                    />

                    Career workspace

                </div>


                <h1 className="
                    mt-3
                    text-2xl
                    sm:text-3xl
                    font-semibold
                    tracking-tight
                    text-gray-900
                ">
                    Dashboard
                </h1>


                <p className="
                    mt-1.5
                    text-sm
                    text-gray-500
                ">
                    Manage your resumes and job analyses.
                </p>

            </div>


            {/* =================================================
                ACTION
            ================================================= */}

            <button
                type="button"
                onClick={onNewAnalysis}
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
                    transition-all
                "
            >

                <Plus
                    size={16}
                    strokeWidth={2}
                />

                New Analysis

            </button>

        </div>
    );
};


export default DashboardHeader;