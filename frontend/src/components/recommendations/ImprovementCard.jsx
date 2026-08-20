import {
    Award,
    BookOpen,
    Code2,
    GraduationCap,
    FileText
} from "lucide-react";

import PriorityBadge
    from "./PriorityBadge";


const ImprovementCard = ({
    item
}) => {

    const typeConfig = {

        skill: {
            label: "Skill",
            icon: Code2
        },

        project: {
            label: "Project",
            icon: FileText
        },

        achievement: {
            label: "Achievement",
            icon: Award
        },

        education: {
            label: "Education",
            icon: GraduationCap
        }

    };


    const config =
        typeConfig[
            String(item?.type || "").toLowerCase()
        ] || {

            label: "Resume",
            icon: BookOpen

        };


    const Icon =
        config.icon;


    return (

        <article className="
            group
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-5
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-gray-300
            hover:shadow-md
        ">

            {/* =========================================
                HEADER
            ========================================= */}

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

                    {/* ICON */}

                    <div className="
                        w-9
                        h-9
                        shrink-0
                        rounded-xl
                        bg-[#F7F3EA]
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        transition
                        group-hover:bg-gray-100
                    ">

                        <Icon
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>


                    {/* CONTENT */}

                    <div className="
                        min-w-0
                    ">

                        <span className="
                            inline-flex
                            items-center
                            px-2
                            py-0.5
                            rounded-md
                            bg-gray-50
                            border
                            border-gray-200
                            text-[10px]
                            uppercase
                            tracking-wider
                            font-semibold
                            text-gray-500
                        ">
                            {config.label}
                        </span>


                        <h3 className="
                            text-sm
                            font-semibold
                            text-gray-900
                            leading-5
                            mt-2
                        ">
                            {item?.item ||
                                "Resume improvement"}
                        </h3>

                    </div>

                </div>


                {/* PRIORITY */}

                <PriorityBadge
                    priority={
                        item?.priority
                    }
                />

            </div>


            {/* =========================================
                REASON
            ========================================= */}

            {item?.reason && (

                <p className="
                    mt-4
                    pl-12
                    text-sm
                    leading-6
                    text-gray-600
                ">
                    {item.reason}
                </p>

            )}

        </article>
    );
};


export default ImprovementCard;