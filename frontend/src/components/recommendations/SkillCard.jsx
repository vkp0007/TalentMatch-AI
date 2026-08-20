import {
    BookOpen
} from "lucide-react";

import PriorityBadge
    from "./PriorityBadge";


const SkillCard = ({
    item
}) => {

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

                        <BookOpen
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>


                    {/* SKILL */}

                    <div className="
                        min-w-0
                    ">

                        <h3 className="
                            text-sm
                            font-semibold
                            leading-5
                            text-gray-900
                        ">
                            {item?.skill ||
                                "Recommended skill"}
                        </h3>


                        {item?.reason && (

                            <p className="
                                text-sm
                                text-gray-600
                                mt-2
                                leading-6
                            ">
                                {item.reason}
                            </p>

                        )}

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
                TOPICS
            ========================================= */}

            {item?.topics?.length > 0 && (

                <div className="
                    mt-5
                    pt-4
                    border-t
                    border-gray-100
                ">

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-wider
                        font-semibold
                        text-gray-400
                        mb-3
                    ">
                        Topics to cover
                    </p>


                    <div className="
                        flex
                        flex-wrap
                        gap-2
                    ">

                        {item.topics.map(
                            (topic, index) => (

                                <span
                                    key={`${topic}-${index}`}
                                    className="
                                        inline-flex
                                        items-center
                                        px-3
                                        py-1.5
                                        rounded-full
                                        bg-gray-50
                                        border
                                        border-gray-200
                                        text-xs
                                        font-medium
                                        text-gray-700
                                        transition-all
                                        duration-150
                                        hover:bg-white
                                        hover:border-gray-300
                                        hover:shadow-sm
                                    "
                                >
                                    {topic}
                                </span>

                            )
                        )}

                    </div>

                </div>

            )}

        </article>
    );
};


export default SkillCard;