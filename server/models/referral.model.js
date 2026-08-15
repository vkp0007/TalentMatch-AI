import mongoose from "mongoose";

const ReferralDraftSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        analysisId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ResumeAnalysis",
            default: null,
            index: true
        },

        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            default: null,
            index: true
        },

        recipientName: {
            type: String,
            default: ""
        },

        companyName: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        },

        jobUrl: {
            type: String,
            default: ""
        },

        customContext: {
            type: String,
            default: ""
        },

        draft: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const ReferralDraft =
    mongoose.model(
        "ReferralDraft",
        ReferralDraftSchema
    );