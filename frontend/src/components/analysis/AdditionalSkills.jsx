import {
    Sparkles
} from "lucide-react";


const AdditionalSkills = ({
    skills = []
}) => {

    return (

        <section className="
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            rounded-2xl
            p-5
            sm:p-6
        ">

            {/* HEADER */}

            <div className="
                flex
                items-start
                justify-between
                gap-4
                mb-5
            ">

                <div className="
                    flex
                    items-start
                    gap-3
                ">

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
                        text-gray-600
                    ">

                        <Sparkles
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
                            Additional Skills
                        </h2>

                        <p className="
                            text-xs
                            text-gray-500
                            mt-1
                        ">
                            Skills identified beyond the
                            primary requirements.
                        </p>

                    </div>

                </div>


                {skills.length > 0 && (

                    <span className="
                        shrink-0
                        min-w-7
                        h-7
                        px-2
                        rounded-lg
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-semibold
                        text-gray-600
                    ">
                        {skills.length}
                    </span>

                )}

            </div>


            {skills.length === 0 ? (

                <div className="
                    rounded-xl
                    bg-white/70
                    border
                    border-dashed
                    border-[#DCD4C6]
                    px-5
                    py-6
                    text-center
                ">

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        No additional skills identified.
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
                                className="
                                    inline-flex
                                    items-center
                                    px-3
                                    py-1.5
                                    rounded-lg
                                    bg-white
                                    border
                                    border-[#E2DACC]
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    hover:border-gray-400
                                    transition
                                "
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


export default AdditionalSkills;