import AnalysisCard from "./AnalysisCard";

import EmptyState from "./EmptyState";


const AnalysisSection = ({
    analyses = [],
    onDelete
}) => {

    return (

        <div>

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-bold text-slate-900">
                        Recent Analysis History
                    </h2>

                    <p className="text-slate-500 mt-2">
                        AI-powered ATS analysis reports
                    </p>

                </div>

            </div>


            {/* ========================================= */}
            {/* EMPTY STATE */}
            {/* ========================================= */}

            {
                analyses.length === 0
                ?
                (
                    <EmptyState
                        title="No analyses available"
                        description="Run ATS analysis on uploaded resumes to generate reports."
                    />
                )
                :
                (
                    <div
                        className="

                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-6
                        items-start

                        "
                    >

                        {
                            analyses.map((analysis) => (

                                <AnalysisCard
                                    key={analysis._id}
                                    analysis={analysis}
                                    onDelete={onDelete}
                                />
                            ))
                        }

                    </div>
                )
            }

        </div>
    );
};

export default AnalysisSection;