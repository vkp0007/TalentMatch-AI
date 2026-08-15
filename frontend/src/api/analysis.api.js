import apiClient from "./client";


export const createAnalysis = (
    data
) =>
    apiClient.post(
        "/analysis",
        data
    );


export const getAnalyses = () =>
    apiClient.get("/analysis");


export const getAnalysis = (
    analysisId
) =>
    apiClient.get(
        `/analysis/${analysisId}`
    );


export const deleteAnalysis = (
    analysisId
) =>
    apiClient.delete(
        `/analysis/${analysisId}`
    );