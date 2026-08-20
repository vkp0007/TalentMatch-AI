import {
    ArrowRight,
    Target
} from "lucide-react";

import {
    useNavigate
} from "react-router";

import AnalysisRow
    from "./AnalysisRow";

import EmptyState
    from "./EmptyState";


const AnalysisSection = ({
    analyses = [],
    onOpen
}) => {

    const navigate =
        useNavigate();


    return (

        <section>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                items-center
                justify-between
                gap-4
                mb-4
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        w-9
                        h-9
                        rounded-xl
                        bg-[#F7F3EA]
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

                        <h2 className="
                            text-base
                            font-semibold
                            tracking-tight
                            text-gray-900
                        ">
                            Recent Analyses
                        </h2>


                        <p className="
                            text-xs
                            text-gray-400
                            mt-0.5
                        ">
                            Your latest job matches
                        </p>

                    </div>

                </div>


                {analyses.length > 0 && (

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/analyses")
                        }
                        className="
                            inline-flex
                            items-center
                            gap-1
                            text-xs
                            font-medium
                            text-gray-500
                            hover:text-gray-900
                            transition
                        "
                    >

                        View all

                        <ArrowRight
                            size={14}
                        />

                    </button>

                )}

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            {analyses.length === 0 ? (

                <EmptyState

                    title="No analyses yet"

                    description="
                        Create an analysis to see how well
                        your resume matches a job.
                    "

                    actionLabel="New Analysis"

                    onAction={() =>
                        navigate(
                            "/analysis/new"
                        )
                    }

                />

            ) : (

                <div className="
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    overflow-hidden
                    bg-white
                    shadow-sm
                ">

                    {analyses
                        .slice(0, 5)
                        .map(analysis => (

                            <div
                                key={
                                    analysis._id
                                }
                                className="
                                    border-b
                                    border-gray-100
                                    last:border-b-0
                                "
                            >

                                <AnalysisRow
                                    analysis={
                                        analysis
                                    }
                                    onOpen={
                                        onOpen
                                    }
                                />

                            </div>

                        ))
                    }

                </div>

            )}

        </section>
    );
};


export default AnalysisSection;