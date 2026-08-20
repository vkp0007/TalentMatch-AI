import {
    Send,
    Plus,
    X,
    FileText
} from "lucide-react";

import ResumeMenu
    from "./ResumeMenu";


const ChatInput = ({
    input,
    setInput,
    sending,
    selectedResume,
    resumes,
    showResumeMenu,
    setShowResumeMenu,
    onSend,
    onSelectResume,
    onRemoveResume,
    inputRef
}) => {


    // =====================================================
    // ENTER TO SEND
    // =====================================================

    const handleKeyDown = (
        event
    ) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            onSend();

        }
    };


    return (

        <div className="
            px-4
            pb-5
            pt-3
            bg-[#FCFBF8]
        ">

            <div className="
                max-w-3xl
                mx-auto
            ">


                {/* =================================================
                    RESUME CHIP
                ================================================= */}

                {selectedResume && (

                    <div className="
                        mb-2.5
                        flex
                    ">

                        <div className="
                            inline-flex
                            items-center
                            gap-2.5
                            bg-white
                            border
                            border-[#E8E2D7]
                            rounded-xl
                            px-3
                            py-2
                            text-xs
                            text-gray-700
                            shadow-[0_1px_2px_rgba(0,0,0,0.03)]
                            max-w-full
                            transition-all
                            hover:border-[#DCD4C6]
                            hover:shadow-sm
                        ">

                            <div className="
                                w-7
                                h-7
                                shrink-0
                                rounded-lg
                                bg-[#F7F3EA]
                                border
                                border-[#E8E2D7]
                                flex
                                items-center
                                justify-center
                                text-gray-600
                            ">

                                <FileText
                                    size={13}
                                    strokeWidth={1.8}
                                />

                            </div>


                            <div className="
                                min-w-0
                            ">

                                <p className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.08em]
                                    font-semibold
                                    text-gray-400
                                ">
                                    Resume context
                                </p>


                                <p className="
                                    max-w-55
                                    truncate
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mt-0.5
                                ">
                                    {
                                        selectedResume.resumeName ||
                                        selectedResume.originalFileName ||
                                        "Resume"
                                    }
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={
                                    onRemoveResume
                                }
                                className="
                                    w-6
                                    h-6
                                    shrink-0
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-400
                                    hover:bg-[#F7F3EA]
                                    hover:text-gray-800
                                    transition-all
                                "
                                title="Remove resume"
                            >

                                <X
                                    size={13}
                                    strokeWidth={1.8}
                                />

                            </button>

                        </div>

                    </div>

                )}


                {/* =================================================
                    COMPOSER
                ================================================= */}

                <div className="
                    flex
                    items-end
                    gap-2
                    px-2.5
                    py-2.5
                    bg-white
                    border
                    border-[#E5DED2]
                    rounded-2xl
                    shadow-[0_2px_8px_rgba(0,0,0,0.035)]
                    focus-within:border-[#CFC5B5]
                    focus-within:shadow-[0_4px_16px_rgba(0,0,0,0.05)]
                    transition-all
                    duration-200
                ">


                    {/* =================================================
                        ADD RESUME
                    ================================================= */}

                    <div className="
                        relative
                        shrink-0
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                setShowResumeMenu(
                                    current =>
                                        !current
                                )
                            }
                            className="
                                w-9
                                h-9
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                text-gray-500
                                border
                                border-transparent
                                hover:bg-[#F7F3EA]
                                hover:border-[#E8E2D7]
                                hover:text-gray-800
                                active:scale-95
                                transition-all
                            "
                            title="Add resume"
                        >

                            <Plus
                                size={18}
                                strokeWidth={1.8}
                            />

                        </button>


                        <ResumeMenu

                            resumes={
                                resumes
                            }

                            open={
                                showResumeMenu
                            }

                            onSelect={
                                onSelectResume
                            }

                        />

                    </div>


                    {/* =================================================
                        MESSAGE INPUT
                    ================================================= */}

                    <textarea

                        ref={
                            inputRef
                        }

                        value={
                            input
                        }

                        onChange={
                            event =>
                                setInput(
                                    event.target.value
                                )
                        }

                        onKeyDown={
                            handleKeyDown
                        }

                        rows={1}

                        disabled={
                            sending
                        }

                        placeholder={
                            "Ask anything about interview preparation..."
                        }

                        className="
                            flex-1
                            min-w-0
                            min-h-10
                            max-h-40
                            resize-none
                            overflow-y-auto
                            border-0
                            outline-none
                            bg-transparent
                            text-sm
                            leading-6
                            text-gray-900
                            placeholder:text-gray-400
                            py-2.5
                            px-1
                            focus:ring-0
                            disabled:opacity-50
                        "

                    />


                    {/* =================================================
                        SEND
                    ================================================= */}

                    <button

                        type="button"

                        onClick={
                            onSend
                        }

                        disabled={
                            sending ||
                            !input.trim()
                        }

                        className="
                            w-9
                            h-9
                            shrink-0
                            rounded-xl
                            bg-gray-900
                            text-white
                            flex
                            items-center
                            justify-center
                            shadow-sm
                            hover:bg-gray-800
                            hover:shadow-md
                            active:scale-95
                            disabled:opacity-25
                            disabled:cursor-not-allowed
                            disabled:hover:shadow-sm
                            transition-all
                            duration-200
                        "

                        title="Send message"

                    >

                        <Send
                            size={15}
                            strokeWidth={1.9}
                        />

                    </button>

                </div>


                {/* =================================================
                    HINT
                ================================================= */}

                <p className="
                    text-center
                    text-[11px]
                    text-gray-400
                    mt-2.5
                ">
                    Enter to send · Shift + Enter for new line
                </p>

            </div>

        </div>
    );
};


export default ChatInput;