import {
    FileText,
    ChevronRight
} from "lucide-react";


const ResumeMenu = ({
    resumes = [],
    open,
    onSelect
}) => {

    if (!open) {
        return null;
    }


    return (

        <div className="
            absolute
            bottom-12
            left-0
            w-72
            bg-[#FCFBF8]
            border
            border-[#E8E2D7]
            rounded-2xl
            shadow-[0_12px_35px_rgba(0,0,0,0.10)]
            p-2
            z-30
        ">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="
                px-3
                pt-2.5
                pb-3.5
            ">

                <p className="
                    text-sm
                    font-semibold
                    tracking-tight
                    text-gray-900
                ">
                    Add resume context
                </p>


                <p className="
                    text-xs
                    leading-5
                    text-gray-400
                    mt-1
                ">
                    Choose a resume to use during
                    your interview practice.
                </p>

            </div>


            {/* =========================================
                DIVIDER
            ========================================= */}

            <div className="
                h-px
                bg-[#EDE7DE]
                mb-1.5
            " />


            {/* =========================================
                EMPTY
            ========================================= */}

            {resumes.length === 0 ? (

                <div className="
                    px-3
                    py-6
                    text-center
                ">

                    <div className="
                        w-10
                        h-10
                        mx-auto
                        rounded-xl
                        bg-[#F7F3EA]
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-500
                    ">

                        <FileText
                            size={17}
                            strokeWidth={1.8}
                        />

                    </div>


                    <p className="
                        text-sm
                        font-medium
                        text-gray-700
                        mt-3
                    ">
                        No saved resumes
                    </p>


                    <p className="
                        text-xs
                        leading-5
                        text-gray-400
                        mt-1
                    ">
                        Upload a resume first to
                        use resume-based coaching.
                    </p>

                </div>

            ) : (

                /* =====================================
                   RESUME LIST
                ===================================== */

                <div className="
                    max-h-64
                    overflow-y-auto
                    pr-0.5
                ">

                    {resumes.map(
                        resume => (

                            <button
                                key={
                                    resume._id
                                }
                                type="button"
                                onClick={() =>
                                    onSelect(
                                        resume
                                    )
                                }
                                className="
                                    group
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    text-left
                                    px-3
                                    py-2.5
                                    rounded-xl
                                    text-gray-700
                                    hover:bg-[#F7F3EA]
                                    active:scale-[0.99]
                                    transition-all
                                "
                            >

                                {/* ICON */}

                                <div className="
                                    w-9
                                    h-9
                                    shrink-0
                                    rounded-xl
                                    bg-white
                                    border
                                    border-[#E8E2D7]
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-500
                                    shadow-[0_1px_2px_rgba(0,0,0,0.02)]
                                    group-hover:border-[#DCD4C6]
                                    group-hover:text-gray-700
                                    transition-all
                                ">

                                    <FileText
                                        size={16}
                                        strokeWidth={1.8}
                                    />

                                </div>


                                {/* INFO */}

                                <div className="
                                    min-w-0
                                    flex-1
                                ">

                                    <p className="
                                        text-sm
                                        font-medium
                                        text-gray-800
                                        truncate
                                        group-hover:text-gray-900
                                    ">
                                        {
                                            resume.resumeName ||
                                            resume.originalFileName ||
                                            "Resume"
                                        }
                                    </p>


                                    <p className="
                                        text-xs
                                        text-gray-400
                                        mt-0.5
                                        truncate
                                    ">
                                        {
                                            resume.targetRole ||
                                            "No target role"
                                        }
                                    </p>

                                </div>


                                {/* ARROW */}

                                <div className="
                                    w-7
                                    h-7
                                    shrink-0
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-300
                                    group-hover:bg-white
                                    group-hover:text-gray-600
                                    transition-all
                                ">

                                    <ChevronRight
                                        size={15}
                                        strokeWidth={1.8}
                                    />

                                </div>

                            </button>

                        )
                    )}

                </div>

            )}

        </div>
    );
};


export default ResumeMenu;