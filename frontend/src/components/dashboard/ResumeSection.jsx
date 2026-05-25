import ResumeCard from "./ResumeCard";
import EmptyState from "./EmptyState";

const ResumeSection = ({ resumes }) => {

    return (

        <div className="mb-14">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-bold text-slate-900">
                        Uploaded Resumes
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Manage uploaded resumes and start ATS analysis
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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