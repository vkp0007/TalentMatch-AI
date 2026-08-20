import {
    Check,
    Copy,
    FileText,
    Sparkles
} from "lucide-react";

import ApplicationEmailRefine
    from "./ApplicationEmailRefine.jsx";


const ApplicationEmailResult = ({
    subject,
    setSubject,
    email,
    setEmail,
    copied,
    selectedEmail,
    refining,
    refineInstruction,
    setRefineInstruction,
    onCopy,
    onRefine
}) => {

    if (!email) {

        return null;
    }


    return (

        <section className="
            bg-white
            border
            border-[#E8E2D7]
            rounded-2xl
            shadow-[0_1px_2px_rgba(0,0,0,0.03)]
            overflow-hidden
            transition-all
            duration-200
            hover:border-[#DDD5C8]
            hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]
        ">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                px-6
                py-5
                border-b
                border-[#EEE9E1]
                bg-[#FCFBF8]
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                ">

                    <div className="
                        w-10
                        h-10
                        shrink-0
                        rounded-xl
                        bg-[#F7F3EA]
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-700
                    ">

                        <FileText
                            size={17}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div className="
                        min-w-0
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                            flex-wrap
                        ">

                            <h2 className="
                                text-sm
                                font-semibold
                                text-gray-900
                            ">
                                Application Email
                            </h2>


                            <span className="
                                inline-flex
                                items-center
                                gap-1
                                px-2
                                py-0.5
                                rounded-full
                                bg-[#F7F3EA]
                                border
                                border-[#E8E2D7]
                                text-[10px]
                                font-medium
                                text-gray-600
                            ">

                                <Sparkles
                                    size={10}
                                    strokeWidth={1.8}
                                />

                                AI Draft

                            </span>

                        </div>


                        <p className="
                            text-xs
                            text-gray-400
                            mt-1
                        ">
                            Review, edit, or refine your application email.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    COPY
                ================================================= */}

                <button
                    type="button"
                    onClick={onCopy}
                    className="
                        shrink-0
                        inline-flex
                        items-center
                        justify-center
                        gap-1.5
                        px-3.5
                        py-2
                        rounded-xl
                        border
                        border-[#E2DACC]
                        bg-white
                        text-xs
                        font-medium
                        text-gray-700
                        shadow-sm
                        hover:bg-[#F7F3EA]
                        hover:border-[#D5CBBB]
                        hover:text-gray-900
                        hover:shadow-md
                        transition-all
                        duration-200
                    "
                >

                    {copied ? (

                        <>

                            <Check
                                size={14}
                                strokeWidth={2}
                            />

                            Copied

                        </>

                    ) : (

                        <>

                            <Copy
                                size={14}
                                strokeWidth={1.8}
                            />

                            Copy

                        </>

                    )}

                </button>

            </div>


            {/* =================================================
                EDITOR
            ================================================= */}

            <div className="
                p-6
                sm:p-7
            ">


                {/* =================================================
                    SUBJECT
                ================================================= */}

                <div className="
                    mb-5
                ">

                    <label className="
                        block
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-gray-500
                        mb-2
                    ">
                        Subject
                    </label>


                    <input
                        type="text"
                        value={subject || ""}
                        onChange={event =>
                            setSubject(
                                event.target.value
                            )
                        }
                        className="
                            w-full
                            h-11
                            px-3.5
                            rounded-xl
                            border
                            border-[#E5DED2]
                            bg-[#FCFBF8]
                            text-sm
                            text-gray-900
                            outline-none
                            focus:bg-white
                            focus:border-[#CFC5B5]
                            focus:ring-4
                            focus:ring-[#F3EFE7]
                            transition-all
                            duration-200
                        "
                    />

                </div>


                {/* =================================================
                    EMAIL BODY
                ================================================= */}

                <div>

                    <label className="
                        block
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-gray-500
                        mb-2
                    ">
                        Email
                    </label>


                    <div className="
                        rounded-xl
                        border
                        border-[#E5DED2]
                        bg-[#FCFBF8]
                        overflow-hidden
                        focus-within:bg-white
                        focus-within:border-[#CFC5B5]
                        focus-within:ring-4
                        focus-within:ring-[#F3EFE7]
                        transition-all
                        duration-200
                    ">

                        <textarea
                            value={email}
                            onChange={event =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            rows={10}
                            spellCheck={true}
                            className="
                                w-full
                                min-h-64
                                bg-transparent
                                border-none
                                outline-none
                                resize-y
                                px-4
                                py-4
                                text-sm
                                leading-7
                                text-gray-800
                                placeholder:text-gray-400
                            "
                        />

                    </div>

                </div>


                {/* =================================================
                    CHARACTER COUNT
                ================================================= */}

                <div className="
                    flex
                    justify-end
                    mt-2
                ">

                    <p className="
                        text-[11px]
                        text-gray-400
                    ">
                        {email.length} characters
                    </p>

                </div>


                {/* =================================================
                    REFINE
                ================================================= */}

                {selectedEmail && (

                    <ApplicationEmailRefine

                        instruction={
                            refineInstruction
                        }

                        setInstruction={
                            setRefineInstruction
                        }

                        refining={
                            refining
                        }

                        onRefine={
                            onRefine
                        }

                    />

                )}

            </div>

        </section>
    );
};


export default ApplicationEmailResult;