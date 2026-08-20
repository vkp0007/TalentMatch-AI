import { Resume }
from "../models/resume.model.js";

import { ResumeAnalysis }
from "../models/analysis.model.js";

import {
    analyzeJobAI
}
from "./ai.service.js";


// ANALYZE RESUME AGAINST JOB

export const analyzeResumeService = async ({
    userId,
    resumeId,
    jobDescription
}) => {

    try {

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
        // VALIDATE PARSED DATA
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
        // VALIDATE EMBEDDING
        // =================================================

        if (
            !resume.embedding ||
            resume.embedding.length !== 384
        ) {

            throw new Error(
                "Valid resume embedding not found"
            );
        }


        // =================================================
        // CALL PYTHON AI SERVICE
        // =================================================

        const analysisData =
            await analyzeJobAI({

                resumeData:
                    resume.parsedData,

                resumeEmbedding:
                    resume.embedding,

                jobDescription
            });


        // =================================================
        // VALIDATE AI RESPONSE
        // =================================================

        if (
            !analysisData ||
            !analysisData.success
        ) {

            throw new Error(
                analysisData?.message ||
                "AI job analysis failed"
            );
        }


        const jdProfile =
            analysisData.jdProfile || {};

        const analysis =
            analysisData.analysis || {};


        // =================================================
        // SAVE ANALYSIS
        // =================================================

const savedAnalysis =
    await ResumeAnalysis.create({

        userId,

        resumeId,

        targetRole:
            jdProfile.role ||
            resume.targetRole ||
            "",

        jobDescription,

        // =================================================
        // SCORES
        // =================================================

        semanticScore:
            analysis.semanticScore || 0,

        skillScore:
            analysis.skillScore || 0,

        finalScore:
            analysis.finalScore || 0,

        // =================================================
        // SKILLS
        // =================================================

        matchedSkills:
            analysis.matchedSkills || [],

        missingSkills:
            analysis.missingSkills || [],

        additionalSkills:
            analysis.additionalSkills || [],

        // =================================================
        // ELIGIBILITY
        // =================================================

        educationMatch:
            analysis.educationMatch ?? true,

        experienceMatch:
            analysis.experienceMatch ?? true,

        eligibilityWarnings:
            analysis.eligibilityWarnings || [],

        // =================================================
        // JD PROFILE
        // =================================================

        jdProfile,


        
    });


        // =================================================
        // POPULATE RESUME
        // =================================================

        const populatedAnalysis =
            await ResumeAnalysis
                .findById(
                    savedAnalysis._id
                )
                .populate(
                    "resumeId",
                    "resumeName targetRole originalFileName createdAt"
                );


        return populatedAnalysis;


    } catch (error) {

        throw new Error(

            error.message ||
            "Resume analysis failed"
        );
    }
};


// =========================================================
// GET ALL USER ANALYSES
// =========================================================

export const getUserAnalysesService = async (
    userId
) => {

    try {

        const analyses =
            await ResumeAnalysis.find({

                userId

            })
            .populate(
                "resumeId",
                "resumeName targetRole originalFileName createdAt"
            )
            .sort({
                createdAt: -1
            });


        return analyses;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch analyses"
        );
    }
};


// =========================================================
// GET SINGLE ANALYSIS
// =========================================================

export const getAnalysisByIdService = async ({
    analysisId,
    userId
}) => {

    try {

        const analysis =
            await ResumeAnalysis.findOne({

                _id: analysisId,

                userId
            })
            .populate(
                "resumeId",
                "resumeName targetRole originalFileName createdAt"
            );


        return analysis;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch analysis"
        );
    }
};


// =========================================================
// GET ANALYSES FOR SINGLE RESUME
// =========================================================

export const getResumeAnalysesService = async ({
    resumeId,
    userId
}) => {

    try {

        const analyses =
            await ResumeAnalysis.find({

                resumeId,

                userId

            })
            .populate(
                "resumeId",
                "resumeName targetRole originalFileName createdAt"
            )
            .sort({
                createdAt: -1
            });


        return analyses;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch resume analyses"
        );
    }
};


// =========================================================
// DELETE ANALYSIS
// =========================================================

export const deleteAnalysisService = async ({
    analysisId,
    userId
}) => {

    try {

        const deletedAnalysis =
            await ResumeAnalysis.findOneAndDelete({

                _id: analysisId,

                userId
            });


        return deletedAnalysis;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to delete analysis"
        );
    }
};