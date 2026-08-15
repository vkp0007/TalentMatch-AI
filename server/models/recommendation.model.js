import mongoose from "mongoose";


const RecommendationSchema =
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
            // RESUME ANALYSIS
            // =================================================

            analysisId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "ResumeAnalysis",

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
            // SKILLS TO STUDY
            // =================================================

            skillsToStudy: {

                type: [

                    {

                        skill: {

                            type: String,

                            required: true
                        },

                        reason: {

                            type: String,

                            default: ""
                        },

                        priority: {

                            type: String,

                            enum: [
                                "high",
                                "medium",
                                "low"
                            ],

                            default: "medium"
                        },

                        topics: {

                            type: [String],

                            default: []
                        }

                    }

                ],

                default: []
            },


            // =================================================
            // RESUME IMPROVEMENTS
            // =================================================

            resumeImprovements: {

                type: [

                    {

                        type: {

                            type: String,

                            enum: [
                                "skill",
                                "project",
                                "achievement",
                                "education"
                            ],

                            required: true
                        },

                        item: {

                            type: String,

                            required: true
                        },

                        reason: {

                            type: String,

                            default: ""
                        },

                        priority: {

                            type: String,

                            enum: [
                                "high",
                                "medium",
                                "low"
                            ],

                            default: "medium"
                        }

                    }

                ],

                default: []
            }

        },

        {

            timestamps: true

        }
    );

RecommendationSchema.index(
    {
        userId: 1,
        analysisId: 1
    },
    {
        unique: true
    }
);



export const Recommendation =
    mongoose.model(
        "Recommendation",
        RecommendationSchema
    );