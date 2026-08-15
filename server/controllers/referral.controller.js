import {
    createReferralDraftService,
    getUserReferralDraftsService,
    getReferralDraftByIdService,
    deleteReferralDraftService,
    updateReferralDraftService,
    refineReferralDraftService
} from "../services/referral.service.js";


// CREATE REFERRAL DRAFT

export const createReferralDraft =
    async (req, res) => {

        try {

            const {
                analysisId,
                resumeId,
                recipientName,
                companyName,
                role,
                jobUrl,
                customContext
            } = req.body;


            const draft =
                await createReferralDraftService({

                    userId:
                        req.user._id,

                    analysisId,

                    resumeId,

                    recipientName,

                    companyName,

                    role,

                    jobUrl,

                    customContext
                });


            return res.status(201).json({

                success: true,

                message:
                    "Referral draft created successfully",

                data: draft
            });


        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to create referral draft"
            });
        }
    };


// GET ALL USER REFERRAL DRAFTS


export const getUserReferralDrafts =
    async (req, res) => {

        try {

            const drafts =
                await getUserReferralDraftsService(
                    req.user._id
                );


            return res.status(200).json({

                success: true,

                count: drafts.length,

                data: drafts
            });


        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch referral drafts"
            });
        }
    };


// GET SINGLE REFERRAL DRAFT


export const getReferralDraftById =
    async (req, res) => {

        try {

            const {
                id
            } = req.params;


            const draft =
                await getReferralDraftByIdService({

                    referralId: id,

                    userId: req.user._id
                });


            if (!draft) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Referral draft not found"
                });
            }


            return res.status(200).json({

                success: true,

                data: draft
            });


        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch referral draft"
            });
        }
    };


// DELETE REFERRAL DRAFT


export const deleteReferralDraft =
    async (req, res) => {

        try {

            const {
                id
            } = req.params;


            const deletedDraft =
                await deleteReferralDraftService({

                    referralId: id,

                    userId: req.user._id
                });


            if (!deletedDraft) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Referral draft not found"
                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Referral draft deleted successfully"
            });


        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to delete referral draft"
            });
        }
    };

// =========================================================
// UPDATE REFERRAL DRAFT
// =========================================================

export const updateReferralDraft =
    async (req, res) => {

        try {

            const {
                id
            } = req.params;

            const {
                recipientName,
                companyName,
                role,
                jobUrl,
                customContext,
                draft
            } = req.body;


            const updatedDraft =
                await updateReferralDraftService({

                    referralId: id,

                    userId:
                        req.user._id,

                    recipientName,

                    companyName,

                    role,

                    jobUrl,

                    customContext,

                    draft
                });


            if (!updatedDraft) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Referral draft not found"
                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Referral draft updated successfully",

                data: updatedDraft
            });


        } catch (error) {

            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to update referral draft"
            });
        }
    };


    // =========================================================
// REFINE REFERRAL DRAFT
// =========================================================

export const refineReferralDraft = async (
    req,
    res
) => {

    try {

        const {
            instruction
        } = req.body;


        const result =
            await refineReferralDraftService({

                referralId:
                    req.params.id,

                userId:
                    req.user._id,

                instruction
            });


        return res.status(200).json({

            success: true,

            message:
                "Referral draft refined successfully",

            data:
                result
        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to refine referral draft"
        });
    }
};