import express from "express";

import {
    createInterviewChat,
    sendInterviewMessage,
    getInterviewChat
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
// SEND MESSAGE
// =========================================================

router.post(
    "/:chatId/message",
    protect,
    sendInterviewMessage
);


// =========================================================
// GET CHAT
// =========================================================

router.get(
    "/:chatId",
    protect,
    getInterviewChat
);


export default router;