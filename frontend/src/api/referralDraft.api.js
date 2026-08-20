import apiClient from "./client";


// =====================================================
// CREATE REFERRAL DRAFT
// =====================================================

export const createReferralDraft = ({
    analysisId = null,
    resumeId = null,
    recipientName = "",
    companyName = "",
    role = "",
    jobUrl = "",
    customContext = ""
}) => {

    return apiClient.post(
        "/referral",
        {
            analysisId,
            resumeId,
            recipientName,
            companyName,
            role,
            jobUrl,
            customContext
        }
    );
};


// =====================================================
// GET USER REFERRAL DRAFTS
// =====================================================

export const getReferralDrafts = () => {

    return apiClient.get(
        "/referral"
    );
};


// =====================================================
// GET SINGLE REFERRAL DRAFT
// =====================================================

export const getReferralDraft = (
    id
) => {

    return apiClient.get(
        `/referral/${id}`
    );
};


// =====================================================
// UPDATE REFERRAL DRAFT
// =====================================================

export const updateReferralDraft = (
    id,
    data
) => {

    return apiClient.put(
        `/referral/${id}`,
        data
    );
};


// =====================================================
// DELETE REFERRAL DRAFT
// =====================================================

export const deleteReferralDraft = (
    id
) => {

    return apiClient.delete(
        `/referral/${id}`
    );
};


// =====================================================
// REFINE REFERRAL DRAFT
// =====================================================

export const refineReferralDraft = (
    id,
    instruction
) => {

    return apiClient.post(
        `/referral/${id}/refine`,
        {
            instruction
        }
    );
};