import mongoose from "mongoose";


const ResumeAnalysisSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
    },

    resumeId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Resume",

        required: true
    },

    targetRole: {

        type: String,

        default: ""
    },

    jobDescription: {

        type: String,

        required: true
    },

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

    recommendations: {

        type: [String],

        default: []
    },

    jdProfile: {

        type: Object,

        default: {}
    }

}, {

    timestamps: true
});


export const ResumeAnalysis = mongoose.model(

    "ResumeAnalysis",

    ResumeAnalysisSchema
);