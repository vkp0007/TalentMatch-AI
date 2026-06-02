import { Link } from "react-router";

const ResumeCard = ({ resume }) => {

    return (

        <div
            className="

            bg-white
            border
            border-slate-200
            rounded-2xl
            p-4
            hover:shadow-md
            transition-all
            duration-300

            "
        >

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
                        {resume.resumeName}
                    </h3>

                </div>

                <span
                    className="

                    text-xs
                    text-slate-500
                    shrink-0

                    "
                >
                    {
                        new Date(
                            resume.createdAt
                        ).toLocaleDateString()
                    }
                </span>

            </div>

            <div className="mt-4 flex justify-end">

                <Link
                    to={`/analysis/${resume._id}`}
                    className="

                    px-4
                    py-2
                    rounded-xl
                    bg-slate-900
                    hover:bg-slate-800
                    text-white
                    text-xs
                    font-medium
                    transition-all

                    "
                >
                    Analyze Resume
                </Link>

            </div>

        </div>
    );
};

export default ResumeCard;