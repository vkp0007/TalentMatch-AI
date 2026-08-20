const ApplicationEmailForm = ({
    role,
    jobUrl,
    userRequest,
    loading,
    errors,
    onRoleChange,
    onJobUrlChange,
    onUserRequestChange,
    onGenerate
}) => {

    return (

        <section className="
            bg-white
            border
            border-[#E8E2D7]
            rounded-2xl
            p-6
            sm:p-7
            shadow-[0_1px_2px_rgba(0,0,0,0.03)]
            transition-all
            duration-200
            hover:border-[#DDD5C8]
            hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]
        ">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="
                mb-7
                pb-5
                border-b
                border-[#EEE9E1]
            ">


                <h2 className="
                    mt-3
                    text-lg
                    sm:text-xl
                    font-semibold
                    tracking-tight
                    text-gray-900
                ">
                    Create Application Email
                </h2>


                <p className="
                    text-sm
                    leading-6
                    text-gray-500
                    mt-1
                    max-w-xl
                ">
                    Generate a professional job application email.
                </p>

            </div>


            {/* =====================================================
                FORM
            ===================================================== */}

            <div className="
                space-y-6
            ">


                {/* =================================================
                    ROLE
                ================================================= */}

                <div>

                    <label className="
                        flex
                        items-center
                        text-sm
                        font-semibold
                        text-gray-900
                        mb-2
                    ">

                        Role

                        <span className="
                            text-red-500
                            ml-1
                        ">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        value={role}
                        onChange={onRoleChange}
                        placeholder="e.g. Software Engineer"
                        className={`
                            w-full
                            h-11
                            rounded-xl
                            border
                            bg-[#FCFBF8]
                            px-3.5
                            text-sm
                            text-gray-900
                            placeholder:text-gray-400
                            outline-none
                            transition-all
                            duration-200

                            ${
                                errors?.role
                                    ? `
                                        border-red-300
                                        focus:bg-white
                                        focus:border-red-400
                                        focus:ring-4
                                        focus:ring-red-50
                                    `
                                    : `
                                        border-[#E5DED2]
                                        focus:bg-white
                                        focus:border-[#CFC5B5]
                                        focus:ring-4
                                        focus:ring-[#F3EFE7]
                                    `
                            }
                        `}
                    />


                    {errors?.role && (

                        <p className="
                            mt-1.5
                            text-xs
                            text-red-600
                        ">
                            {errors.role}
                        </p>

                    )}

                </div>


                {/* =================================================
                    JOB URL
                ================================================= */}

                <div>

                    <label className="
                        flex
                        items-center
                        text-sm
                        font-semibold
                        text-gray-900
                        mb-2
                    ">

                        Job URL

                        <span className="
                            text-red-500
                            ml-1
                        ">
                            *
                        </span>

                    </label>


                    <input
                        type="url"
                        value={jobUrl}
                        onChange={onJobUrlChange}
                        placeholder="https://..."
                        className={`
                            w-full
                            h-11
                            rounded-xl
                            border
                            bg-[#FCFBF8]
                            px-3.5
                            text-sm
                            text-gray-900
                            placeholder:text-gray-400
                            outline-none
                            transition-all
                            duration-200

                            ${
                                errors?.jobUrl
                                    ? `
                                        border-red-300
                                        focus:bg-white
                                        focus:border-red-400
                                        focus:ring-4
                                        focus:ring-red-50
                                    `
                                    : `
                                        border-[#E5DED2]
                                        focus:bg-white
                                        focus:border-[#CFC5B5]
                                        focus:ring-4
                                        focus:ring-[#F3EFE7]
                                    `
                            }
                        `}
                    />


                    {errors?.jobUrl && (

                        <p className="
                            mt-1.5
                            text-xs
                            text-red-600
                        ">
                            {errors.jobUrl}
                        </p>

                    )}

                </div>


                {/* =================================================
                    ADDITIONAL INSTRUCTIONS
                ================================================= */}

                <div>

                    <label className="
                        flex
                        items-center
                        text-sm
                        font-semibold
                        text-gray-900
                        mb-2
                    ">

                        Additional Instructions

                        <span className="
                            text-red-500
                            ml-1
                        ">
                            *
                        </span>

                    </label>


                    <textarea
                        value={userRequest}
                        onChange={onUserRequestChange}
                        rows={5}
                        placeholder="e.g. Keep it concise and professional. Mention my interest in the role and that my resume is attached."
                        className={`
                            w-full
                            min-h-32
                            rounded-xl
                            border
                            bg-[#FCFBF8]
                            px-3.5
                            py-3
                            text-sm
                            leading-6
                            text-gray-900
                            placeholder:text-gray-400
                            outline-none
                            resize-none
                            transition-all
                            duration-200

                            ${
                                errors?.userRequest
                                    ? `
                                        border-red-300
                                        focus:bg-white
                                        focus:border-red-400
                                        focus:ring-4
                                        focus:ring-red-50
                                    `
                                    : `
                                        border-[#E5DED2]
                                        focus:bg-white
                                        focus:border-[#CFC5B5]
                                        focus:ring-4
                                        focus:ring-[#F3EFE7]
                                    `
                            }
                        `}
                    />


                    {errors?.userRequest && (

                        <p className="
                            mt-1.5
                            text-xs
                            text-red-600
                        ">
                            {errors.userRequest}
                        </p>

                    )}

                </div>


                {/* =================================================
                    REQUIRED
                ================================================= */}

                <div className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    text-gray-400
                ">

                    <span className="
                        text-red-500
                        font-medium
                    ">
                        *
                    </span>

                    Required fields

                </div>


                {/* =================================================
                    GENERATE
                ================================================= */}

                <button
                    type="button"
                    onClick={onGenerate}
                    disabled={
                        loading ||
                        !role?.trim() ||
                        !jobUrl?.trim() ||
                        !userRequest?.trim()
                    }
                    className="
                        w-full
                        min-h-11
                        px-5
                        py-3
                        rounded-xl
                        bg-gray-900
                        text-white
                        text-sm
                        font-medium
                        shadow-sm
                        hover:bg-gray-800
                        hover:shadow-md
                        hover:-translate-y-0.5
                        active:translate-y-0
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        disabled:hover:translate-y-0
                        disabled:hover:shadow-sm
                        transition-all
                        duration-200
                    "
                >

                    {loading
                        ? "Generating..."
                        : "Generate Application Email"}

                </button>

            </div>

        </section>
    );
};


export default ApplicationEmailForm;