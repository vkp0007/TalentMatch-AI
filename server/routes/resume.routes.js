import express from "express"

import upload from "../middlewares/upload.middleware.js"

import { uploadResume, getUserResumes } from "../controllers/resume.controller.js"

import { protect } from "../middlewares/auth.middleware.js"


const router = express.Router()


router.post("/", protect, upload.single("resume"), uploadResume)
router.get("/", protect, getUserResumes);

export default router;