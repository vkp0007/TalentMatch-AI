import api from "./axios";


// register
export const registerUser = async (userData) => {

    const response = await api.post(

        "/auth/register",

        userData
    );

    return response.data;
};


// login
export const loginUser = async (userData) => {

    const response = await api.post(

        "/auth/login",

        userData
    );

    return response.data;
};


// get profile
export const getUserProfile = async () => {

    const response = await api.get(

        "/auth/profile"
    );

    return response.data;
};