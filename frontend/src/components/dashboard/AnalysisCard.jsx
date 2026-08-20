import {
    ArrowUpRight,
    Trash2,
    Target
} from "lucide-react";

import {
    Link
} from "react-router";

import {
    deleteAnalysis
} from "../../api/analysis.api.js";


const AnalysisCard = ({
    analysis,
    onDelete = null
}) => {

    const score =
        typeof analysis?.finalScore === "number"
            ? analysis.finalScore
            : null;


    const matchedCount =
        analysis?.matchedSkills?.length || 0;


    const missingCount =
        analysis?.missingSkills?.length || 0;


    // =====================================================
    // SCORE STYLE
    // =====================================================

    const getScoreStyle = () => {

        if (score === null) {

            return {
                text: "text-gray-500",
                bg: "bg-gray-100",
                label: "No score"
            };

        }


        if (score >= 80) {

            return {
                text: "text-emerald-700",
                bg: "bg-emerald-50",
                label: "Strong match"
            };

        }


        if (score >= 60) {

            return {
                text: "text-amber-700",
                bg: "bg-amber-50",
                label: "Moderate match"
            };

        }


        return {
            text: "text-red-700",
            bg: "bg-red-50",
            label: "Needs improvement"
        };
    };


    const scoreStyle =
        getScoreStyle();


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (event) => {

        event.preventDefault();
        event.stopPropagation();


        const confirmed =
            window.confirm(
                "Delete this ATS analysis?"
            );


        if (!confirmed) {
            return;
        }


        try {

            await deleteAnalysis(
                analysis._id
            );


            if (onDelete) {

                onDelete(
                    analysis._id
                );

            }

        } catch (error) {

            console.error(
                "Failed to delete analysis:",
                error
            );

            alert(
                "Failed to delete analysis."
            );
        }
    };


    return (

        <div className="
            group
            bg-white
            border
            border-[#E8E2D7]
            rounded-2xl
            p-5
            hover:border-gray-300
            hover:shadow-sm
            transition-all
        ">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                items-start
                justify-between
                gap-4
            ">

                <div className="
                    min-w-0
                ">

                    <div className="
                        flex
                        items-center
                        gap-2
                        mb-2
                    ">

                        <div className="
                            w-8
                            h-8
                            shrink-0
                            rounded-lg
                            bg-[#F7F3EA]
                            border
                            border-[#E8E2D7]
                            flex
                            items-center
                            justify-center
                            text-gray-600
                        ">

                            <Target
                                size={15}
                                strokeWidth={1.8}
                            />

                        </div>


                        <span className="
                            text-[10px]
                            uppercase
                            tracking-wider
                            font-semibold
                            text-gray-400
                        ">
                            ATS Analysis
                        </span>

                    </div>


                    <h3 className="
                        text-base
                        font-semibold
                        text-gray-900
                        truncate
                    ">

                        {
                            analysis?.resumeId?.resumeName ||
                            "Resume Analysis"
                        }

                    </h3>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                        truncate
                    ">

                        {
                            analysis?.targetRole ||
                            "General Role"
                        }

                    </p>

                </div>


                {/* SCORE */}

                {score !== null && (

                    <div className={`
                        shrink-0
                        px-3
                        py-2
                        rounded-xl
                        ${scoreStyle.bg}
                        ${scoreStyle.text}
                        text-center
                    `}>

                        <p className="
                            text-lg
                            leading-none
                            font-semibold
                        ">
                            {score.toFixed(0)}%
                        </p>

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-wide
                            mt-1
                            opacity-70
                        ">
                            Match
                        </p>

                    </div>

                )}

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="
                flex
                items-center
                gap-2
                mt-5
                pt-4
                border-t
                border-gray-100
            ">

                <span className="
                    inline-flex
                    items-center
                    px-2.5
                    py-1
                    rounded-full
                    bg-emerald-50
                    text-emerald-700
                    text-[11px]
                    font-medium
                ">
                    {matchedCount} matched
                </span>


                <span className="
                    inline-flex
                    items-center
                    px-2.5
                    py-1
                    rounded-full
                    bg-red-50
                    text-red-700
                    text-[11px]
                    font-medium
                ">
                    {missingCount} missing
                </span>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="
                flex
                items-center
                justify-between
                mt-5
            ">

                <button
                    type="button"
                    onClick={handleDelete}
                    className="
                        inline-flex
                        items-center
                        gap-1.5
                        text-xs
                        font-medium
                        text-gray-400
                        hover:text-red-600
                        transition
                    "
                >

                    <Trash2
                        size={14}
                        strokeWidth={1.8}
                    />

                    Delete

                </button>


                <Link
                    to={`/analysis/${analysis._id}`}
                    className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-2
                        rounded-lg
                        bg-gray-900
                        text-white
                        text-xs
                        font-medium
                        hover:bg-gray-800
                        transition-all
                    "
                >

                    View Analysis

                    <ArrowUpRight
                        size={14}
                        strokeWidth={1.8}
                    />

                </Link>

            </div>

        </div>
    );
};


export default AnalysisCard;