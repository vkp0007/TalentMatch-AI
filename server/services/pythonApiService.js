import axios from "axios";

const extractResumeText = async (filePath) => {

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/extract-text",
      {
        filePath
      }
    );

    return response.data;

  } catch (error) {

    console.log("FastAPI Error:", error.message);

    return {
      success: false,
      error: error.message
    };
  }
};

export { extractResumeText };