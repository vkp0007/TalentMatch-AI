import express from "express";

import upload
from "../middlewares/upload.middleware.js";

import {
    uploadResume,
    getUserResumes,
    getResumeById
} from "../controllers/resume.controller.js";

import {
    protect
} from "../middlewares/auth.middleware.js";


const router = express.Router();

// UPLOAD RESUME


router.post(
    "/",
    protect,
    upload.single("resume"),
    uploadResume
);


// =========================================================
// GET USER RESUMES
// =========================================================

router.get(
    "/",
    protect,
    getUserResumes
);

router.get(
    "/:resumeId",
    protect,
    getResumeById
);


export default router;