import path from "path";

import { Resume }
from "../models/resume.model.js";

import {
  extractResumeText
}
from "../services/pythonApiService.js";


const uploadResume = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // absolute file path
    const absolutePath = path.resolve(req.file.path);

    // call FastAPI service
    const extractedData =
      await extractResumeText(absolutePath);

    const fileExtension =
      req.file.originalname
        .split(".")
        .pop();

    // save to database
    const resume = await Resume.create({

      originalName: req.file.originalname,

      fileName: req.file.filename,

      filePath: req.file.path.replace(/\\/g, "/"),

      fileType: fileExtension,

      extractedText:
        extractedData.extractedText || ""
    });

    res.status(201).json({

      success: true,

      message:
        "Resume uploaded and analyzed successfully",

      resume
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message
    });
  }
};

export { uploadResume };