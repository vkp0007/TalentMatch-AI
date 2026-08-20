import apiClient from "./client";


// =====================================================
// CREATE / GENERATE
// =====================================================

export const createRecommendation = (
    analysisId
) =>

    apiClient.post(
        "/recommendations",
        {
            analysisId
        }
    );


// =====================================================
// GET EXISTING
// =====================================================

export const getRecommendation = (
    analysisId
) =>

    apiClient.get(
        `/recommendations/${analysisId}`
    );