import {
    Check,
    Copy,
    FileText,
    Sparkles
} from "lucide-react";


import ReferralRefine
    from "./ReferralRefine";


const ReferralResult = ({
    draft,
    setDraft,
    copied,
    refining,
    refineInstruction,
    setRefineInstruction,
    onCopy,
    onRefine,
    title = "Generated Referral"
}) => {

    if (!draft) {
        return null;
    }


    return (

        <section className="
            mt-8
            bg-white
            border
            border-[#E8E2D7]
            rounded-2xl
            shadow-sm
            overflow-hidden
        ">

            {/* HEADER */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                px-6
                py-4
                border-b
                border-[#E8E2D7]
                bg-[#F7F3EA]/60
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    min-w-0
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

                        <FileText
                            size={16}
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
                                tracking-tight
                                text-gray-900
                            ">
                                {title}
                            </h2>


                            <span className="
                                inline-flex
                                items-center
                                gap-1
                                px-2
                                py-0.5
                                rounded-full
                                bg-white
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
                            mt-0.5
                        ">
                            Review, edit, or refine your message before sending.
                        </p>

                    </div>

                </div>


                {/* COPY */}

                <button
                    type="button"
                    onClick={onCopy}
                    className="
                        shrink-0
                        inline-flex
                        items-center
                        justify-center
                        gap-1.5
                        px-3
                        py-2
                        rounded-lg
                        border
                        border-[#E8E2D7]
                        bg-white
                        text-xs
                        font-medium
                        text-gray-700
                        hover:bg-[#F7F3EA]
                        hover:border-[#DCD4C6]
                        hover:text-gray-900
                        active:bg-[#F7F3EA]
                        transition-all
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


            {/* EDITOR */}

            <div className="
                p-5
            ">

                <div className="
                    rounded-xl
                    border
                    border-[#E8E2D7]
                    bg-[#F7F3EA]/40
                    focus-within:bg-white
                    focus-within:border-[#DCD4C6]
                    focus-within:ring-4
                    focus-within:ring-[#F7F3EA]
                    transition-all
                ">

                    <textarea
                        value={draft}
                        onChange={event =>
                            setDraft(
                                event.target.value
                            )
                        }
                        spellCheck={true}
                        className="
                            w-full
                            h-64
                            max-h-64
                            overflow-y-auto
                            bg-transparent
                            border-none
                            outline-none
                            resize-none
                            rounded-xl
                            px-4
                            py-4
                            text-sm
                            leading-7
                            text-gray-800
                            placeholder:text-gray-400
                        "
                    />

                </div>


                {/* CHARACTER COUNT */}

                <div className="
                    flex
                    justify-end
                    mt-2
                ">

                    <p className="
                        text-[11px]
                        text-gray-400
                    ">
                        {draft.length} characters
                    </p>

                </div>


                {/* REFINE */}

                <ReferralRefine

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

            </div>

        </section>
    );
};


export default ReferralResult;