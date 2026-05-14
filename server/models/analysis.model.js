import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },

    jobDescription: {
      type: String,
      required: true
    },

    matchScore: {
      type: Number,
      default: 0
    },

    extractedSkills: {
      type: [String],
      default: []
    },

    missingSkills: {
      type: [String],
      default: []
    },

    recommendations: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Analysis = mongoose.model("Analysis", analysisSchema);
