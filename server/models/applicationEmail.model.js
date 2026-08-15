import mongoose from "mongoose";


const ApplicationEmailSchema =
    new mongoose.Schema(
        {

            // =================================================
            // USER
            // =================================================

            userId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "User",

                required: true,

                index: true
            },


            // =================================================
            // RESUME
            // =================================================

            resumeId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Resume",

                required: true,

                index: true
            },


            // =================================================
            // RESUME ANALYSIS
            // =================================================

            analysisId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "ResumeAnalysis",

                default: null,

                index: true
            },


            // =================================================
            // APPLICATION DETAILS
            // =================================================

            role: {

                type: String,

                required: true,

                trim: true
            },


            jobUrl: {

                type: String,

                required: true,

                trim: true
            },


            // =================================================
            // USER'S GENERATION REQUEST
            // =================================================

            userRequest: {

                type: String,

                required: true,

                trim: true
            },


            // =================================================
            // GENERATED EMAIL
            // =================================================

            email: {

                type: String,

                required: true,

                trim: true
            }

        },

        {

            timestamps: true

        }
    );


export const ApplicationEmail =
    mongoose.model(
        "ApplicationEmail",
        ApplicationEmailSchema
    );