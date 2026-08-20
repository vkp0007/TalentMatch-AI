import { 
    useNavigate 
} from "react-router";

import {
    FileText,
    ArrowRight,
    Trash2
} from "lucide-react";


const ResumeHeader = ({
    resumeName,
    targetRole,
    resumeId,
    onDelete,
    deleting
}) => {

    const navigate =
        useNavigate();


    return (

        <div className="
            relative
            flex
            flex-col
            sm:flex-row
            sm:items-start
            sm:justify-between
            gap-6
            mb-8
            p-6
            rounded-2xl
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            shadow-sm
        ">

            {/* =================================================
                TITLE
            ================================================= */}

            <div className="
                flex
                items-start
                gap-4
                min-w-0
            ">

                <div className="
                    w-11
                    h-11
                    shrink-0
                    rounded-xl
                    bg-white
                    border
                    border-[#E8E2D7]
                    flex
                    items-center
                    justify-center
                    text-gray-600
                ">

                    <FileText
                        size={18}
                        strokeWidth={1.8}
                    />

                </div>


                <div className="
                    min-w-0
                    pt-0.5
                ">

                    <p className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-gray-400
                    ">
                        Resume
                    </p>


                    <h1 className="
                        mt-1
                        text-2xl
                        font-semibold
                        tracking-tight
                        text-gray-900
                        wrap-break-word
                    ">
                        {resumeName ||
                            "Resume"}
                    </h1>


                    {targetRole && (

                        <p className="
                            text-sm
                            text-gray-500
                            mt-1.5
                        ">

                            Target Role:{" "}

                            <span className="
                                font-medium
                                text-gray-700
                            ">
                                {targetRole}
                            </span>

                        </p>

                    )}

                </div>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="
                flex
                flex-wrap
                items-center
                gap-2.5
                shrink-0
            ">

                {/* ANALYZE */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/analysis/new?resumeId=${resumeId}`
                        )
                    }
                    className="
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
                        duration-200
                    "
                >

                    Analyze Job Description

                    <ArrowRight
                        size={15}
                        strokeWidth={1.8}
                    />

                </button>


                {/* DELETE */}

                <button
                    type="button"
                    onClick={onDelete}
                    disabled={deleting}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-xl
                        border
                        border-[#E8D8D4]
                        bg-white
                        text-gray-600
                        text-sm
                        font-medium
                        hover:bg-[#FFF7F5]
                        hover:text-red-600
                        hover:border-red-200
                        transition-all
                        duration-200
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >

                    <Trash2
                        size={15}
                        strokeWidth={1.8}
                    />

                    {deleting
                        ? "Deleting..."
                        : "Delete Resume"}

                </button>

            </div>

        </div>
    );
};


export default ResumeHeader;