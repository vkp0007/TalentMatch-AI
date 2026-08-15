import express from "express";

import {
    createReferralDraft,
    getUserReferralDrafts,
    getReferralDraftById,
    deleteReferralDraft,
    updateReferralDraft,
    refineReferralDraft
} from "../controllers/referral.controller.js";

import {
    protect
} from "../middlewares/auth.middleware.js";


const router =
    express.Router();


router.post(
    "/",
    protect,
    createReferralDraft
);

router.get(
    "/",
    protect,
    getUserReferralDrafts
);

router.get(
    "/:id",
    protect,
    getReferralDraftById
);

router.delete(
    "/:id",
    protect,
    deleteReferralDraft
);

router.put(
    "/:id",
    protect,
    updateReferralDraft
);

router.post(
    "/:id/refine",
    protect,
    refineReferralDraft
);


export default router;