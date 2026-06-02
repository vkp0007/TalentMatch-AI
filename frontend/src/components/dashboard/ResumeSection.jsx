import ResumeCard from "./ResumeCard";
import EmptyState from "./EmptyState";

const ResumeSection = ({
    resumes = [],
    compact = false
}) => {

    return (

        <div>

            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Uploaded Resumes
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm">
                        Manage uploaded resumes
                    </p>

                </div>

            </div>

            {
                resumes.length === 0
                ?
                (
                    <EmptyState
                        title="No resumes uploaded"
                        description="Upload resumes to begin AI-powered ATS analysis."
                    />
                )
                :
                (
                    <div className="space-y-4">

                        {
                            resumes.map((resume) => (

                                <ResumeCard
                                    key={resume._id}
                                    resume={resume}
                                />
                            ))
                        }

                    </div>
                )
            }

        </div>
    );
};

export default ResumeSection;