import apiClient from "./client";

export const uploadResume = (formData) =>
    apiClient.post(
        "/resume",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );


export const getResumes = () =>
    apiClient.get("/resume");



export const updateResume = (
    resumeId,
    data
) =>
    apiClient.put(
        `/resume/${resumeId}`,
        data
    );


export const deleteResume = (
    resumeId
) =>
    apiClient.delete(
        `/resume/${resumeId}`
    );

export const getResume = (
    resumeId
) =>
    apiClient.get(
        `/resumes/${resumeId}`
    );