import apiClient from "./client";


// =====================================================
// CREATE CHAT
// =====================================================

export const createInterviewChat = ({
    resumeId = null
} = {}) => {

    return apiClient.post(
        "/interview-chat",
        {
            resumeId
        }
    );
};


// =====================================================
// GET RECENT CHATS
// =====================================================

export const getInterviewChats = () => {

    return apiClient.get(
        "/interview-chat"
    );
};


// =====================================================
// SEND MESSAGE
// =====================================================

export const sendInterviewMessage = (
    chatId,
    message
) => {

    return apiClient.post(
        `/interview-chat/${chatId}/messages`,
        {
            message
        }
    );
};


// =====================================================
// GET CHAT
// =====================================================

export const getInterviewChat = (
    chatId
) => {

    return apiClient.get(
        `/interview-chat/${chatId}`
    );
};


// =====================================================
// DELETE CHAT
// =====================================================

export const deleteInterviewChat = (
    chatId
) => {

    return apiClient.delete(
        `/interview-chat/${chatId}`
    );
};