import path from "path";

import { Resume }
from "../models/resume.model.js";

import {
  extractResumeText
}
from "./ai.service.js";


const uploadResumeService =
async ({

  file,
  userId,
  resumeName,
  targetRole

}) => {

  if (!file) {

    throw new Error(
      "No file uploaded"
    );
  }


  const absolutePath =
    path.resolve(file.path);


  // FastAPI extraction
  const extractedData =
    await extractResumeText(
      absolutePath
    );


  // save resume
  const resume =
    await Resume.create({

      userId,

      resumeName,

      targetRole,

      originalFileName:
        file.originalname,

      fileUrl:
        file.path.replace(
          /\\\\/g,
          "/"
        ),

      resumeText:
        extractedData.extractedText || "",

      parsedData:
        extractedData.resumeData || {},

      embedding:
        extractedData.embedding || []
    });


  return resume;
};


export {
  uploadResumeService
};