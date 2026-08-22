import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {

    console.time("AUTH TOTAL");

    try {

        let token;

        // check bearer token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token =
                req.headers.authorization
                    .split(" ")[1];
        }

        // token missing
        if (!token) {
            console.timeEnd("AUTH TOTAL");

            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing"
            });
        }


        // JWT verification
        console.time("JWT VERIFY");

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        console.timeEnd("JWT VERIFY");


        // MongoDB user lookup
        console.time("AUTH USER DB");

        req.user =
            await User.findById(
                decoded.id
            ).select("-password");

        console.timeEnd("AUTH USER DB");


        // user missing
        if (!req.user) {

            console.timeEnd("AUTH TOTAL");

            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        console.timeEnd("AUTH TOTAL");

        next();

    } catch (error) {

        console.timeEnd("AUTH TOTAL");

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};