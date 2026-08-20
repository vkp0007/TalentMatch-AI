import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    createInterviewChat,
    getInterviewChats,
    getInterviewChat,
    sendInterviewMessage,
    deleteInterviewChat
} from "../../api/interviewChat.api";

import { getResumes } from "../../api/resume.api.js";

import InterviewSidebar
    from "../../components/interview/InterviewSidebar";

import ChatMessages
    from "../../components/interview/ChatMessages";

import ChatInput
    from "../../components/interview/ChatInput";


const InterviewCoach = () => {

    // =====================================================
    // SIDEBAR
    // =====================================================

    const [sidebarOpen, setSidebarOpen] =
        useState(true);


    // =====================================================
    // CHAT STATE
    // =====================================================

    const [chatId, setChatId] =
        useState(null);

    const [messages, setMessages] =
        useState([]);

    const [input, setInput] =
        useState("");

    const [recentChats, setRecentChats] =
        useState([]);


    // =====================================================
    // RESUME STATE
    // =====================================================

    const [resumes, setResumes] =
        useState([]);

    const [selectedResume, setSelectedResume] =
        useState(null);

    const [showResumeMenu, setShowResumeMenu] =
        useState(false);


    // =====================================================
    // LOADING / ERROR
    // =====================================================

    const [sending, setSending] =
        useState(false);

    const [loadingChat, setLoadingChat] =
        useState(false);

    const [loadingChats, setLoadingChats] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // REFS
    // =====================================================

    const messagesEndRef =
        useRef(null);

    const inputRef =
        useRef(null);


    // =====================================================
    // LOAD RECENT CHATS
    // =====================================================

    const loadRecentChats = async () => {

        try {

            setLoadingChats(true);

            const response =
                await getInterviewChats();

            const chats =
                response?.data?.data || [];

            setRecentChats(chats);

        } catch (error) {

            console.error(
                "Failed to load recent chats:",
                error
            );

        } finally {

            setLoadingChats(false);

        }
    };


    // =====================================================
    // LOAD RESUMES
    // =====================================================

    const loadResumes = async () => {

        try {

            const response =
                await getResumes();

            setResumes(
                response?.data?.data || []
            );

        } catch (error) {

            console.error(
                "Failed to load resumes:",
                error
            );

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadRecentChats();
        loadResumes();

    }, []);


    // =====================================================
    // AUTO SCROLL
    // =====================================================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [
        messages,
        sending
    ]);


    // =====================================================
    // LOAD SINGLE CHAT
    // =====================================================

    const loadChat = async (id) => {

        try {

            setLoadingChat(true);
            setError("");

            const response =
                await getInterviewChat(id);

            const chat =
                response?.data?.data;

            if (!chat?._id) {

                throw new Error(
                    "Invalid chat response."
                );
            }

            setChatId(chat._id);

            setMessages(
                chat.messages || []
            );


            // =============================================
            // ATTACHED RESUME
            // =============================================

            if (chat.resumeId) {

                const resumeId =
                    typeof chat.resumeId === "object"
                        ? chat.resumeId._id
                        : chat.resumeId;

                const resume =
                    resumes.find(
                        item =>
                            item._id === resumeId
                    );

                setSelectedResume(
                    resume || null
                );

            } else {

                setSelectedResume(null);

            }

        } catch (error) {

            console.error(
                "Failed to load chat:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to load conversation."
            );

        } finally {

            setLoadingChat(false);

        }
    };


    // =====================================================
    // CREATE NEW CHAT
    // =====================================================

    const handleNewChat = () => {

        setChatId(null);

        setMessages([]);

        setInput("");

        setSelectedResume(null);

        setError("");

        setShowResumeMenu(false);

        inputRef.current?.focus();

    };


    // =====================================================
    // PROMPT SUGGESTION
    // =====================================================

    const handlePrompt = (prompt) => {

        setInput(prompt);

        inputRef.current?.focus();

    };


    // =====================================================
    // SELECT RESUME
    // =====================================================

    const handleSelectResume = async (resume) => {

        try {

            setShowResumeMenu(false);
            setError("");

            const response =
                await createInterviewChat({
                    resumeId: resume._id
                });

            const chat =
                response?.data?.data;

            if (!chat?._id) {

                throw new Error(
                    "Failed to create chat."
                );
            }

            setChatId(chat._id);

            setMessages([]);

            setSelectedResume(resume);

            await loadRecentChats();

            inputRef.current?.focus();

        } catch (error) {

            console.error(
                "Failed to attach resume:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to attach resume."
            );

        }
    };


    // =====================================================
    // REMOVE RESUME
    // =====================================================

    const removeResume = () => {

        handleNewChat();

    };


    // =====================================================
    // DELETE CHAT
    // =====================================================

    const handleDeleteChat = async (chat) => {

        if (!chat?._id) {
            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this chat?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteInterviewChat(
                chat._id
            );

            setRecentChats(
                currentChats =>
                    currentChats.filter(
                        current =>
                            current._id !== chat._id
                    )
            );


            if (chatId === chat._id) {

                setChatId(null);

                setMessages([]);

                setSelectedResume(null);

                setInput("");

                setShowResumeMenu(false);

            }

        } catch (error) {

            console.error(
                "Delete interview chat failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete interview chat."
            );

        }
    };


    // =====================================================
    // SEND MESSAGE
    // =====================================================

    const handleSend = async () => {

        const trimmed =
            input.trim();

        if (
            !trimmed ||
            sending
        ) {
            return;
        }

        try {

            setSending(true);
            setError("");

            let activeChatId =
                chatId;


            // =============================================
            // CREATE CHAT IF NEEDED
            // =============================================

            if (!activeChatId) {

                const response =
                    await createInterviewChat({

                        resumeId:
                            selectedResume?._id ||
                            null

                    });

                const chat =
                    response?.data?.data;

                if (!chat?._id) {

                    throw new Error(
                        "Failed to create chat."
                    );
                }

                activeChatId =
                    chat._id;

                setChatId(
                    activeChatId
                );
            }


            // =============================================
            // SHOW USER MESSAGE
            // =============================================

            setMessages(
                previous => [

                    ...previous,

                    {
                        role: "user",
                        content: trimmed
                    }

                ]
            );

            setInput("");


            // =============================================
            // SEND TO BACKEND
            // =============================================

            const response =
                await sendInterviewMessage(
                    activeChatId,
                    trimmed
                );

            const data =
                response?.data?.data;

            if (
                !data?.assistantMessage
            ) {

                throw new Error(
                    "Invalid interview response."
                );
            }


            // =============================================
            // AI RESPONSE
            // =============================================

            setMessages(
                previous => [

                    ...previous,

                    {
                        role: "assistant",
                        content:
                            data.assistantMessage
                    }

                ]
            );

            await loadRecentChats();

        } catch (error) {

            console.error(
                "Interview error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to send message."
            );

        } finally {

            setSending(false);

            inputRef.current?.focus();

        }
    };


    // =====================================================
    // CHAT TITLE
    // =====================================================

    const getChatTitle = (chat) => {

        return (
            chat.title ||
            "New Interview Chat"
        );

    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        return new Date(
            date
        ).toLocaleDateString(
            [],
            {
                month: "short",
                day: "numeric"
            }
        );

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            h-[calc(100vh-3rem)]
            flex
            bg-[#F7F5F0]
            overflow-hidden
            p-2
            sm:p-3
        ">

            {/* =================================================
                INTERVIEW WORKSPACE
            ================================================= */}

            <div className="
                flex
                w-full
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-[#E5DED2]
                bg-[#FCFBF8]
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            ">

                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <InterviewSidebar

                    open={
                        sidebarOpen
                    }

                    onToggle={() =>
                        setSidebarOpen(
                            current =>
                                !current
                        )
                    }

                    recentChats={
                        recentChats
                    }

                    chatId={
                        chatId
                    }

                    loadingChats={
                        loadingChats
                    }

                    onNewChat={
                        handleNewChat
                    }

                    onLoadChat={
                        loadChat
                    }

                    onDeleteChat={
                        handleDeleteChat
                    }

                    getChatTitle={
                        getChatTitle
                    }

                    formatDate={
                        formatDate
                    }

                />


                {/* =================================================
                    MAIN CHAT
                ================================================= */}

                <main className="
                    flex-1
                    min-w-0
                    flex
                    flex-col
                    bg-[#FCFBF8]
                ">

                    {/* =================================================
                        CHAT AREA
                    ================================================= */}

                    <div className="
                        flex-1
                        min-h-0
                        flex
                        flex-col
                    ">

                        <ChatMessages
                            messages={
                                messages
                            }

                            sending={
                                sending
                            }

                            loadingChat={
                                loadingChat
                            }

                            messagesEndRef={
                                messagesEndRef
                            }

                            onPrompt={
                                handlePrompt
                            }
                        />

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="
                            max-w-3xl
                            mx-auto
                            w-full
                            px-4
                            pb-2
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-3
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                px-3.5
                                py-2.5
                                text-sm
                                text-red-700
                                shadow-sm
                            ">

                                <p className="
                                    leading-5
                                ">
                                    {error}
                                </p>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setError("")
                                    }
                                    className="
                                        shrink-0
                                        w-6
                                        h-6
                                        rounded-md
                                        flex
                                        items-center
                                        justify-center
                                        text-red-400
                                        hover:text-red-700
                                        hover:bg-red-100
                                        transition-all
                                    "
                                    aria-label="Dismiss error"
                                >
                                    ×
                                </button>

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        INPUT
                    ================================================= */}

                    <div className="
                        border-t
                        border-[#E8E2D7]
                        bg-[#FCFBF8]
                        px-3
                        sm:px-5
                        pt-3
                        pb-3
                    ">

                        <ChatInput

                            input={
                                input
                            }

                            setInput={
                                setInput
                            }

                            sending={
                                sending
                            }

                            selectedResume={
                                selectedResume
                            }

                            resumes={
                                resumes
                            }

                            showResumeMenu={
                                showResumeMenu
                            }

                            setShowResumeMenu={
                                setShowResumeMenu
                            }

                            onSend={
                                handleSend
                            }

                            onSelectResume={
                                handleSelectResume
                            }

                            onRemoveResume={
                                removeResume
                            }

                            inputRef={
                                inputRef
                            }

                        />

                    </div>

                </main>

            </div>

        </div>
    );
};


export default InterviewCoach;