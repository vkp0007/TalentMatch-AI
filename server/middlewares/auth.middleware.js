import jwt from "jsonwebtoken"

import { User }
from "../models/user.model.js"


export const protect = async (req, res, next) => {

    try {

        let token


        // check bearer token
        if (

            req.headers.authorization &&

            req.headers.authorization.startsWith(
                "Bearer"
            )
        ) {

            token =
                req.headers.authorization
                .split(" ")[1]
        }


        // token missing
        if (!token) {

            return res.status(401).json({

                success: false,

                message:
                "Not authorized, token missing"
            })
        }


        // verify token
        const decoded =
            jwt.verify(

                token,

                process.env.JWT_SECRET
            )


        // get user
        req.user =
            await User.findById(

                decoded.id

            ).select("-password")


        // user missing
        if (!req.user) {

            return res.status(401).json({

                success: false,

                message:
                "User not found"
            })
        }


        next()

    } catch(error) {

        return res.status(401).json({

            success: false,

            message:
            "Invalid or expired token"
        })
    }
}