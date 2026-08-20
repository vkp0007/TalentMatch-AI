const EducationSection = ({
    education = []
}) => {

    return (

        <section className="
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            rounded-2xl
            p-6
            mb-6
            shadow-sm
            transition-all
            duration-200
            hover:border-[#DCD4C6]
            hover:shadow-md
        ">

            <div className="mb-6">

                <h2 className="
                    text-lg
                    font-semibold
                    tracking-tight
                    text-gray-900
                ">
                    Education
                </h2>

                <p className="
                    text-xs
                    text-gray-500
                    mt-1
                ">
                    Academic qualifications identified from your resume.
                </p>

            </div>


            {education.length === 0 ? (

                <div className="
                    rounded-xl
                    border
                    border-dashed
                    border-[#DCD4C6]
                    bg-white/60
                    px-5
                    py-5
                ">

                    <p className="
                        text-sm
                        text-gray-400
                    ">
                        No education information listed.
                    </p>

                </div>

            ) : (

                <div className="space-y-3">

                    {education.map(
                        (item, index) => (

                            <div
                                key={
                                    item._id ||
                                    index
                                }
                                className="
                                    rounded-xl
                                    bg-white
                                    border
                                    border-[#E8E2D7]
                                    p-4
                                    transition
                                    hover:border-[#DCD4C6]
                                    hover:shadow-sm
                                "
                            >

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                ">

                                    <div className="min-w-0">

                                        <h3 className="
                                            text-sm
                                            font-semibold
                                            text-gray-900
                                        ">
                                            {item.degree ||
                                                "Education"}
                                        </h3>


                                        {item.institution && (

                                            <p className="
                                                text-sm
                                                text-gray-600
                                                mt-1
                                            ">
                                                {item.institution}
                                            </p>

                                        )}

                                    </div>


                                    {item.year && (

                                        <span className="
                                            shrink-0
                                            px-2.5
                                            py-1
                                            rounded-full
                                            bg-[#F7F3EA]
                                            border
                                            border-[#E8E2D7]
                                            text-xs
                                            font-medium
                                            text-gray-500
                                        ">
                                            {item.year}
                                        </span>

                                    )}

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </section>
    );
};


export default EducationSection;