import express from "express";

import {
    createApplicationEmail,
    getUserApplicationEmails,
    getApplicationEmailById,
    refineApplicationEmailController,
    deleteApplicationEmail
}
from "../controllers/applicationEmail.controller.js";

import {
    protect
} from "../middlewares/auth.middleware.js";


const router =
    express.Router();

router.post(
    "/",
    protect,
    createApplicationEmail
);

router.get(
    "/",
    protect,
    getUserApplicationEmails
);


router.get(
    "/:applicationEmailId",
    protect,
    getApplicationEmailById
);

router.patch(
    "/:applicationEmailId/refine",
    protect,
    refineApplicationEmailController
);

router.delete(
    "/:applicationEmailId",
    protect,
    deleteApplicationEmail
);

export default router;