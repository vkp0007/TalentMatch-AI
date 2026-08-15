import apiClient from "./client";


export const createRecommendation = (
    data
) =>
    apiClient.post(
        "/recommendations",
        data
    );


export const getRecommendations = () =>
    apiClient.get(
        "/recommendations"
    );


export const getRecommendation = (
    recommendationId
) =>
    apiClient.get(
        `/recommendations/${recommendationId}`
    );


export const deleteRecommendation = (
    recommendationId
) =>
    apiClient.delete(
        `/recommendations/${recommendationId}`
    );