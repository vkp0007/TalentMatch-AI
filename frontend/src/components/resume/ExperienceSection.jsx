const ExperienceSection = ({
    experience = []
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
                    Experience
                </h2>

                <p className="
                    text-xs
                    text-gray-500
                    mt-1
                ">
                    Professional experience identified from your resume.
                </p>

            </div>


            {experience.length === 0 ? (

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
                        No professional experience listed.
                    </p>

                </div>

            ) : (

                <div className="space-y-3">

                    {experience.map(
                        (item, index) => (

                            <div
                                key={
                                    item?._id ||
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

                                <h3 className="
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                ">
                                    {
                                        item?.role ||
                                        item?.position ||
                                        "Experience"
                                    }
                                </h3>


                                {item?.company && (

                                    <p className="
                                        text-sm
                                        text-gray-600
                                        mt-1
                                    ">
                                        {item.company}
                                    </p>

                                )}

                            </div>

                        )
                    )}

                </div>

            )}

        </section>
    );
};


export default ExperienceSection;