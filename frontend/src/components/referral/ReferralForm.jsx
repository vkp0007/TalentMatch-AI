import {
    Sparkles
} from "lucide-react";


const ReferralForm = ({
    recipientName,
    companyName,
    role,
    jobUrl,
    customContext,
    loading,
    onRecipientNameChange,
    onCompanyChange,
    onRoleChange,
    onJobUrlChange,
    onContextChange,
    onGenerate
}) => {

    const inputClass = `
        w-full
        h-11
        px-3.5
        rounded-xl
        border
        border-[#E8E2D7]
        bg-white
        text-sm
        text-gray-900
        placeholder:text-gray-400
        outline-none
        transition-all
        duration-200
        focus:border-[#CFC5B5]
        focus:ring-4
        focus:ring-[#F7F3EA]
        disabled:bg-gray-50
        disabled:text-gray-400
        disabled:cursor-not-allowed
    `;


    return (

        <section className="
            w-full
            bg-white
            border
            border-[#E8E2D7]
            rounded-2xl
            shadow-sm
            overflow-hidden
            transition-shadow
            duration-200
            hover:shadow-md
        ">

            {/* =================================================
                FORM HEADER
            ================================================= */}

            <div className="
                px-6
                py-5
                bg-[#F7F3EA]/60
                border-b
                border-[#E8E2D7]
            ">

                <div className="
                    flex
                    items-center
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
                        text-gray-700
                    ">

                        <Sparkles
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div>

                        <h2 className="
                            text-sm
                            font-semibold
                            tracking-tight
                            text-gray-900
                        ">
                            Create Referral Draft
                        </h2>

                        <p className="
                            mt-0.5
                            text-xs
                            text-gray-500
                        ">
                            Provide a few details and let AI craft your request.
                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                FORM CONTENT
            ================================================= */}

            <div className="
                px-6
                py-6
                space-y-5
            ">

                {/* =================================================
                    RECIPIENT
                ================================================= */}

                <div>

                    <label className="
                        block
                        text-xs
                        font-semibold
                        text-gray-700
                        mb-2
                    ">

                        Recipient Name

                        <span className="
                            ml-1.5
                            text-[11px]
                            font-normal
                            text-gray-400
                        ">
                            Optional
                        </span>

                    </label>


                    <input
                        type="text"
                        value={recipientName}
                        onChange={onRecipientNameChange}
                        disabled={loading}
                        placeholder="e.g. Rahul"
                        className={inputClass}
                    />

                </div>


                {/* =================================================
                    COMPANY + ROLE
                ================================================= */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                ">

                    {/* COMPANY */}

                    <div>

                        <label className="
                            block
                            text-xs
                            font-semibold
                            text-gray-700
                            mb-2
                        ">

                            Company

                            <span className="
                                ml-1
                                text-red-500
                            ">
                                *
                            </span>

                        </label>


                        <input
                            type="text"
                            value={companyName}
                            onChange={onCompanyChange}
                            disabled={loading}
                            placeholder="e.g. Microsoft"
                            className={inputClass}
                        />

                    </div>


                    {/* ROLE */}

                    <div>

                        <label className="
                            block
                            text-xs
                            font-semibold
                            text-gray-700
                            mb-2
                        ">

                            Role

                            <span className="
                                ml-1
                                text-red-500
                            ">
                                *
                            </span>

                        </label>


                        <input
                            type="text"
                            value={role}
                            onChange={onRoleChange}
                            disabled={loading}
                            placeholder="e.g. Software Engineer"
                            className={inputClass}
                        />

                    </div>

                </div>


                {/* =================================================
                    JOB URL
                ================================================= */}

                <div>

                    <label className="
                        block
                        text-xs
                        font-semibold
                        text-gray-700
                        mb-2
                    ">

                        Job URL

                        <span className="
                            ml-1
                            text-red-500
                        ">
                            *
                        </span>

                    </label>


                    <input
                        type="url"
                        value={jobUrl}
                        onChange={onJobUrlChange}
                        disabled={loading}
                        placeholder="https://company.com/jobs/..."
                        className={inputClass}
                    />


                    <p className="
                        mt-1.5
                        text-[11px]
                        text-gray-400
                    ">
                        Add the job posting you're requesting a referral for.
                    </p>

                </div>


                {/* =================================================
                    REFERRAL CONTEXT
                ================================================= */}

                <div>

                    <label className="
                        block
                        text-xs
                        font-semibold
                        text-gray-700
                        mb-2
                    ">

                        Referral Context

                        <span className="
                            ml-1
                            text-red-500
                        ">
                            *
                        </span>

                    </label>


                    <textarea
                        value={customContext}
                        onChange={onContextChange}
                        disabled={loading}
                        rows={4}
                        placeholder="Mention your connection, why you're interested, relevant background, or anything specific you want included..."
                        className="
                            w-full
                            px-3.5
                            py-3
                            rounded-xl
                            border
                            border-[#E8E2D7]
                            bg-white
                            text-sm
                            leading-6
                            text-gray-900
                            placeholder:text-gray-400
                            outline-none
                            resize-none
                            transition-all
                            duration-200
                            focus:border-[#CFC5B5]
                            focus:ring-4
                            focus:ring-[#F7F3EA]
                            disabled:bg-gray-50
                            disabled:text-gray-400
                            disabled:cursor-not-allowed
                        "
                    />

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    pt-1
                ">

                    <p className="
                        text-[11px]
                        text-gray-400
                    ">

                        <span className="
                            text-red-500
                        ">
                            *
                        </span>

                        {" "}Required fields

                    </p>


                    <p className="
                        hidden
                        sm:block
                        text-[11px]
                        text-gray-400
                    ">
                        AI-generated draft
                    </p>

                </div>


                {/* =================================================
                    GENERATE
                ================================================= */}

                <button
                    type="button"
                    onClick={onGenerate}
                    disabled={
                        loading ||
                        !companyName.trim() ||
                        !role.trim() ||
                        !jobUrl.trim() ||
                        !customContext.trim()
                    }
                    className="
                        w-full
                        h-11
                        rounded-xl
                        bg-gray-900
                        text-white
                        text-sm
                        font-medium
                        shadow-sm
                        hover:bg-gray-800
                        hover:shadow-md
                        active:bg-gray-950
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        transition-all
                        duration-200
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >

                    <Sparkles
                        size={15}
                        strokeWidth={1.8}
                    />

                    {loading
                        ? "Generating Referral..."
                        : "Generate Referral Draft"}

                </button>

            </div>

        </section>
    );
};


export default ReferralForm;