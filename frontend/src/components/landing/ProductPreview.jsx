const ProductPreview = () => {

    return (

        <div className="
            relative
        ">

            <div className="
                absolute
                -inset-6
                bg-white/50
                rounded-4xl
                blur-2xl
            " />


            <div className="
                relative
                bg-white
                border
                border-[#E8E2D7]
                rounded-3xl
                shadow-xl
                overflow-hidden
            ">


                {/* HEADER */}

                <div className="
                    px-5
                    py-4
                    border-b
                    border-gray-100
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <p className="
                            text-xs
                            text-gray-400
                        ">
                            Resume Analysis
                        </p>


                        <p className="
                            mt-1
                            text-sm
                            font-semibold
                        ">
                            Software Engineer
                        </p>

                    </div>


                    <span className="
                        px-2.5
                        py-1
                        rounded-full
                        bg-green-50
                        border
                        border-green-100
                        text-xs
                        font-medium
                        text-green-700
                    ">
                        82% Match
                    </span>

                </div>


                {/* CONTENT */}

                <div className="
                    p-5
                ">


                    {/* SCORE */}

                    <div className="
                        flex
                        items-center
                        gap-5
                    ">

                        <div className="
                            w-24
                            h-24
                            rounded-full
                            border-[7px]
                            border-gray-900
                            flex
                            items-center
                            justify-center
                            shrink-0
                        ">

                            <div className="
                                text-center
                            ">

                                <p className="
                                    text-2xl
                                    font-semibold
                                ">
                                    82
                                </p>

                                <p className="
                                    text-[10px]
                                    text-gray-400
                                ">
                                    MATCH
                                </p>

                            </div>

                        </div>


                        <div>

                            <p className="
                                text-sm
                                font-semibold
                            ">
                                Strong match
                            </p>


                            <p className="
                                mt-1
                                text-xs
                                leading-5
                                text-gray-500
                            ">
                                Your background aligns
                                well with this role.
                            </p>

                        </div>

                    </div>


                    {/* SKILLS */}

                    <div className="
                        mt-7
                    ">

                        <p className="
                            text-xs
                            font-semibold
                            text-gray-500
                            uppercase
                            tracking-wide
                        ">
                            Matched Skills
                        </p>


                        <div className="
                            mt-3
                            flex
                            flex-wrap
                            gap-2
                        ">

                            {[
                                "React",
                                "Node.js",
                                "Python",
                                "REST APIs"
                            ].map(skill => (

                                <span
                                    key={skill}
                                    className="
                                        px-3
                                        py-1.5
                                        rounded-full
                                        bg-gray-50
                                        border
                                        border-gray-200
                                        text-xs
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    ✓ {skill}
                                </span>

                            ))}

                        </div>

                    </div>


                    {/* RECOMMENDATION */}

                    <div className="
                        mt-6
                        pt-5
                        border-t
                        border-gray-100
                    ">

                        <p className="
                            text-xs
                            font-semibold
                            text-gray-500
                            uppercase
                            tracking-wide
                        ">
                            AI Recommendation
                        </p>


                        <div className="
                            mt-3
                            rounded-xl
                            bg-[#F7F3EA]
                            border
                            border-[#E8E2D7]
                            p-4
                        ">

                            <p className="
                                text-sm
                                font-medium
                            ">
                                Strengthen Docker knowledge
                            </p>


                            <p className="
                                mt-1
                                text-xs
                                leading-5
                                text-gray-500
                            ">
                                Prioritize this skill based
                                on the target role requirements.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default ProductPreview;