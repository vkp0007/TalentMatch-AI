import mongoose from "mongoose";

const ReferralDraftSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
            required: true
        },

        customContext: {
            type: String,
            required: true
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