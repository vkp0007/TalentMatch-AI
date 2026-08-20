import { Resume } from "../models/resume.model.js";

import {
    InterviewChat
} from "../models/interviewChat.model.js";

import {
    generateInterviewChatResponse
} from "./llm.service.js";


// =========================================================
// CREATE INTERVIEW CHAT
// =========================================================

export const createInterviewChatService = async ({
    userId,
    resumeId
}) => {

    try {

        let resume = null;
          if (resumeId) {

            resume =
                await Resume.findOne({

                    _id: resumeId,

                    userId
                });


            if (!resume) {

                throw new Error(
                    "Resume not found"
                );
            }


            if (
                !resume.parsedData ||
                Object.keys(
                    resume.parsedData
                ).length === 0
            ) {

                throw new Error(
                    "Resume data not available"
                );
            }
        }


        const chat =
            await InterviewChat.create({

                userId,

                resumeId:
                    resume
                        ? resume._id
                        : null,

                messages: []

            });


        return chat;


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to create interview chat"
        );
    }
};


// =========================================================
// SEND INTERVIEW MESSAGE
// =========================================================

export const sendInterviewMessageService =
    async ({
        userId,
        chatId,
        message
    }) => {

        try {

            // =================================================
            // VALIDATION
            // =================================================

            if (!chatId) {

                throw new Error(
                    "Chat ID is required"
                );
            }


            if (!message?.trim()) {

                throw new Error(
                    "Message is required"
                );
            }


            // =================================================
            // FIND CHAT
            // =================================================

            const chat =
                await InterviewChat.findOne({

                    _id: chatId,

                    userId
                });


            if (!chat) {

                throw new Error(
                    "Interview chat not found"
                );
            }


            let candidateData = null;


            // =================================================
            // OPTIONAL RESUME CONTEXT
            // =================================================

            if (chat.resumeId) {

                const resume =
                    await Resume.findOne({

                        _id:
                            chat.resumeId,

                        userId
                    });


                if (!resume) {

                    throw new Error(
                        "Resume not found"
                    );
                }


                if (
                    !resume.parsedData ||
                    Object.keys(
                        resume.parsedData
                    ).length === 0
                ) {

                    throw new Error(
                        "Resume data not available"
                    );
                }


                candidateData =
                    resume.parsedData;
            }


            // =================================================
            // USER MESSAGE
            // =================================================

            const userMessage = {

                role: "user",

                content:
                    message.trim()
            };


            // =================================================
            // CONVERSATION HISTORY
            // =================================================

            const conversationHistory =
                chat.messages.map(
                    item => ({

                        role:
                            item.role,

                        content:
                            item.content

                    })
                );


            // =================================================
            // GENERATE AI RESPONSE
            // =================================================

            const assistantResponse =
                await generateInterviewChatResponse({

                    candidateData,

                    jobDescription: null,

                    messages: [

                        ...conversationHistory,

                        userMessage

                    ]
                });


            if (!assistantResponse) {

                throw new Error(
                    "Failed to generate interview response"
                );
            }


            // =================================================
            // SET CHAT TITLE
            // =================================================

            if (
                chat.messages.length === 0
            ) {

                chat.title =
                    message
                        .trim()
                        .slice(0, 60);
            }


            // =================================================
            // SAVE USER MESSAGE
            // =================================================

            chat.messages.push({

                role: "user",

                content:
                    message.trim()
            });


            // =================================================
            // SAVE ASSISTANT MESSAGE
            // =================================================

            chat.messages.push({

                role: "assistant",

                content:
                    assistantResponse
            });


            // =================================================
            // SAVE CHAT
            // =================================================

            await chat.save();


            // =================================================
            // RESPONSE
            // =================================================

            return {

                userMessage:
                    message.trim(),

                assistantMessage:
                    assistantResponse,

                chatId:
                    chat._id

            };


        } catch (error) {

            throw new Error(

                error.message ||
                "Failed to send interview message"
            );
        }
    };
// GET INTERVIEW CHAT

export const getInterviewChatService =
    async ({
        userId,
        chatId
    }) => {

        try {

            if (!chatId) {

                throw new Error(
                    "Chat ID is required"
                );
            }

             const chat = await InterviewChat.findOne({

                    _id: chatId,

                    userId
                });


            return chat;


        } catch (error) {
  throw new Error(
              error.message || "Failed to get interview chat"
            );
        }
    };


// GET USER INTERVIEW CHATS

export const getUserInterviewChatsService =
    async ({
        userId
    }) => {

        try {

            const chats =
                await InterviewChat.find({

                    userId

                })
                .select(
    "_id title resumeId createdAt updatedAt"
)
                .sort({

                    updatedAt: -1

                });


            return chats;


        } catch (error) {

            throw new Error(

                error.message ||
                "Failed to get interview chats"
            );
        }
    };

// DELETE INTERVIEW CHAT
// =========================================================

export const deleteInterviewChatService = async ({
    userId,
    chatId
}) => {

    const deletedChat =
        await InterviewChat.findOneAndDelete({

            _id: chatId,

            userId
        });


    return deletedChat;
};