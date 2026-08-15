import apiClient from "./client";


export const generateApplicationEmail = (
    data
) =>
    apiClient.post(
        "/application-emails",
        data
    );


export const getApplicationEmails = () =>
    apiClient.get(
        "/application-emails"
    );


export const getApplicationEmail = (
    applicationId
) =>
    apiClient.get(
        `/application-emails/${applicationId}`
    );


export const refineApplicationEmail = (
    applicationId,
    data
) =>
    apiClient.put(
        `/application-emails/${applicationId}`,
        data
    );


export const deleteApplicationEmail = (
    applicationId
) =>
    apiClient.delete(
        `/application-emails/${applicationId}`
    );