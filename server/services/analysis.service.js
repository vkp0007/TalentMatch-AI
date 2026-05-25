import { Resume }
from "../models/resume.model.js";

import { ResumeAnalysis }
from "../models/analysis.model.js";

import { analyzeResumeAI }
from "./ai.service.js";



// =========================================================
// ANALYZE RESUME
// =========================================================

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
        // AI ANALYSIS
        // =================================================

        const analysisData =
            await analyzeResumeAI({

                resumeText:
                    resume.resumeText,

                parsedData:
                    resume.parsedData,

                embedding:
                    resume.embedding,

                jobDescription
            });


        // =================================================
        // PREVENT EMPTY ANALYSIS
        // =================================================

        if (!analysisData) {

            throw new Error(
                "AI analysis failed"
            );
        }


        // =================================================
        // STORE ANALYSIS
        // =================================================

        const analysis =
            await ResumeAnalysis.create({

                userId,

                resumeId,

                targetRole:
                    resume.targetRole || "",

                jobDescription,

                semanticScore:
                    analysisData.semanticScore || 0,

                skillScore:
                    analysisData.skillScore || 0,

                finalScore:
                    analysisData.finalScore || 0,

                matchedSkills:
                    analysisData.matchedSkills || [],

                missingSkills:
                    analysisData.missingSkills || [],

                additionalSkills:
                    analysisData.additionalSkills || [],

                recommendations:
                    analysisData.recommendations || [],

                jdProfile:
                    analysisData.jdProfile || {}
            });


        // =================================================
        // POPULATED RESPONSE
        // =================================================

        const populatedAnalysis =
            await ResumeAnalysis.findById(

                analysis._id

            ).populate(

                "resumeId",

                "resumeName targetRole originalFileName createdAt"
            );


        


        return populatedAnalysis;

    } catch(error) {

    

        throw new Error(

            error.message ||

            "Resume analysis failed"
        );
    }
};



// =========================================================
// GET ALL USER ANALYSES
// =========================================================

export const getUserAnalysesService = async (userId) => {

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

    } catch(error) {

       

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

    } catch(error) {


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

            .sort({

                createdAt: -1
            });


        return analyses;

    } catch(error) {


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

    } catch(error) {

       throw new Error(

            error.message ||

            "Failed to delete analysis"
        );
    }
};