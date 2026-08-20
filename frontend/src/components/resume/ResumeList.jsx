import ResumeCard
    from "./ResumeCard";


const ResumeList = ({
    resumes = [],
    loading = false
}) => {

    if (loading) {

        return (

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-4
            ">

                {[1, 2, 3].map(
                    (item) => (

                        <div
                            key={item}
                            className="
                                h-36
                                rounded-2xl
                                bg-[#F7F3EA]
                                border
                                border-[#E8E2D7]
                                p-5
                                animate-pulse
                            "
                        >

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-[#E8E2D7]
                                " />

                                <div className="
                                    flex-1
                                    space-y-2
                                ">

                                    <div className="
                                        h-3
                                        w-32
                                        rounded
                                        bg-[#E8E2D7]
                                    " />

                                    <div className="
                                        h-2.5
                                        w-24
                                        rounded
                                        bg-[#E8E2D7]
                                    " />

                                </div>

                            </div>


                            <div className="
                                mt-5
                                h-2.5
                                w-20
                                rounded
                                bg-[#E8E2D7]
                            " />

                        </div>

                    )
                )}

            </div>
        );
    }


    if (resumes.length === 0) {

        return (

            <div className="
                bg-[#F7F3EA]
                border
                border-dashed
                border-[#DCD4C6]
                rounded-2xl
                p-10
                text-center
            ">

                <div className="
                    w-11
                    h-11
                    mx-auto
                    rounded-xl
                    bg-white
                    border
                    border-[#E8E2D7]
                    flex
                    items-center
                    justify-center
                    text-gray-400
                ">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="w-5 h-5"
                    >
                        <path
                            d="M6 3h9l3 3v15H6z"
                        />
                        <path
                            d="M14 3v4h4"
                        />
                    </svg>

                </div>


                <h3 className="
                    mt-4
                    text-sm
                    font-semibold
                    text-gray-900
                ">
                    No resumes yet
                </h3>


                <p className="
                    text-sm
                    text-gray-500
                    mt-1.5
                    max-w-sm
                    mx-auto
                ">
                    Upload your first resume to get started.
                </p>

            </div>
        );
    }


    return (

        <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
        ">

            {resumes.map(
                (resume) => (

                    <ResumeCard
                        key={
                            resume._id
                        }
                        resume={
                            resume
                        }
                    />

                )
            )}

        </div>
    );
};


export default ResumeList;