import apiClient from "./client";


// =====================================================
// CREATE APPLICATION EMAIL
// =====================================================

export const createApplicationEmail = ({
    resumeId = null,
    analysisId = null,
    role = "",
    jobUrl = "",
    userRequest = ""
}) => {

    return apiClient.post(
        "/application-email",
        {
            resumeId,
            analysisId,
            role,
            jobUrl,
            userRequest
        }
    );
};


// =====================================================
// GET USER APPLICATION EMAILS
// =====================================================

export const getApplicationEmails = () => {

    return apiClient.get(
        "/application-email"
    );
};


// =====================================================
// GET SINGLE APPLICATION EMAIL
// =====================================================

export const getApplicationEmail = (
    applicationEmailId
) => {

    return apiClient.get(
        `/application-email/${applicationEmailId}`
    );
};


// =====================================================
// REFINE APPLICATION EMAIL
// =====================================================

export const refineApplicationEmail = (
    applicationEmailId,
    userRequest
) => {

    return apiClient.patch(
        `/application-email/${applicationEmailId}/refine`,
        {
            userRequest
        }
    );
};


// =====================================================
// DELETE APPLICATION EMAIL
// =====================================================

export const deleteApplicationEmail = (
    applicationEmailId
) => {

    return apiClient.delete(
        `/application-email/${applicationEmailId}`
    );
};