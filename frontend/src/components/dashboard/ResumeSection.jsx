import {
    ArrowRight,
    FileText,
    Plus
} from "lucide-react";

import {
    useNavigate
} from "react-router";

import ResumeCard
    from "./ResumeCard";


const ResumeSection = ({
    resumes = []
}) => {

    const navigate =
        useNavigate();


    return (

        <section className="
            mb-8
        ">

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

                        <FileText
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
                            Saved Resumes
                        </h2>


                        <p className="
                            text-xs
                            text-gray-400
                            mt-0.5
                        ">
                            Your uploaded resumes and target roles.
                        </p>

                    </div>

                </div>


                {resumes.length > 0 && (

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/resumes"
                            )
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

            {resumes.length === 0 ? (

                <div className="
                    bg-[#F7F3EA]
                    border
                    border-dashed
                    border-[#DCD4C6]
                    rounded-2xl
                    px-6
                    py-10
                    text-center
                ">

                    <div className="
                        w-10
                        h-10
                        mx-auto
                        rounded-xl
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-500 "
                    >

                        <Plus
                            size={17}
                            strokeWidth={1.8}
                        />

                    </div>


                    <h3 className="
                        text-sm
                        font-semibold
                        text-gray-900
                        mt-4
                    ">
                        No resumes yet
                    </h3>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1.5
                        max-w-sm
                        mx-auto
                    ">
                        Upload your resume to start analyzing
                        job opportunities.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/resumes/upload"
                            )
                        }
                        className="
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-gray-900
                            text-white
                            text-sm
                            font-medium
                            shadow-sm
                            hover:bg-gray-800
                            hover:shadow-md
                            transition-all
                        "
                    >

                        Upload Resume

                        <ArrowRight
                            size={14}
                            strokeWidth={1.8}
                        />

                    </button>

                </div>

            ) : (

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-4
                ">

                    {resumes
                        .slice(0, 3)
                        .map(resume => (

                            <ResumeCard
                                key={
                                    resume._id
                                }
                                resume={
                                    resume
                                }
                            />

                        ))
                    }

                </div>

            )}

        </section>
    );
};


export default ResumeSection;