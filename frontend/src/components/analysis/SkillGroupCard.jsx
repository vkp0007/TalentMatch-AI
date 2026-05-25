const SkillGroupCard = ({
    title,
    icon: Icon,
    skills = []
}) => {

    return (

        <div
            className="

            bg-white
            border
            border-slate-200
            rounded-3xl
            p-6
            h-90
            flex
            flex-col

            "
        >

            {/* HEADER */}

            <div
                className="flex items-center gap-3 mb-5"
            >

                <div
                    className="

                    bg-slate-100
                    p-2.5
                    rounded-xl

                    "
                >

                    <Icon
                        size={20}
                        className="text-slate-900"
                    />

                </div>

                <h2
                    className="

                    text-lg
                    font-semibold
                    text-slate-900

                    "
                >
                    {title}
                </h2>

            </div>


            {/* SKILLS */}

            <div
                className="

                flex
                flex-wrap
                gap-2
                overflow-y-auto
                pr-1

                "
            >

                {
                    skills.length === 0
                    ?
                    (
                        <p className="text-sm text-slate-400">
                            No skills found
                        </p>
                    )
                    :
                    (
                        skills.map((skill, idx) => (

                            <span
                                key={idx}
                                className="

                                bg-slate-100
                                text-slate-900
                                px-3
                                py-1.5
                                rounded-xl
                                text-sm

                                "
                            >
                                {skill}
                            </span>
                        ))
                    )
                }

            </div>

        </div>
    );
};

export default SkillGroupCard;