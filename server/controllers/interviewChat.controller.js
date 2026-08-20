import {
    createInterviewChatService,
    sendInterviewMessageService,
    getInterviewChatService,
    getUserInterviewChatsService,
    deleteInterviewChatService
} from "../services/interviewChat.service.js";


// =========================================================
// CREATE INTERVIEW CHAT
// =========================================================

export const createInterviewChat =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                resumeId
            } = req.body;


            const chat =
                await createInterviewChatService({

                    userId,

                    resumeId
                });


            return res.status(201).json({

                success: true,

                message:
                    "Interview chat created successfully",

                data:
                    chat
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to create interview chat"
            });
        }
    };


// =========================================================
// SEND MESSAGE
// =========================================================

export const sendInterviewMessage =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                chatId
            } = req.params;

            const {
                message
            } = req.body;


            const response =
                await sendInterviewMessageService({

                    userId,

                    chatId,

                    message
                });


            return res.status(200).json({

                success: true,

                message:
                    "Interview response generated successfully",

                data:
                    response
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to generate interview response"
            });
        }
    };


// =========================================================
// GET CHAT
// =========================================================

export const getInterviewChat =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                chatId
            } = req.params;


            const chat =
                await getInterviewChatService({

                    userId,

                    chatId
                });


            if (!chat) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Interview chat not found"
                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Interview chat retrieved successfully",

                data:
                    chat
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to get interview chat"
            });
        }
    };


// =========================================================
// GET USER INTERVIEW CHATS
// =========================================================

export const getUserInterviewChats =
    async (req, res) => {

        try {

            const userId =
                req.user._id;


            const chats =
                await getUserInterviewChatsService({

                    userId

                });


            return res.status(200).json({

                success: true,

                message:
                    "Interview chats retrieved successfully",

                data:
                    chats

            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to get interview chats"

            });
        }
    };


// =========================================================
// DELETE INTERVIEW CHAT
// =========================================================

export const deleteInterviewChat =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                chatId
            } = req.params;


            const deletedChat =
                await deleteInterviewChatService({

                    userId,

                    chatId
                });


            if (!deletedChat) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Interview chat not found"
                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Interview chat deleted successfully"
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to delete interview chat"
            });
        }
    };