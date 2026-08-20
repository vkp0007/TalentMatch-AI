import {
    ReferralDraft
} from "../models/referral.model.js";

import {
    generateReferralDraft,
    refineReferralDraft
} from "./llm.service.js";


// =========================================================
// CREATE REFERRAL DRAFT
// =========================================================

export const createReferralDraftService = async ({
    userId,
    recipientName,
    companyName,
    role,
    jobUrl,
    customContext
}) => {

    try {

        // =================================================
        // VALIDATION
        // =================================================

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


        if (!jobUrl?.trim()) {

            throw new Error(
                "Job URL is required"
            );
        }


        if (!customContext?.trim()) {

            throw new Error(
                "Referral context is required"
            );
        }


        const company =
            companyName.trim();


        const targetRole =
            role.trim();


        const url =
            jobUrl.trim();


        const context =
            customContext.trim();


        const recipient =
            recipientName?.trim() || "there";


        // =================================================
        // GENERATE REFERRAL USING LLM
        // =================================================

        const draft =
            await generateReferralDraft({

                recipientName:
                    recipient,

                companyName:
                    company,

                role:
                    targetRole,

                customContext:
                    context,

                jobUrl:
                    url

            });


        // =================================================
        // SAVE DRAFT
        // =================================================

        const referral =
            await ReferralDraft.create({

                userId,

                recipientName:
                    recipientName?.trim() || "",

                companyName:
                    company,

                role:
                    targetRole,

                jobUrl:
                    url,

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


// =========================================================
// GET ALL USER REFERRAL DRAFTS
// =========================================================

export const getUserReferralDraftsService = async (
    userId
) => {

    try {

        const drafts =
            await ReferralDraft.find({

                userId

            })
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


// =========================================================
// GET SINGLE REFERRAL DRAFT
// =========================================================

export const getReferralDraftByIdService = async ({
    referralId,
    userId
}) => {

    try {

        const draft =
            await ReferralDraft.findOne({

                _id:
                    referralId,

                userId

            });


        return draft;


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to fetch referral draft"

        );
    }
};


// =========================================================
// DELETE REFERRAL DRAFT
// =========================================================

export const deleteReferralDraftService = async ({
    referralId,
    userId
}) => {

    try {

        const deletedDraft =
            await ReferralDraft.findOneAndDelete({

                _id:
                    referralId,

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


// =========================================================
// UPDATE REFERRAL DRAFT
// =========================================================

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

                _id:
                    referralId,

                userId

            });


        if (!referral) {

            return null;

        }


        // =================================================
        // UPDATE SUPPLIED FIELDS
        // =================================================

        if (
            recipientName !== undefined
        ) {

            referral.recipientName =
                recipientName.trim();

        }


        if (
            companyName !== undefined
        ) {

            referral.companyName =
                companyName.trim();

        }


        if (
            role !== undefined
        ) {

            referral.role =
                role.trim();

        }


        if (
            jobUrl !== undefined
        ) {

            referral.jobUrl =
                jobUrl.trim();

        }


        if (
            customContext !== undefined
        ) {

            referral.customContext =
                customContext.trim();

        }


        if (
            draft !== undefined
        ) {

            referral.draft =
                draft.trim();

        }


        // =================================================
        // VALIDATION
        // =================================================

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


        if (!referral.jobUrl) {

            throw new Error(
                "Job URL is required"
            );

        }


        if (!referral.customContext) {

            throw new Error(
                "Referral context is required"
            );

        }


        if (!referral.draft) {

            throw new Error(
                "Draft cannot be empty"
            );

        }


        // =================================================
        // SAVE
        // =================================================

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

                _id:
                    referralId,

                userId

            });


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

                jobUrl:
                    referral.jobUrl,

                customContext:
                    referral.customContext || ""

            });


        // =================================================
        // SAVE REFINED DRAFT
        // =================================================

        referral.draft =
            updatedDraft;


        await referral.save();


        // =================================================
        // RETURN UPDATED DRAFT
        // =================================================

        return {

            referralId:
                referral._id,

            draft:
                referral.draft

        };


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to refine referral draft"

        );
    }
};