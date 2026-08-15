import apiClient from "./client";


// =====================================================
// REGISTER
// =====================================================

export const registerUser = (data) =>
    apiClient.post(
        "/auth/register",
        data
    );


// =====================================================
// LOGIN
// =====================================================

export const loginUser = (data) =>
    apiClient.post(
        "/auth/login",
        data
    );


// =====================================================
// GET USER PROFILE
// =====================================================

export const getUserProfile = () =>
    apiClient.get(
        "/auth/profile"
    );


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = (data) =>
    apiClient.put(
        "/auth/profile",
        data
    );


// =====================================================
// LOGOUT
// =====================================================

export const logoutUser = () =>
    apiClient.post(
        "/auth/logout"
    );