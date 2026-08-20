import {
    ArrowUpRight,
    FileText
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
                bg-[#F7F3EA]
                border
                border-[#E8E2D7]
                rounded-2xl
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#DCD4C6]
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-gray-200
            "
        >

            <div className="
                flex
                items-start
                justify-between
                gap-4
            ">

                <div className="
                    flex
                    items-start
                    gap-3
                    min-w-0
                ">

                    <div className="
                        w-10
                        h-10
                        shrink-0
                        rounded-xl
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        transition
                        group-hover:text-gray-900
                    ">

                        <FileText
                            size={17}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div className="
                        min-w-0
                        pt-0.5
                    ">

                        <h3 className="
                            text-sm
                            font-semibold
                            text-gray-900
                            truncate
                        ">
                            {resume.resumeName ||
                                "Untitled Resume"}
                        </h3>


                        <p className="
                            text-xs
                            text-gray-500
                            mt-1
                            truncate
                        ">
                            {resume.targetRole ||
                                "No target role"}
                        </p>

                    </div>

                </div>


                <div className="
                    w-8
                    h-8
                    shrink-0
                    rounded-lg
                    bg-white
                    border
                    border-[#E8E2D7]
                    flex
                    items-center
                    justify-center
                    text-gray-300
                    group-hover:text-gray-700
                    group-hover:border-[#DCD4C6]
                    transition-all
                ">

                    <ArrowUpRight
                        size={15}
                        strokeWidth={1.8}
                    />

                </div>

            </div>


            <div className="
                mt-5
                pt-4
                border-t
                border-[#E8E2D7]
                flex
                items-center
                justify-between
                gap-3
            ">

                <div>

                    <p className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-gray-400
                    ">
                        Uploaded
                    </p>

                    <p className="
                        text-xs
                        text-gray-600
                        mt-1
                    ">
                        {resume.createdAt
                            ? new Date(
                                resume.createdAt
                            ).toLocaleDateString()
                            : "Unknown"}
                    </p>

                </div>


                <span className="
                    text-[11px]
                    font-medium
                    text-gray-400
                    group-hover:text-gray-600
                    transition
                ">
                    View resume
                </span>

            </div>

        </button>
    );
};


export default ResumeCard;