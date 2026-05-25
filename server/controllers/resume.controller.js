import { uploadResumeService } from "../services/resume.service.js";
import {Resume} from "../models/resume.model.js";


const uploadResume = async (req, res, next) => {

  try {

    const { resumeName, targetRole } = req.body


    const result = await uploadResumeService({

      file: req.file,

      userId: req.user._id,

      resumeName,

      targetRole
    })


    res.status(201).json({

      success: true,

      message:"Resume uploaded successfully",

      data: result
    })

  } catch (error) {

    next(error)
  }
};

const getUserResumes =async (req, res, next) => {

    try {

        const resumes =
            await Resume.find({

                userId: req.user._id

            })

            .sort({

                createdAt: -1
            });


        res.status(200).json({

            success: true,

            data: resumes
        });

    } catch(error) {

        next(error);
    }
};


export {uploadResume, getUserResumes}