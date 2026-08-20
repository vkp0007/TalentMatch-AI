import express from "express";


import {
    createApplicationEmail,
    getUserApplicationEmails,
    getApplicationEmailById,
    refineApplicationEmailController,
    deleteApplicationEmail
} from "../controllers/applicationEmail.controller.js";


import {
    protect
} from "../middlewares/auth.middleware.js";


const router =
    express.Router();


// =========================================================
// CREATE APPLICATION EMAIL
// =========================================================

router.post(
    "/",
    protect,
    createApplicationEmail
);


// =========================================================
// GET ALL APPLICATION EMAILS
// =========================================================

router.get(
    "/",
    protect,
    getUserApplicationEmails
);


// =========================================================
// GET SINGLE APPLICATION EMAIL
// =========================================================

router.get(
    "/:applicationEmailId",
    protect,
    getApplicationEmailById
);


// =========================================================
// REFINE APPLICATION EMAIL
// =========================================================

router.patch(
    "/:applicationEmailId/refine",
    protect,
    refineApplicationEmailController
);


// =========================================================
// DELETE APPLICATION EMAIL
// =========================================================

router.delete(
    "/:applicationEmailId",
    protect,
    deleteApplicationEmail
);


export default router;