import {
    ArrowUpRight,
    Trash2
} from "lucide-react";


const AnalysisRow = ({
    analysis,
    onOpen,
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


    const getScoreStyle = () => {

        if (score === null) {

            return {
                text: "text-gray-500",
                bg: "bg-gray-100"
            };

        }


        if (score >= 80) {

            return {
                text: "text-emerald-700",
                bg: "bg-emerald-50"
            };

        }


        if (score >= 60) {

            return {
                text: "text-amber-700",
                bg: "bg-amber-50"
            };

        }


        return {
            text: "text-red-700",
            bg: "bg-red-50"
        };
    };


    const scoreStyle =
        getScoreStyle();


    const handleOpen = () => {

        if (
            !analysis?._id ||
            !onOpen
        ) {
            return;
        }

        onOpen(analysis);
    };


    const handleDelete = (event) => {

        event.stopPropagation();


        if (
            !analysis?._id ||
            !onDelete
        ) {
            return;
        }


        onDelete(
            analysis._id
        );
    };


    return (

        <div className="
            group
            flex
            items-center
            justify-between
            gap-5
            px-5
            py-4
            bg-white
            hover:bg-[#FDFBF7]
            transition-all
        ">

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <button
                type="button"
                onClick={handleOpen}
                className="
                    min-w-0
                    flex-1
                    text-left
                    focus:outline-none
                "
            >

                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    <p className="
                        text-sm
                        font-semibold
                        text-gray-900
                        truncate
                    ">

                        {
                            analysis?.targetRole ||
                            analysis?.jdProfile?.role ||
                            "Untitled Analysis"
                        }

                    </p>


                    {score !== null && (

                        <span className={`
                            hidden
                            sm:inline-flex
                            px-2
                            py-0.5
                            rounded-full
                            ${scoreStyle.bg}
                            ${scoreStyle.text}
                            text-[10px]
                            font-semibold
                        `}>
                            {score.toFixed(0)}%
                        </span>

                    )}

                </div>


                <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-3
                    gap-y-1
                    mt-1.5
                ">

                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        {analysis?.createdAt
                            ? new Date(
                                analysis.createdAt
                            ).toLocaleDateString()
                            : "No date"}
                    </p>


                    <span className="
                        h-1
                        w-1
                        rounded-full
                        bg-gray-300
                    " />


                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        {matchedCount} matched
                    </p>


                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        {missingCount} missing
                    </p>

                </div>

            </button>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="
                flex
                items-center
                gap-1.5
                shrink-0
            ">

                {score !== null && (

                    <div className={`
                        hidden
                        md:block
                        px-2.5
                        py-1.5
                        rounded-lg
                        ${scoreStyle.bg}
                        ${scoreStyle.text}
                    `}>

                        <p className="
                            text-xs
                            font-semibold
                        ">
                            {score.toFixed(0)}%
                        </p>

                    </div>

                )}


                {onDelete && (

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="
                            w-8
                            h-8
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-gray-400
                            hover:text-red-600
                            hover:bg-red-50
                            transition-all
                        "
                        title="Delete analysis"
                    >

                        <Trash2
                            size={15}
                            strokeWidth={1.8}
                        />

                    </button>

                )}


                <button
                    type="button"
                    onClick={handleOpen}
                    className="
                        w-8
                        h-8
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        hover:bg-[#F7F3EA]
                        hover:text-gray-800
                        transition-all
                    "
                    title="View analysis"
                >

                    <ArrowUpRight
                        size={16}
                        strokeWidth={1.8}
                    />

                </button>

            </div>

        </div>
    );
};


export default AnalysisRow;