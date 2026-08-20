import {
    FileText,
    ArrowUpRight
} from "lucide-react";

import {
    useNavigate
} from "react-router";


const ResumeCard = ({
    resume
}) => {

    const navigate =
        useNavigate();


    const handleOpen = () => {

        navigate(
            `/resumes/${resume._id}`
        );

    };


    return (

        <button
            type="button"
            onClick={handleOpen}
            className="
                group
                w-full
                text-left
                bg-white
                border
                border-[#E8E2D7]
                rounded-2xl
                p-5
                shadow-sm
                hover:border-gray-300
                hover:shadow-md
                transition-all
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-[#E8E2D7]
            "
        >

            {/* =================================================
                TOP
            ================================================= */}

            <div className="
                flex
                items-start
                justify-between
                gap-4
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                ">

                    <div className="
                        w-10
                        h-10
                        shrink-0
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
                            size={17}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div className="min-w-0">

                        <h3 className="
                            text-sm
                            font-semibold
                            text-gray-900
                            truncate
                            group-hover:text-gray-700
                            transition
                        ">

                            {resume?.resumeName ||
                                "Untitled Resume"}

                        </h3>


                        <p className="
                            text-xs
                            text-gray-500
                            mt-1
                            truncate
                        ">

                            {resume?.targetRole ||
                                "No target role"}

                        </p>

                    </div>

                </div>


                <div className="
                    w-8
                    h-8
                    shrink-0
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    group-hover:bg-[#F7F3EA]
                    group-hover:text-gray-700
                    transition-all
                ">

                    <ArrowUpRight
                        size={16}
                        strokeWidth={1.8}
                    />

                </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="
                mt-5
                pt-4
                border-t
                border-gray-100
                flex
                items-center
                justify-between
                gap-4
            ">

                <div>

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-wider
                        font-medium
                        text-gray-400
                    ">
                        Uploaded
                    </p>


                    <p className="
                        text-xs
                        text-gray-600
                        mt-1
                    ">

                        {resume?.createdAt
                            ? new Date(
                                resume.createdAt
                            ).toLocaleDateString()
                            : "Unknown"}

                    </p>

                </div>


                <span className="
                    text-xs
                    font-medium
                    text-gray-400
                    group-hover:text-gray-700
                    transition
                ">
                    View resume
                </span>

            </div>

        </button>
    );
};


export default ResumeCard;