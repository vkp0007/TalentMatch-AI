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
// ANALYZE RESUME AGAINST JOB
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
// GET ANALYSES FOR SINGLE RESUME
// =========================================================

router.get(
    "/resume/:resumeId",
    protect,
    getResumeAnalyses
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
// DELETE ANALYSIS
// =========================================================

router.delete(
    "/:id",
    protect,
    deleteAnalysis
);


export default router;