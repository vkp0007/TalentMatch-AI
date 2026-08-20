import {
    Target
} from "lucide-react";

import ScoreCard
    from "./ScoreCard";


const ScoreOverview = ({
    finalScore,
    semanticScore,
    skillScore
}) => {

    const score =
        Number(finalScore);


    const getScoreLabel = () => {

        if (!Number.isFinite(score)) {
            return "Analysis complete";
        }

        if (score >= 80) {
            return "Strong match";
        }

        if (score >= 60) {
            return "Moderate match";
        }

        return "Needs improvement";
    };


    return (

        <section className="
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            rounded-2xl
            overflow-hidden
        ">

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                gap-4
                px-5
                sm:px-6
                pt-5
                pb-4
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        w-9
                        h-9
                        shrink-0
                        rounded-xl
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-600
                    ">

                        <Target
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div>

                        <p className="
                            text-sm
                            font-semibold
                            text-gray-900
                        ">
                            Match Overview
                        </p>

                        <p className="
                            text-xs
                            text-gray-500
                            mt-0.5
                        ">
                            Resume-to-job compatibility
                        </p>

                    </div>

                </div>


                <span className="
                    hidden
                    sm:inline-flex
                    items-center
                    px-2.5
                    py-1
                    rounded-full
                    bg-white
                    border
                    border-[#E8E2D7]
                    text-[10px]
                    font-medium
                    text-gray-500
                ">
                    {getScoreLabel()}
                </span>

            </div>


            {/* SCORES */}

            <div className="
                bg-white
                border-t
                border-[#E8E2D7]
                mx-2
                mb-2
                rounded-xl
                overflow-hidden
            ">

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    divide-y
                    md:divide-y-0
                    md:divide-x
                    divide-gray-100
                ">

                    <ScoreCard
                        label="Overall Match"
                        value={finalScore}
                        large
                        variant="primary"
                    />


                    <ScoreCard
                        label="Semantic Score"
                        value={semanticScore}
                        variant="neutral"
                    />


                    <ScoreCard
                        label="Skill Score"
                        value={skillScore}
                        variant="success"
                    />

                </div>

            </div>

        </section>
    );
};


export default ScoreOverview;