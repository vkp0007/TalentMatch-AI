import { Resume } from "../models/resume.model.js";
import { ResumeAnalysis } from "../models/analysis.model.js";
import { Recommendation } from "../models/recommendation.model.js";

import {
    generateRecommendations
} from "./llm.service.js";


// =========================================================
// CREATE / GET RECOMMENDATION
// =========================================================

export const createRecommendationService = async ({
    userId,
    analysisId
}) => {

    try {

        if (!analysisId) {

            throw new Error(
                "Analysis ID is required"
            );
        }


        // =================================================
        // FIND ANALYSIS
        // =================================================

        const analysis =
            await ResumeAnalysis.findOne({

                _id: analysisId,

                userId
            });


        if (!analysis) {

            throw new Error(
                "Analysis not found"
            );
        }


        // =================================================
        // CHECK EXISTING RECOMMENDATION
        // =================================================

        const existingRecommendation =
            await Recommendation.findOne({

                analysisId:
                    analysis._id,

                userId
            });


        if (existingRecommendation) {

            return existingRecommendation;
        }


        // =================================================
        // FIND RESUME
        // =================================================

        const resume =
            await Resume.findOne({

                _id:
                    analysis.resumeId,

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
        // GENERATE RECOMMENDATIONS
        // =================================================
const recommendationData =
    await generateRecommendations({

        candidateData:
            resume.parsedData,

        jdProfile:
            analysis.jdProfile || {},

        semanticScore:
            analysis.semanticScore || 0,

        skillScore:
            analysis.skillScore || 0,

        finalScore:
            analysis.finalScore || 0,

        matchedSkills:
            analysis.matchedSkills || [],

        missingSkills:
            analysis.missingSkills || [],

        additionalSkills:
            analysis.additionalSkills || [],

        educationMatch:
            analysis.educationMatch,

        experienceMatch:
            analysis.experienceMatch
    });

        if (!recommendationData) {

            throw new Error(
                "Recommendation generation failed"
            );
        }


        // =================================================
        // VALIDATE LLM RESPONSE
        // =================================================

        const skillsToStudy =
            Array.isArray(
                recommendationData.skillsToStudy
            )
                ? recommendationData.skillsToStudy
                : [];


        const resumeImprovements =
            Array.isArray(
                recommendationData.resumeImprovements
            )
                ? recommendationData.resumeImprovements
                : [];


// =================================================
// SAVE
// =================================================

try {

    const recommendation =
        await Recommendation.create({

            userId,

            analysisId:
                analysis._id,

            resumeId:
                resume._id,

            skillsToStudy,

            resumeImprovements
        });


    return recommendation;


} catch (error) {

    if (error.code === 11000) {

        const existingRecommendation =
            await Recommendation.findOne({

                userId,

                analysisId:
                    analysis._id
            });


        if (existingRecommendation) {

            return existingRecommendation;
        }
    }


    throw error;
}


} catch (error) {

    throw new Error(

        error.message ||
        "Failed to create recommendations"
    );
}
};


// =========================================================
// GET RECOMMENDATION BY ANALYSIS
// =========================================================

export const getRecommendationService = async ({
    userId,
    analysisId
}) => {

    try {

        if (!analysisId) {

            throw new Error(
                "Analysis ID is required"
            );
        }


        // =================================================
        // VERIFY ANALYSIS BELONGS TO USER
        // =================================================

        const analysis =
            await ResumeAnalysis.findOne({

                _id:
                    analysisId,

                userId
            });


        if (!analysis) {

            throw new Error(
                "Analysis not found"
            );
        }


        // =================================================
        // FIND RECOMMENDATION
        // =================================================

        const recommendation =
            await Recommendation.findOne({

                analysisId:
                    analysis._id,

                userId
            });


        return recommendation;


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to get recommendation"
        );
    }
};