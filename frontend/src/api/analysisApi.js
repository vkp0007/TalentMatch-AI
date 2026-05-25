import api from "./axios";



// =========================================================
// ANALYZE RESUME
// =========================================================

export const analyzeResume = async (analysisData) => {

    const response = await api.post(

        "/analysis",

        analysisData
    );

    return response.data;
};



// =========================================================
// GET ALL USER ANALYSES
// =========================================================

export const getUserAnalyses = async () => {

    const response = await api.get(

        "/analysis"
    );

    return response.data;
};



// =========================================================
// GET SINGLE ANALYSIS
// =========================================================

export const getAnalysisById = async (analysisId) => {

    const response = await api.get(

        `/analysis/${analysisId}`
    );

    return response.data;
};



// =========================================================
// GET ANALYSES FOR A RESUME
// =========================================================

export const getResumeAnalyses = async (resumeId) => {

    const response = await api.get(

        `/analysis/resume/${resumeId}`
    );

    return response.data;
};



// =========================================================
// DELETE ANALYSIS
// =========================================================

export const deleteAnalysis = async (analysisId) => {

    const response = await api.delete(

        `/analysis/${analysisId}`
    );

    return response.data;
};