import mongoose from "mongoose";


const ResumeSchema = new mongoose.Schema(

    {

        // =====================================================
        // USER
        // =====================================================

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            index: true

        },


        // =====================================================
        // RESUME INFORMATION
        // =====================================================

        resumeName: {

            type: String,

            required: true,

            trim: true

        },


        targetRole: {

            type: String,

            default: ""

        },


        originalFileName: {

            type: String,

            required: true

        },


        // =====================================================
        // EXTRACTED RESUME CONTENT
        // =====================================================

        resumeText: {

            type: String,

            required: true

        },


        // Structured resume generated
        // by the Python AI service

        parsedData: {

            type: mongoose.Schema.Types.Mixed,

            default: {}

        },


        // =====================================================
        // RESUME EMBEDDING
        // =====================================================

        // 384-dimensional HashingVectorizer embedding

        embedding: {

            type: [Number],

            default: []

        }

    },

    {

        timestamps: true

    }

);


export const Resume = mongoose.model(
    "Resume",
    ResumeSchema
);