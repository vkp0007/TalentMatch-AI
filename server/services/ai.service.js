import axios from "axios";

const AI_BASE_URL =
  process.env.AI_SERVICE_URL;

const apiClient = axios.create({

  baseURL: AI_BASE_URL,

  timeout: 30000
});


// extract text
const extractResumeText =
async (filePath) => {

  const response =
    await apiClient.post(

      "/extract-text",

      { filePath }
    );

  return response.data;
};


// analyze resume
const analyzeResumeAI =
async ({

  resumeText,
  parsedData,
  embedding,
  jobDescription

}) => {

  const response =
    await apiClient.post(

      "/analyze-resume",

      {

        resumeText,
        parsedData,
        embedding,
        jobDescription
      }
    );

  return response.data;
};


export {

  extractResumeText,
  analyzeResumeAI
};