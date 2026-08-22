import { User } from "../models/user.model.js"

import { generateToken }
    from "../config/generateToken.js"


// register
export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body


        // validation
        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"
            })
        }


        // existing user
        const existingUser =await User.findOne({

                email
            })

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "User already exists"
            })
        }


        // create user
        const user =
            await User.create({

                name,
                email,
                password
            })


        // token
        const token =
            generateToken(user._id)


        res.status(201).json({

            success: true,

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email
            }
        })

    } catch (error) {

        res.status(500).json({

            success: false,
             
            message: error.message
        })
    }
}



// login
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        // find user
        const user = await User.findOne({ email })

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Invalid credentials"
            })
        }


        // compare password
        const isMatch = await user.comparePassword(password)

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Invalid credentials"
            })
        }


        // token
        const token = generateToken(user._id)

        res.status(200).json({

            success: true,

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email
            }
        })

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        })
    }
}

// get logged-in user profile
export const getUserProfile = async (req, res) => {

    console.time("GET /profile TOTAL");
    console.time("GET /profile DB");

    try {

        const user =
            await User.findById(
                req.user._id
            ).select("-password");

        console.timeEnd("GET /profile DB");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.timeEnd("GET /profile DB");

        return res.status(500).json({
            success: false,
            message: error.message
        });

    } finally {

        console.timeEnd("GET /profile TOTAL");
    }
};