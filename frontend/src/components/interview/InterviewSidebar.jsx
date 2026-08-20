import {
    Menu,
    Plus,
    MessageSquare,
    Trash2
} from "lucide-react";


const InterviewSidebar = ({
    open,
    onToggle,
    recentChats,
    chatId,
    loadingChats,
    onNewChat,
    onLoadChat,
    onDeleteChat,
    getChatTitle,
    formatDate
}) => {

    return (

        <aside className={`
            flex
            flex-col
            min-h-0
            shrink-0
            bg-[#FCFBF8]
            border-r
            border-[#E8E2D7]
            transition-all
            duration-200
            ${
                open
                    ? "w-64"
                    : "w-16"
            }
        `}>


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                h-16
                shrink-0
                flex
                items-center
                border-b
                border-[#E8E2D7]
                px-3
            ">

                <button
                    type="button"
                    onClick={onToggle}
                    className="
                        h-10
                        w-10
                        shrink-0
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        text-gray-500
                        hover:bg-[#F7F3EA]
                        hover:text-gray-900
                        active:scale-95
                        transition-all
                    "
                    title={
                        open
                            ? "Collapse sidebar"
                            : "Expand sidebar"
                    }
                >

                    <Menu
                        size={19}
                        strokeWidth={1.8}
                    />

                </button>


                {open && (

                    <span className="
                        ml-3
                        text-sm
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        Interview Coach
                    </span>

                )}

            </div>


            {/* =================================================
                NEW CHAT
            ================================================= */}

            <div className="p-3">

                <button
                    type="button"
                    onClick={onNewChat}
                    title={
                        open
                            ? undefined
                            : "New Chat"
                    }
                    className={`
                        group
                        flex
                        items-center
                        rounded-xl
                        border
                        border-[#E8E2D7]
                        bg-white
                        text-sm
                        font-medium
                        text-gray-700
                        shadow-[0_1px_3px_rgba(0,0,0,0.025)]
                        hover:border-[#D6CCBD]
                        hover:bg-[#FDFBF7]
                        hover:shadow-sm
                        active:scale-[0.99]
                        transition-all
                        ${
                            open
                                ? "w-full gap-2 px-3 py-2.5"
                                : "h-10 w-10 justify-center"
                        }
                    `}
                >

                    <Plus
                        size={17}
                        strokeWidth={1.9}
                        className="
                            shrink-0
                            text-gray-600
                            group-hover:text-gray-900
                            transition-colors
                        "
                    />

                    {open && (
                        <span>
                            New Chat
                        </span>
                    )}

                </button>

            </div>


            {/* =================================================
                RECENT
            ================================================= */}

            {open && (

                <div className="
                    px-3
                    pb-2
                ">

                    <p className="
                        px-2
                        text-[10px]
                        font-semibold
                        text-gray-400
                        uppercase
                        tracking-[0.12em]
                    ">
                        Recent
                    </p>

                </div>

            )}


            {/* =================================================
                CHAT LIST
            ================================================= */}

            <div className="
                flex-1
                min-h-0
                overflow-y-auto
                px-2
                pb-3
            ">

                {loadingChats ? (

                    open && (

                        <p className="
                            px-3
                            py-4
                            text-sm
                            text-gray-500
                        ">
                            Loading chats...
                        </p>

                    )

                ) : recentChats.length === 0 ? (

                    open && (

                        <p className="
                            mx-1
                            rounded-xl
                            border
                            border-dashed
                            border-[#DCD4C6]
                            bg-[#F7F3EA]
                            px-3
                            py-4
                            text-sm
                            text-gray-500
                        ">
                            No previous chats.
                        </p>

                    )

                ) : (

                    <div className="
                        space-y-1
                    ">

                        {recentChats.map(
                            chat => (

                                <div
                                    key={
                                        chat._id
                                    }
                                    className={`
                                        group
                                        flex
                                        items-center
                                        w-full
                                        rounded-xl
                                        border
                                        transition-all
                                        ${
                                            chatId === chat._id
                                                ? `
                                                    bg-[#F7F3EA]
                                                    border-[#E8E2D7]
                                                `
                                                : `
                                                    border-transparent
                                                    hover:bg-[#FDFBF7]
                                                    hover:border-[#EFE9DF]
                                                `
                                        }
                                    `}
                                >


                                    {/* =================================================
                                        CHAT
                                    ================================================= */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onLoadChat(
                                                chat._id
                                            )
                                        }
                                        title={
                                            open
                                                ? undefined
                                                : getChatTitle(chat)
                                        }
                                        className={`
                                            flex
                                            items-center
                                            min-w-0
                                            ${
                                                open
                                                    ? "flex-1 text-left px-3 py-2.5"
                                                    : "h-10 w-10 justify-center"
                                            }
                                            ${
                                                chatId === chat._id
                                                    ? "text-gray-900"
                                                    : "text-gray-600"
                                            }
                                        `}
                                    >

                                        <MessageSquare
                                            size={17}
                                            strokeWidth={1.8}
                                            className={`
                                                shrink-0
                                                ${
                                                    chatId === chat._id
                                                        ? "text-gray-800"
                                                        : "text-gray-500"
                                                }
                                            `}
                                        />


                                        {open && (

                                            <div className="
                                                min-w-0
                                                ml-3
                                            ">

                                                <p className="
                                                    text-sm
                                                    font-medium
                                                    text-gray-800
                                                    truncate
                                                ">
                                                    {getChatTitle(
                                                        chat
                                                    )}
                                                </p>


                                                <p className="
                                                    text-[11px]
                                                    text-gray-400
                                                    mt-1
                                                ">
                                                    {formatDate(
                                                        chat.updatedAt
                                                    )}
                                                </p>

                                            </div>

                                        )}

                                    </button>


                                    {/* =================================================
                                        DELETE
                                    ================================================= */}

                                    {open && (

                                        <button
                                            type="button"
                                            onClick={(event) => {

                                                event.stopPropagation();

                                                onDeleteChat(
                                                    chat
                                                );

                                            }}
                                            className="
                                                shrink-0
                                                w-8
                                                h-8
                                                mr-1
                                                rounded-lg
                                                flex
                                                items-center
                                                justify-center
                                                text-gray-400
                                                opacity-0
                                                group-hover:opacity-100
                                                hover:bg-red-50
                                                hover:text-red-600
                                                active:scale-95
                                                transition-all
                                            "
                                            title="Delete chat"
                                        >

                                            <Trash2
                                                size={15}
                                                strokeWidth={1.8}
                                            />

                                        </button>

                                    )}

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </aside>
    );
};


export default InterviewSidebar;