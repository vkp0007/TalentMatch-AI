import {
    Bot,
    User
} from "lucide-react";


const ChatMessage = ({
    message
}) => {

    const isUser =
        message.role === "user";


    return (

        <div
            className={
                isUser
                    ? "flex justify-end"
                    : "flex justify-start"
            }
        >

            <div className={`
                flex
                items-start
                gap-3
                max-w-[85%]
                sm:max-w-[75%]
                ${
                    isUser
                        ? "flex-row-reverse"
                        : ""
                }
            `}>


                {/* =================================================
                    AVATAR
                ================================================= */}

                <div className={`
                    w-8
                    h-8
                    shrink-0
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${
                        isUser
                            ? `
                                bg-gray-900
                                text-white
                                shadow-sm
                            `
                            : `
                                bg-[#F7F3EA]
                                border
                                border-[#E8E2D7]
                                text-gray-600
                            `
                    }
                `}>

                    {isUser ? (

                        <User
                            size={14}
                            strokeWidth={1.9}
                        />

                    ) : (

                        <Bot
                            size={15}
                            strokeWidth={1.8}
                        />

                    )}

                </div>


                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div
                    className={
                        isUser
                            ? `
                                bg-gray-900
                                text-white
                                rounded-2xl
                                rounded-tr-md
                                px-4
                                py-3
                                text-sm
                                leading-6
                                whitespace-pre-wrap
                                shadow-[0_2px_6px_rgba(0,0,0,0.08)]
                            `
                            : `
                                bg-white
                                border
                                border-[#E8E2D7]
                                text-gray-800
                                rounded-2xl
                                rounded-tl-md
                                px-4
                                py-3
                                text-sm
                                leading-6
                                whitespace-pre-wrap
                                shadow-[0_1px_4px_rgba(0,0,0,0.035)]
                            `
                    }
                >

                    {message.content}

                </div>

            </div>

        </div>
    );
};


export default ChatMessage;