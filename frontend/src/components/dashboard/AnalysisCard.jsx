import { Link } from "react-router";

import {
    Trash2
} from "lucide-react";

import {
    deleteAnalysis
} from "../../api/analysisApi.js";


const AnalysisCard = ({
    analysis,
    onDelete = null
}) => {

    // =====================================================
    // SCORE COLOR
    // =====================================================

    const scoreColor =

        analysis.finalScore >= 80

        ?

        "bg-emerald-500"

        :

        analysis.finalScore >= 60

        ?

        "bg-amber-500"

        :

        "bg-red-500";



    // =====================================================
    // DELETE REPORT
    // =====================================================

    const handleDelete = async () => {

        const confirmDelete =
            window.confirm(

                "Delete this ATS report?"
            );

        if (!confirmDelete) return;


        try {

            await deleteAnalysis(
                analysis._id
            );


            if (onDelete) {

                onDelete(
                    analysis._id
                );
            }

        } catch(error) {

            console.log(error);

            alert(
                "Failed to delete report"
            );
        }
    };


    return (

        <div
            className="

            bg-white
            border
            border-slate-200
            rounded-2xl
            p-5
            hover:shadow-md
            transition-all
            duration-300

            "
        >

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <h3
                        className="

                        text-lg
                        font-semibold
                        text-slate-900
                        truncate

                        "
                    >
                        {
                            analysis?.resumeId?.resumeName ||

                            "Resume Analysis"
                        }
                    </h3>


                    <p
                        className="

                        text-sm
                        text-slate-500
                        mt-1

                        "
                    >
                        {
                            analysis.targetRole ||

                            "General Role"
                        }
                    </p>

                </div>


                {/* ========================================= */}
                {/* ATS SCORE */}
                {/* ========================================= */}

                <div
                    className={`

                    shrink-0
                    px-3
                    py-1.5
                    rounded-xl
                    text-white
                    text-xs
                    font-semibold

                    ${scoreColor}

                    `}
                >
                    ATS: {analysis.finalScore}%
                </div>

            </div>



            {/* ========================================= */}
            {/* MATCH SUMMARY */}
            {/* ========================================= */}

            <div className="flex flex-wrap gap-2 mt-5">

                <span
                    className="

                    bg-emerald-50
                    text-emerald-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium

                    "
                >
                    {analysis.matchedSkills.length} Matched
                </span>


                <span
                    className="

                    bg-red-50
                    text-red-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium

                    "
                >
                    {analysis.missingSkills.length} Missing
                </span>

            </div>



            {/* ========================================= */}
            {/* FOOTER */}
            {/* ========================================= */}

            <div
                className="mt-6 flex items-center justify-between"
            >

                {/* DELETE */}

                <button
                    onClick={handleDelete}
                    className="

                    flex
                    items-center
                    gap-2
                    text-red-500
                    hover:text-red-600
                    transition-all
                    duration-300
                    text-sm
                    font-medium

                    "
                >

                    <Trash2 size={16} />

                    Delete

                </button>


                {/* VIEW REPORT */}

                <Link
                    to={`/reports/${analysis._id}`}
                    className="

                    px-4
                    py-2
                    rounded-xl
                    bg-slate-900
                    hover:bg-slate-800
                    text-white
                    transition-all
                    duration-300
                    text-xs
                    font-medium

                    "
                >
                    View Report
                </Link>

            </div>

        </div>
    );
};

export default AnalysisCard;