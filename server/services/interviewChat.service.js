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
    resumeId,
    jobDescription
}) => {

    try {

        // =================================================
        // VALIDATION
        // =================================================

        if (!resumeId) {

            throw new Error(
                "Resume ID is required"
            );
        }

        if (!jobDescription?.trim()) {

            throw new Error(
                "Job description is required"
            );
        }


        // =================================================
        // FIND RESUME
        // =================================================

        const resume =
            await Resume.findOne({

                _id: resumeId,

                userId
            });


        if (!resume) {

            throw new Error(
                "Resume not found"
            );
        }


        // =================================================
        // VALIDATE RESUME DATA
        // =================================================

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


        // =================================================
        // CREATE CHAT
        // =================================================

        const chat =
            await InterviewChat.create({

                userId,

                resumeId,

                jobDescription:
                    jobDescription.trim(),

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


            // =================================================
            // FIND RESUME
            // =================================================

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


            // =================================================
            // VALIDATE RESUME DATA
            // =================================================

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


            // =================================================
            // GENERATE AI RESPONSE
            // =================================================

            const userMessage = {

                role: "user",

                content:
                    message.trim()
            };


            const conversationHistory =
                chat.messages.map(
                    item => ({

                        role:
                            item.role,

                        content:
                            item.content

                    })
                );


            const assistantResponse =
                await generateInterviewChatResponse({

                    candidateData:
                        resume.parsedData,

                    jobDescription:
                        chat.jobDescription,

                    messages: [

                        ...conversationHistory,

                        userMessage

                    ]
                });


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


            await chat.save();


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


// =========================================================
// GET INTERVIEW CHAT
// =========================================================

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


            const chat =
                await InterviewChat.findOne({

                    _id: chatId,

                    userId
                });


            return chat;


        } catch (error) {

            throw new Error(

                error.message ||
                "Failed to get interview chat"
            );
        }
    };