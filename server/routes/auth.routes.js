import express from "express";

import {
    registerUser,
    loginUser,
    getUserProfile
} from "../controllers/auth.controller.js";

import {
    protect
} from "../middlewares/auth.middleware.js";


const router = express.Router();


// Public
router.post(
    "/register",
    registerUser
);

router.post(
    "/login",
    loginUser
);


// Protected
router.get(
    "/profile",
    protect,
    getUserProfile
);


export default router;