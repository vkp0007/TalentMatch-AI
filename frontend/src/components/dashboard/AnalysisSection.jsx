import AnalysisCard from "./AnalysisCard";
import EmptyState from "./EmptyState";

const AnalysisSection = ({
    analyses = [],
    onDelete
}) => {

    return (

        <div>

            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Recent ATS Reports
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm">
                        Latest ATS analysis reports
                    </p>

                </div>

            </div>

            {
                analyses.length === 0
                ?
                (
                    <EmptyState
                        title="No analyses available"
                        description="Run ATS analysis on uploaded resumes."
                    />
                )
                :
                (
                    <div className="space-y-4">

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