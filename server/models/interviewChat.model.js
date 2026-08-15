import mongoose from "mongoose";


const InterviewChatSchema =
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
            // JOB DESCRIPTION
            // =================================================

            jobDescription: {

                type: String,

                required: true,

                trim: true
            },


            // =================================================
            // CONVERSATION
            // =================================================

            messages: {

                type: [

                    {

                        role: {

                            type: String,

                            enum: [
                                "user",
                                "assistant"
                            ],

                            required: true
                        },

                        content: {

                            type: String,

                            required: true,

                            trim: true
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


export const InterviewChat =
    mongoose.model(
        "InterviewChat",
        InterviewChatSchema
    );