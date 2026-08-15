import {
    uploadResumeService,
    getResumeByIdService
}
from "../services/resume.service.js";

import {
    Resume
}
from "../models/resume.model.js";


export const uploadResume = async (
    req,
    res,
    next
) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "Resume file is required"
            });
        }


        const {
            resumeName,
            targetRole
        } = req.body;


        const result =
            await uploadResumeService({

                file:
                    req.file,

                userId:
                    req.user._id,

                resumeName,

                targetRole
            });


        return res.status(201).json({

            success: true,

            message:
                "Resume uploaded successfully",

            data: result
        });


    } catch (error) {

        next(error);
    }
};


// =========================================================
// GET USER RESUMES
// =========================================================

export const getUserResumes = async (
    req,
    res,
    next
) => {

    try {

const resumes =
    await Resume.find({

        userId:
            req.user._id

    })
    .select(
        "_id resumeName targetRole originalFileName createdAt"
    )
    .sort({

        createdAt: -1
    });


        return res.status(200).json({

            success: true,

            data: resumes
        });


    } catch (error) {

        next(error);
    }
};

export const getResumeById = async (req, res) => {

    try {

        const resume =
            await getResumeByIdService({
                resumeId:
                    req.params.resumeId,

                userId:
                    req.user._id
            });


        if (!resume) {

            return res.status(404).json({

                success: false,

                message:
                    "Resume not found"
            });
        }


        return res.status(200).json({

            success: true,

            data: resume
        });


    } catch (error) {

        console.error(
            "Get Resume Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to get resume"
        });
    }
};