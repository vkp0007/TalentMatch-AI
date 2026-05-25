import { Link } from "react-router";

const ResumeCard = ({ resume }) => {

    return (

        <div className="bg-white border border-slate-200 rounded-3xl p-7 hover:shadow-md transition-all duration-300">

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="text-2xl font-semibold text-slate-900">
                        {resume.resumeName}
                    </h3>

                   

                </div>

                <div className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-700 text-sm font-medium">
                     <p className="text-slate-500 ">

                        Uploaded on {

                            new Date(
                                resume.createdAt
                            ).toLocaleDateString()
                        }

                    </p>
                </div>

            </div>

            <div className="mt-8 flex items-center justify-end">

                <Link
                    to={`/analysis/${resume._id}`}
                    className="

                    px-5
                    py-3
                    rounded-2xl
                    bg-slate-900
                    hover:bg-slate-800
                    text-white
                    transition-all
                    duration-300
                    text-sm
                    font-medium

                    "
                >
                    Analyze Resume
                </Link>

            </div>

        </div>
    );
};

export default ResumeCard;