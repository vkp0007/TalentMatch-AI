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
            // OPTIONAL RESUME CONTEXT
            // =================================================

            resumeId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Resume",

                default: null,

                index: true
            },


            // =================================================
            // CHAT TITLE
            // =================================================

            title: {

                type: String,

                default:
                    "New Interview Chat",

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