import {
    LoaderCircle,
    Bot
} from "lucide-react";

import ChatMessage
    from "./ChatMessage";

import InterviewEmptyState
    from "./InterviewEmptyState";


const ChatMessages = ({
    messages,
    sending,
    loadingChat,
    messagesEndRef,
    onPrompt
}) => {

    return (

        <div className="
            flex-1
            min-h-0
            overflow-y-auto
            bg-[#FCFBF8]
        ">

            <div className="
                max-w-3xl
                mx-auto
                px-4
                py-8
            ">


                {/* =================================================
                    LOADING CHAT
                ================================================= */}

                {loadingChat ? (

                    <div className="
                        min-h-[60vh]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-2xl
                            bg-[#F7F3EA]
                            border
                            border-[#E8E2D7]
                            shadow-sm
                            flex
                            items-center
                            justify-center
                            text-gray-600
                        ">

                            <LoaderCircle
                                size={19}
                                strokeWidth={1.7}
                                className="
                                    animate-spin
                                "
                            />

                        </div>


                        <p className="
                            mt-4
                            text-sm
                            font-semibold
                            text-gray-800
                        ">
                            Loading conversation
                        </p>


                        <p className="
                            mt-1.5
                            text-xs
                            text-gray-400
                        ">
                            Getting your interview session ready...
                        </p>

                    </div>

                ) : messages.length === 0 ? (

                    /* =================================================
                        EMPTY STATE
                    ================================================= */

                    <InterviewEmptyState
                        onPrompt={
                            onPrompt
                        }
                    />

                ) : (

                    /* =================================================
                        MESSAGES
                    ================================================= */

                    <div className="
                        space-y-7
                    ">

                        {messages.map(
                            (message, index) => (

                                <ChatMessage
                                    key={
                                        message._id ||
                                        index
                                    }
                                    message={
                                        message
                                    }
                                />

                            )
                        )}


                        {/* =================================================
                            THINKING STATE
                        ================================================= */}

                        {sending && (

                            <div className="
                                flex
                                items-start
                                gap-3
                            ">

                                {/* ASSISTANT ICON */}

                                <div className="
                                    w-8
                                    h-8
                                    shrink-0
                                    rounded-xl
                                    bg-[#F7F3EA]
                                    border
                                    border-[#E8E2D7]
                                    shadow-sm
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-600
                                ">

                                    <Bot
                                        size={15}
                                        strokeWidth={1.8}
                                    />

                                </div>


                                {/* TYPING INDICATOR */}

                                <div className="
                                    min-h-8
                                    flex
                                    items-center
                                    gap-1.5
                                    px-3
                                    py-1
                                    rounded-xl
                                ">

                                    <span className="
                                        w-1.5
                                        h-1.5
                                        rounded-full
                                        bg-gray-400
                                        animate-pulse
                                    " />

                                    <span className="
                                        w-1.5
                                        h-1.5
                                        rounded-full
                                        bg-gray-400
                                        animate-pulse
                                        [animation-delay:150ms]
                                    " />

                                    <span className="
                                        w-1.5
                                        h-1.5
                                        rounded-full
                                        bg-gray-400
                                        animate-pulse
                                        [animation-delay:300ms]
                                    " />

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            SCROLL TARGET
                        ================================================= */}

                        <div
                            ref={
                                messagesEndRef
                            }
                        />

                    </div>

                )}

            </div>

        </div>
    );
};


export default ChatMessages;