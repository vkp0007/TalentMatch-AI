import {
    FilePlus,
    ArrowRight
} from "lucide-react";

import {
    useNavigate
} from "react-router";


const ResumeManagement = () => {

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
                gap-3
                mb-4
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

                    <FilePlus
                        size={16}
                        strokeWidth={1.8}
                    />

                </div>


                <div>

                    <h2 className="
                        text-base
                        font-semibold
                        text-gray-900
                    ">
                        Resume Management
                    </h2>


                    <p className="
                        text-xs
                        text-gray-400
                        mt-0.5
                    ">
                        Manage your saved resumes.
                    </p>

                </div>

            </div>


            {/* =================================================
                ACTION
            ================================================= */}

            <div className="
                bg-white
                border
                border-[#E8E2D7]
                rounded-2xl
                p-5
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
            ">

                <div>

                    <h3 className="
                        text-sm
                        font-semibold
                        text-gray-900
                    ">
                        Add a new resume
                    </h3>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                        max-w-xl
                    ">
                        Upload your resume to analyze it
                        against job opportunities.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/resumes/upload"
                        )
                    }
                    className="
                        shrink-0
                        inline-flex
                        items-center
                        justify-center
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

        </section>
    );
};


export default ResumeManagement;