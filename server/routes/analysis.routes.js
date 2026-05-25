import express from "express";

import {
    protect
} from "../middlewares/auth.middleware.js";

import {
    analyzeResume,
    getUserAnalyses,
    getAnalysisById,
    getResumeAnalyses,
    deleteAnalysis
} from "../controllers/analysis.controller.js";

const router = express.Router();



// =========================================================
// ANALYZE RESUME
// =========================================================

router.post(
    "/",
    protect,
    analyzeResume
);



// =========================================================
// GET ALL USER ANALYSES
// =========================================================

router.get(
    "/",
    protect,
    getUserAnalyses
);



// =========================================================
// GET SINGLE ANALYSIS
// =========================================================

router.get(
    "/:id",
    protect,
    getAnalysisById
);



// =========================================================
// GET ANALYSES FOR A RESUME
// =========================================================

router.get(
    "/resume/:resumeId",
    protect,
    getResumeAnalyses
);



// =========================================================
// DELETE ANALYSIS
// =========================================================

router.delete(
    "/:id",
    protect,
    deleteAnalysis
);



export default router;