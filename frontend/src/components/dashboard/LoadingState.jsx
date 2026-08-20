const LoadingState = () => {

    return (

        <div className="
            space-y-8
            animate-pulse
        ">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">

                <div className="space-y-2">

                    <div className="
                        h-3
                        w-24
                        bg-[#E8E2D7]
                        rounded-full
                    " />

                    <div className="
                        h-8
                        w-32
                        bg-gray-200
                        rounded-lg
                    " />

                    <div className="
                        h-4
                        w-64
                        bg-gray-100
                        rounded
                    " />

                </div>


                <div className="
                    h-10
                    w-32
                    bg-gray-200
                    rounded-xl
                " />

            </div>


            {/* =================================================
                RESUMES
            ================================================= */}

            <section>

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-4
                ">

                    <div className="space-y-2">

                        <div className="
                            h-5
                            w-32
                            bg-gray-200
                            rounded
                        " />

                        <div className="
                            h-3
                            w-56
                            bg-gray-100
                            rounded
                        " />

                    </div>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-4
                ">

                    {[1, 2, 3].map(item => (

                        <div
                            key={item}
                            className="
                                bg-white
                                border
                                border-[#E8E2D7]
                                rounded-2xl
                                p-5
                                h-40
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
                                        h-4
                                        w-32
                                        bg-gray-200
                                        rounded
                                    " />

                                    <div className="
                                        h-3
                                        w-24
                                        bg-gray-100
                                        rounded
                                    " />

                                </div>

                            </div>


                            <div className="
                                mt-6
                                pt-4
                                border-t
                                border-gray-100
                            ">

                                <div className="
                                    h-3
                                    w-20
                                    bg-gray-100
                                    rounded
                                " />

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* =================================================
                ANALYSES
            ================================================= */}

            <section>

                <div className="
                    space-y-2
                    mb-4
                ">

                    <div className="
                        h-5
                        w-36
                        bg-gray-200
                        rounded
                    " />

                    <div className="
                        h-3
                        w-52
                        bg-gray-100
                        rounded
                    " />

                </div>


                <div className="
                    bg-white
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    overflow-hidden
                ">

                    {[1, 2, 3, 4].map(item => (

                        <div
                            key={item}
                            className="
                                flex
                                items-center
                                justify-between
                                gap-5
                                px-5
                                py-4
                                border-b
                                border-gray-100
                                last:border-b-0
                            "
                        >

                            <div className="
                                flex-1
                                space-y-2
                            ">

                                <div className="
                                    h-4
                                    w-40
                                    bg-gray-200
                                    rounded
                                " />

                                <div className="
                                    h-3
                                    w-52
                                    bg-gray-100
                                    rounded
                                " />

                            </div>


                            <div className="
                                h-7
                                w-12
                                bg-gray-100
                                rounded-lg
                            " />

                        </div>

                    ))}

                </div>

            </section>

        </div>
    );
};


export default LoadingState;