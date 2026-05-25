import api from "./axios";


// upload resume
export const uploadResume = async (formData) => {

    const response = await api.post(

        "/resume",

        formData,

        {

            headers: {

                "Content-Type":
                    "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const getUserResumes =
async () => {

    const response =
        await api.get("/resume");

    return response.data;
};