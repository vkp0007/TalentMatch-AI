import express from "express";

import {
    createRecommendation,
    getRecommendation
} from "../controllers/recommendation.controller.js";

import {
    protect
} from "../middlewares/auth.middleware.js";


const router =
    express.Router();


// =========================================================
// CREATE / GENERATE
// =========================================================

router.post(
    "/",
    protect,
    createRecommendation
);


// =========================================================
// GET EXISTING
// =========================================================

router.get(
    "/:analysisId",
    protect,
    getRecommendation
);


export default router;