import { ReferralDraft }
from "../models/referral.model.js";

import { ResumeAnalysis }
from "../models/analysis.model.js";

import { Resume }
from "../models/resume.model.js";

import {
    generateReferralDraft
} from "./llm.service.js";

import {
    refineReferralDraft
} from "./llm.service.js";



// GENERATE REFERRAL DRAFT

export const createReferralDraftService = async ({
    userId,
    analysisId,
    resumeId,
    recipientName,
    companyName,
    role,
    jobUrl,
    customContext
}) => {

    try {


        if (!companyName?.trim()) {

            throw new Error(
                "Company name is required"
            );
        }

        if (!role?.trim()) {

            throw new Error(
                "Role is required"
            );
        }


        let resume = null;

        if (resumeId) {

            resume =
                await Resume.findOne({

                    _id: resumeId,

                    userId
                });

            if (!resume) {

                throw new Error(
                    "Resume not found"
                );
            }
        }

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
        }

const company =
    companyName.trim();

const targetRole =
    role.trim();

const context =
    customContext?.trim() || "";


// =================================================
// GENERATE REFERRAL USING GROQ
// =================================================

const draft =
    await generateReferralDraft({

        recipientName:
            recipientName?.trim() ||
            "there",

        companyName:
            company,

        role:
            targetRole,

        matchedSkills:
            analysis?.matchedSkills ||
            [],

        customContext:
            context,

        resumeData:
            resume?.parsedData ||
            {}
    });


// =================================================
// SAVE DRAFT
// =================================================

const referral =
    await ReferralDraft.create({

        userId,

        analysisId:
            analysis?._id ||
            null,

        resumeId:
            resume?._id ||
            null,

        recipientName:
            recipientName?.trim() ||
            "",

        companyName:
            company,

        role:
            targetRole,

        jobUrl:
            jobUrl?.trim() ||
            "",

        customContext:
            context,

        draft
    });


        return referral;


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to create referral draft"
        );
    }
};

// GET ALL USER REFERRAL DRAFTS


export const getUserReferralDraftsService = async (
    userId
) => {

    try {

        const drafts =
            await ReferralDraft.find({

                userId

            })
            .populate(
                "analysisId",
                "targetRole semanticScore skillScore finalScore matchedSkills missingSkills"
            )
            .populate(
                "resumeId",
                "resumeName targetRole originalFileName createdAt"
            )
            .sort({
                createdAt: -1
            });


        return drafts;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch referral drafts"
        );
    }
};



// GET SINGLE REFERRAL DRAFT


export const getReferralDraftByIdService = async ({
    referralId,
    userId
}) => {

    try {

        const draft = await ReferralDraft.findOne({

                _id: referralId,

                userId
            })
            .populate(
                "analysisId",
                "targetRole semanticScore skillScore finalScore matchedSkills missingSkills"
            )
            .populate(
                "resumeId",
                "resumeName targetRole originalFileName createdAt"
            );


        return draft;

    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch referral draft"
        );
    }
};


// DELETE REFERRAL DRAFT

export const deleteReferralDraftService = async ({
    referralId,
    userId
}) => {

    try {

        const deletedDraft =
            await ReferralDraft.findOneAndDelete({

                _id: referralId,

                userId
            });

        return deletedDraft;

    } catch (error) {

        throw new Error(
            error.message ||
            "Failed to delete referral draft"
        );
    }
};

// UPDATE REFERRAL DRAFT

export const updateReferralDraftService = async ({
    referralId,
    userId,
    recipientName,
    companyName,
    role,
    jobUrl,
    customContext,
    draft
}) => {

    try {

        const referral =
            await ReferralDraft.findOne({

                _id: referralId,

                userId
            });

        if (!referral) {

            return null;
        }


        // Update only supplied fields
        if (recipientName !== undefined) {
            referral.recipientName =
                recipientName.trim();
        }

        if (companyName !== undefined) {
            referral.companyName =
                companyName.trim();
        }

        if (role !== undefined) {
            referral.role =
                role.trim();
        }

        if (jobUrl !== undefined) {
            referral.jobUrl =
                jobUrl.trim();
        }

        if (customContext !== undefined) {
            referral.customContext =
                customContext.trim();
        }

        if (draft !== undefined) {
            referral.draft =
                draft.trim();
        }


        // Validation
        if (!referral.companyName) {

            throw new Error(
                "Company name is required"
            );
        }

        if (!referral.role) {

            throw new Error(
                "Role is required"
            );
        }

        if (!referral.draft) {

            throw new Error(
                "Draft cannot be empty"
            );
        }


        await referral.save();

        return referral;

    } catch (error) {

        throw new Error(
            error.message ||
            "Failed to update referral draft"
        );
    }
};

// =========================================================
// REFINE REFERRAL DRAFT USING AI
// =========================================================

export const refineReferralDraftService = async ({
    referralId,
    userId,
    instruction
}) => {

    try {

        // =================================================
        // VALIDATE INSTRUCTION
        // =================================================

        if (!instruction?.trim()) {

            throw new Error(
                "Update instruction is required"
            );
        }


        // =================================================
        // FIND REFERRAL
        // =================================================

        const referral =
            await ReferralDraft.findOne({

                _id: referralId,

                userId
            })
            .populate(
                "analysisId"
            )
            .populate(
                "resumeId"
            );


        if (!referral) {

            throw new Error(
                "Referral draft not found"
            );
        }


        // =================================================
        // GENERATE UPDATED DRAFT
        // =================================================

        const updatedDraft =
            await refineReferralDraft({

                currentDraft:
                    referral.draft,

                instruction:
                    instruction.trim(),

                recipientName:
                    referral.recipientName,

                companyName:
                    referral.companyName,

                role:
                    referral.role,

                matchedSkills:
                    referral.analysisId
                        ?.matchedSkills ||
                    [],

                resumeData:
                    referral.resumeId
                        ?.parsedData ||
                    {},

                customContext:
                    referral.customContext ||
                    ""
            });


        // =================================================
        // RETURN UPDATED DRAFT
        // =================================================

        return {

            referralId:
                referral._id,

            draft:
                updatedDraft
        };


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to refine referral draft"
        );
    }
};