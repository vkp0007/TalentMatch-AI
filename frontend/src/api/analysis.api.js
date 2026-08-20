import apiClient from "./client";


// =====================================================
// CREATE ANALYSIS
// =====================================================

export const analyzeResume = ({
    resumeId,
    jobDescription
}) =>
    apiClient.post(
        "/analysis",
        {
            resumeId,
            jobDescription
        }
    );


// =====================================================
// GET ALL USER ANALYSES
// =====================================================

export const getUserAnalyses = () =>
    apiClient.get(
        "/analysis"
    );


// =====================================================
// GET RESUME ANALYSES
// =====================================================

export const getResumeAnalyses = (
    resumeId
) =>
    apiClient.get(
        `/analysis/resume/${resumeId}`
    );


// =====================================================
// GET SINGLE ANALYSIS
// =====================================================

export const getAnalysisById = (
    analysisId
) =>
    apiClient.get(
        `/analysis/${analysisId}`
    );


// =====================================================
// DELETE ANALYSIS
// =====================================================

export const deleteAnalysis = (
    analysisId
) =>
    apiClient.delete(
        `/analysis/${analysisId}`
    );