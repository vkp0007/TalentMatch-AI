import axios from "axios";
import FormData from "form-data";

const AI_BASE_URL =
    process.env.AI_SERVICE_URL;

console.log(
    "AI_SERVICE_URL:",
    JSON.stringify(AI_BASE_URL)
);


const apiClient = axios.create({

    baseURL: AI_BASE_URL,

    timeout: 120000

});


// =========================================================
// RESUME EXTRACTION
// =========================================================

const extractResume = async (
    file
) => {

    if (!file) {

        throw new Error(
            "Resume file is required"
        );
    }


    const formData =
        new FormData();


    formData.append(
        "file",
        file.buffer,
        {
            filename:
                file.originalname,

            contentType:
                file.mimetype
        }
    );


    const response =
        await apiClient.post(

            "/extract-resume",

            formData,

            {
                headers:
                    formData.getHeaders(),

                maxContentLength:
                    Infinity,

                maxBodyLength:
                    Infinity
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