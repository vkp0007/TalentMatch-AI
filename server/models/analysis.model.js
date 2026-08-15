import mongoose from "mongoose";

const ResumeAnalysisSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
            index: true
        },

        targetRole: {
            type: String,
            default: ""
        },

        jobDescription: {
            type: String,
            required: true
        },

        // =================================================
        // SCORES
        // =================================================

        semanticScore: {
            type: Number,
            default: 0
        },

        skillScore: {
            type: Number,
            default: 0
        },

        finalScore: {
            type: Number,
            default: 0
        },

        // =================================================
        // SKILL ANALYSIS
        // =================================================

        matchedSkills: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        additionalSkills: {
            type: [String],
            default: []
        },

        // =================================================
        // ELIGIBILITY
        // =================================================

        educationMatch: {
            type: Boolean,
            default: true
        },

        experienceMatch: {
            type: Boolean,
            default: true
        },

        eligibilityWarnings: {
            type: [String],
            default: []
        },

        // =================================================
        // JOB DESCRIPTION PROFILE
        // =================================================

        jdProfile: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        // =================================================
        // LEGACY / UNUSED
        // =================================================


    },
    {
        timestamps: true
    }
);

export const ResumeAnalysis = mongoose.model(
    "ResumeAnalysis",
    ResumeAnalysisSchema
);