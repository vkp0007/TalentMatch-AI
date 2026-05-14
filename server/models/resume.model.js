import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    filePath: {
      type: String,
      required: true
    },

    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true
    },

    extractedText: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const Resume = mongoose.model("Resume", resumeSchema);

