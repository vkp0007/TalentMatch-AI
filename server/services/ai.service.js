import axios from "axios";

const AI_BASE_URL = process.env.AI_SERVICE_URL;

console.log(
    "AI_SERVICE_URL:",
    JSON.stringify(AI_BASE_URL)
);

const apiClient = axios.create({
    baseURL: AI_BASE_URL,
    timeout: 30000
});


// =========================================================
// RESUME EXTRACTION
// =========================================================

const extractResume = async (
    filePath
) => {

    const response =
        await apiClient.post(

            "/extract-resume",

            {
                filePath
            }
        );

    return response.data;
};


// =========================================================
// JOB ANALYSIS
// =========================================================

const analyzeJobAI = async ({
    resumeData,
    resumeEmbedding,
    jobDescription
}) => {

    const response =
        await apiClient.post(

            "/analyze-job",

            {
                resumeData,

                resumeEmbedding,

                jobDescription
            }
        );

    return response.data;
};


export {
    extractResume,
    analyzeJobAI
};