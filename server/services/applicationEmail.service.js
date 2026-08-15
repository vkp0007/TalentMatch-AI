import { Resume }
from "../models/resume.model.js";

import { ResumeAnalysis }
from "../models/analysis.model.js";

import { ApplicationEmail }
from "../models/applicationEmail.model.js";

import {
    generateApplicationEmail,
    refineApplicationEmail
}
from "./llm.service.js";


// =========================================================
// CREATE APPLICATION EMAIL
// =========================================================

export const createApplicationEmailService = async ({
    userId,
    resumeId,
    analysisId,
    role,
    jobUrl,
    userRequest
}) => {

    try {

        // =================================================
        // VALIDATION
        // =================================================

        if (!resumeId) {

            throw new Error(
                "Resume ID is required"
            );
        }

        if (!role?.trim()) {

            throw new Error(
                "Role is required"
            );
        }

        if (!jobUrl?.trim()) {

            throw new Error(
                "Job URL is required"
            );
        }

        if (!userRequest?.trim()) {

            throw new Error(
                "Please specify what you want included in the email"
            );
        }


        // =================================================
        // FIND RESUME
        // =================================================

        const resume =
            await Resume.findOne({

                _id: resumeId,

                userId
            });


        if (!resume) {

            throw new Error(
                "Resume not found"
            );
        }


        // =================================================
        // VALIDATE RESUME DATA
        // =================================================

        if (
            !resume.parsedData ||
            Object.keys(
                resume.parsedData
            ).length === 0
        ) {

            throw new Error(
                "Resume data not available"
            );
        }


        // =================================================
        // FIND ANALYSIS
        // =================================================

        let analysis = null;

        if (analysisId) {

            analysis =
                await ResumeAnalysis.findOne({

                    _id: analysisId,

                    userId
                });


            if (!analysis) {

                throw new Error(
                    "Analysis not found"
                );
            }


            if (
                analysis.resumeId.toString() !==
                resume._id.toString()
            ) {

                throw new Error(
                    "Analysis does not belong to the selected resume"
                );
            }
        }


        // =================================================
        // GENERATE EMAIL
        // =================================================

        const email =
            await generateApplicationEmail({

                candidateData:
                    resume.parsedData,

                jdProfile:
                    analysis?.jdProfile || {},

                role:
                    role.trim(),

                jobUrl:
                    jobUrl.trim(),

                userRequest:
                    userRequest.trim()
            });


        if (!email) {

            throw new Error(
                "Failed to generate application email"
            );
        }


        // =================================================
        // SAVE EMAIL
        // =================================================

        const applicationEmail =
            await ApplicationEmail.create({

                userId,

                resumeId:

                    resume._id,

                analysisId:

                    analysis?._id || null,

                role:

                    role.trim(),

                jobUrl:

                    jobUrl.trim(),

                userRequest:

                    userRequest.trim(),

                email:

                    email.trim()
            });


        // =================================================
        // RETURN
        // =================================================

        return applicationEmail;


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to create application email"
        );
    }
};

// =========================================================
// GET ALL APPLICATION EMAILS
// =========================================================

export const getUserApplicationEmailsService = async (
    userId
) => {

    try {

        const emails =
            await ApplicationEmail.find({

                userId

            })
            .populate(
                "resumeId",
                "resumeName targetRole originalFileName createdAt"
            )
            .populate(
                "analysisId",
                "targetRole semanticScore skillScore finalScore"
            )
            .sort({
                createdAt: -1
            });


        return emails;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch application emails"
        );
    }
};


// =========================================================
// GET SINGLE APPLICATION EMAIL
// =========================================================

export const getApplicationEmailByIdService = async ({
    applicationEmailId,
    userId
}) => {

    try {

        const email =
            await ApplicationEmail.findOne({

                _id:
                    applicationEmailId,

                userId
            })
            .populate(
                "resumeId",
                "resumeName targetRole originalFileName createdAt"
            )
            .populate(
                "analysisId",
                "targetRole semanticScore skillScore finalScore"
            );


        return email;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch application email"
        );
    }
};

// =========================================================
// REFINE APPLICATION EMAIL
// =========================================================

export const refineApplicationEmailService = async ({
    userId,
    applicationEmailId,
    userRequest
}) => {

    try {

        // =================================================
        // VALIDATION
        // =================================================

        if (!applicationEmailId) {

            throw new Error(
                "Application email ID is required"
            );
        }

        if (!userRequest?.trim()) {

            throw new Error(
                "Please specify what you want changed"
            );
        }


        // =================================================
        // FIND EXISTING APPLICATION EMAIL
        // =================================================

        const applicationEmail =
            await ApplicationEmail.findOne({

                _id:
                    applicationEmailId,

                userId
            });


        if (!applicationEmail) {

            throw new Error(
                "Application email not found"
            );
        }


        // =================================================
        // FIND RESUME
        // =================================================

        const resume =
            await Resume.findOne({

                _id:
                    applicationEmail.resumeId,

                userId
            });


        if (!resume) {

            throw new Error(
                "Resume not found"
            );
        }


        // =================================================
        // FIND ANALYSIS
        // =================================================

        let analysis = null;

        if (applicationEmail.analysisId) {

            analysis =
                await ResumeAnalysis.findOne({

                    _id:
                        applicationEmail.analysisId,

                    userId
                });
        }


        // =================================================
        // REFINE EMAIL
        // =================================================

        const refinedEmail =
            await refineApplicationEmail({

                currentEmail:
                    applicationEmail.email,

                candidateData:
                    resume.parsedData,

                jdProfile:
                    analysis?.jdProfile || {},

                role:
                    applicationEmail.role,

                jobUrl:
                    applicationEmail.jobUrl,

                userRequest:
                    userRequest.trim()
            });


        if (!refinedEmail) {

            throw new Error(
                "Failed to refine application email"
            );
        }


        // =================================================
        // UPDATE EXISTING DOCUMENT
        // =================================================

        applicationEmail.email =
            refinedEmail.trim();

        applicationEmail.userRequest =
            userRequest.trim();

        await applicationEmail.save();


        return applicationEmail;


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to refine application email"
        );
    }
};


// DELETE APPLICATION EMAIL


export const deleteApplicationEmailService = async ({
    applicationEmailId,
    userId
}) => {

    try {

        const deletedEmail =
            await ApplicationEmail.findOneAndDelete({

                _id:
                    applicationEmailId,

                userId
            });


        return deletedEmail;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to delete application email"
        );
    }
};