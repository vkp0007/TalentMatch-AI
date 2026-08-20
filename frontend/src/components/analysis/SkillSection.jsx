import {
    Check,
    X
} from "lucide-react";


const SkillSection = ({
    title,
    skills = [],
    emptyText,
    variant = "neutral"
}) => {

    const styles = {

        matched: {
            container: "border-emerald-100",
            icon: "bg-emerald-50 text-emerald-600 border-emerald-100",
            badge: "bg-white border-emerald-100 text-gray-700"
        },

        missing: {
            container: "border-red-100",
            icon: "bg-red-50 text-red-600 border-red-100",
            badge: "bg-white border-red-100 text-gray-700"
        },

        neutral: {
            container: "border-[#E8E2D7]",
            icon: "bg-gray-50 text-gray-500 border-gray-200",
            badge: "bg-white border-gray-200 text-gray-700"
        }

    };


    const style =
        styles[variant] ||
        styles.neutral;


    const Icon =
        variant === "matched"
            ? Check
            : variant === "missing"
                ? X
                : null;


    return (

        <section className={`
            bg-white
            border
            ${style.container}
            rounded-2xl
            p-5
            sm:p-6
        `}>

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                gap-3
                mb-5
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    {Icon && (

                        <div className={`
                            w-9
                            h-9
                            shrink-0
                            rounded-xl
                            border
                            flex
                            items-center
                            justify-center
                            ${style.icon}
                        `}>

                            <Icon
                                size={15}
                                strokeWidth={2.2}
                            />

                        </div>

                    )}


                    <div>

                        <h2 className="
                            text-sm
                            font-semibold
                            text-gray-900
                        ">
                            {title}
                        </h2>

                        <p className="
                            text-xs
                            text-gray-400
                            mt-0.5
                        ">
                            {variant === "matched"
                                ? "Skills found in your resume"
                                : variant === "missing"
                                    ? "Skills to consider developing"
                                    : "Relevant skills"
                            }
                        </p>

                    </div>

                </div>


                <span className="
                    shrink-0
                    min-w-7
                    h-7
                    px-2
                    rounded-lg
                    bg-gray-50
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-semibold
                    text-gray-600
                ">
                    {skills.length}
                </span>

            </div>


            {/* CONTENT */}

            {skills.length === 0 ? (

                <div className="
                    rounded-xl
                    bg-[#F7F3EA]/60
                    border
                    border-dashed
                    border-[#DCD4C6]
                    px-4
                    py-6
                    text-center
                ">

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        {emptyText}
                    </p>

                </div>

            ) : (

                <div className="
                    flex
                    flex-wrap
                    gap-2
                ">

                    {skills.map(
                        (skill, index) => (

                            <span
                                key={index}
                                className={`
                                    inline-flex
                                    items-center
                                    px-3
                                    py-1.5
                                    rounded-lg
                                    border
                                    text-xs
                                    font-medium
                                    ${style.badge}
                                    hover:shadow-sm
                                    transition
                                `}
                            >
                                {skill}
                            </span>

                        )
                    )}

                </div>

            )}

        </section>
    );
};


export default SkillSection;