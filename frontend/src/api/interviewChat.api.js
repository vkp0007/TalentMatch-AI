import apiClient from "./client";


export const createInterviewChat = (
    data
) =>
    apiClient.post(
        "/interview-chat",
        data
    );


export const getInterviewChats = () =>
    apiClient.get(
        "/interview-chat"
    );


export const getInterviewChat = (
    chatId
) =>
    apiClient.get(
        `/interview-chat/${chatId}`
    );


export const sendInterviewMessage = (
    chatId,
    message
) =>
    apiClient.post(
        `/interview-chat/${chatId}/message`,
        {
            message
        }
    );


export const deleteInterviewChat = (
    chatId
) =>
    apiClient.delete(
        `/interview-chat/${chatId}`
    );