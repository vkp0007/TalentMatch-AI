import mongoose from "mongoose";


const ResumeSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
    },

    resumeName: {

        type: String,

        required: true
    },

    targetRole: {

        type: String,

        default: ""
    },

    originalFileName: {

        type: String,

        required: true
    },

    fileUrl: {

        type: String,

        required: true
    },

    resumeText: {

        type: String,

        required: true
    },

    parsedData: {

        type: Object,

        default: {}
    },

    embedding: {

        type: [Number],

        default: []
    }

}, {

    timestamps: true
})


export const Resume = mongoose.model(

    "Resume",

    ResumeSchema
);