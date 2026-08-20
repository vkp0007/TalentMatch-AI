import express from "express";

import {
    createInterviewChat,
    sendInterviewMessage,
    getInterviewChat,
    getUserInterviewChats,
    deleteInterviewChat
} from "../controllers/interviewChat.controller.js";

import {
    protect
} from "../middlewares/auth.middleware.js";


const router =
    express.Router();


// =========================================================
// CREATE CHAT
// =========================================================

router.post(
    "/",
    protect,
    createInterviewChat
);


// =========================================================
// GET ALL USER CHATS
// =========================================================

router.get(
    "/",
    protect,
    getUserInterviewChats
);


// =========================================================
// GET SINGLE CHAT
// =========================================================

router.get(
    "/:chatId",
    protect,
    getInterviewChat
);


// =========================================================
// SEND MESSAGE
// =========================================================

router.post(
    "/:chatId/messages",
    protect,
    sendInterviewMessage
);


// =========================================================
// DELETE CHAT
// =========================================================

router.delete(
    "/:chatId",
    protect,
    deleteInterviewChat
);


export default router;