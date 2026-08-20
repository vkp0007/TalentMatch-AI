import {
    ApplicationEmail
} from "../models/applicationEmail.model.js";


import {
    generateApplicationEmail,
    refineApplicationEmail
} from "./llm.service.js";



// =========================================================
// CREATE APPLICATION EMAIL
// =========================================================

export const createApplicationEmailService = async ({
    userId,
    role,
    jobUrl,
    userRequest
}) => {

    try {

        // =================================================
        // VALIDATION
        // =================================================

        if (!role?.trim()) {

            throw new Error(
                "Role is required"
            );
        }


        if (!jobUrl?.trim()) {

            throw new Error(
                "Job URL is required"
            );
        }


        if (!userRequest?.trim()) {

            throw new Error(
                "Please specify what you want included in the email"
            );
        }


        // =================================================
        // GENERATE SUBJECT + EMAIL
        // =================================================

        const generatedEmail =
            await generateApplicationEmail({

                role:
                    role.trim(),

                jobUrl:
                    jobUrl.trim(),

                userRequest:
                    userRequest.trim()
            });


        // =================================================
        // VALIDATE AI RESPONSE
        // =================================================

        if (
            !generatedEmail ||
            typeof generatedEmail !== "object"
        ) {

            throw new Error(
                "Failed to generate application email"
            );
        }


        const subject =
            generatedEmail.subject?.trim();


        const email =
            generatedEmail.email?.trim();


        if (!subject) {

            throw new Error(
                "AI failed to generate email subject"
            );
        }


        if (!email) {

            throw new Error(
                "AI failed to generate application email"
            );
        }


        // =================================================
        // SAVE
        // =================================================

        const applicationEmail =
            await ApplicationEmail.create({

                userId,

                role:
                    role.trim(),

                jobUrl:
                    jobUrl.trim(),

                userRequest:
                    userRequest.trim(),

                subject,

                email
            });


        return applicationEmail;


    } catch (error) {

        throw new Error(

            error.message ||
            "Failed to create application email"
        );
    }
};



// =========================================================
// GET ALL APPLICATION EMAILS
// =========================================================

export const getUserApplicationEmailsService =
    async (userId) => {

        try {

            const emails =
                await ApplicationEmail.find({

                    userId

                })
                .sort({
                    createdAt: -1
                });


            return emails;


        } catch (error) {

            throw new Error(

                error.message ||
                "Failed to fetch application emails"
            );
        }
    };



// =========================================================
// GET SINGLE APPLICATION EMAIL
// =========================================================

export const getApplicationEmailByIdService =
    async ({
        applicationEmailId,
        userId
    }) => {

        try {

            const email =
                await ApplicationEmail.findOne({

                    _id:
                        applicationEmailId,

                    userId
                });


            return email;


        } catch (error) {

            throw new Error(

                error.message ||
                "Failed to fetch application email"
            );
        }
    };



// =========================================================
// REFINE APPLICATION EMAIL
// =========================================================

export const refineApplicationEmailService =
    async ({
        userId,
        applicationEmailId,
        userRequest
    }) => {

        try {

            // =================================================
            // VALIDATION
            // =================================================

            if (!applicationEmailId) {

                throw new Error(
                    "Application email ID is required"
                );
            }


            if (!userRequest?.trim()) {

                throw new Error(
                    "Please specify what you want changed"
                );
            }


            // =================================================
            // FIND EXISTING EMAIL
            // =================================================

            const applicationEmail =
                await ApplicationEmail.findOne({

                    _id:
                        applicationEmailId,

                    userId
                });


            if (!applicationEmail) {

                throw new Error(
                    "Application email not found"
                );
            }


            // =================================================
            // REFINE SUBJECT + EMAIL
            // =================================================

            const refinedEmail =
                await refineApplicationEmail({

                    currentSubject:
                        applicationEmail.subject,

                    currentEmail:
                        applicationEmail.email,

                    role:
                        applicationEmail.role,

                    jobUrl:
                        applicationEmail.jobUrl,

                    userRequest:
                        userRequest.trim()
                });


            // =================================================
            // VALIDATE AI RESPONSE
            // =================================================

            if (
                !refinedEmail ||
                typeof refinedEmail !== "object"
            ) {

                throw new Error(
                    "Failed to refine application email"
                );
            }


            const subject =
                refinedEmail.subject?.trim();


            const email =
                refinedEmail.email?.trim();


            if (!subject) {

                throw new Error(
                    "AI failed to generate refined subject"
                );
            }


            if (!email) {

                throw new Error(
                    "AI failed to generate refined email"
                );
            }


            // =================================================
            // UPDATE
            // =================================================

            applicationEmail.subject =
                subject;


            applicationEmail.email =
                email;


            applicationEmail.userRequest =
                userRequest.trim();


            await applicationEmail.save();


            return applicationEmail;


        } catch (error) {

            throw new Error(

                error.message ||
                "Failed to refine application email"
            );
        }
    };



// =========================================================
// DELETE APPLICATION EMAIL
// =========================================================

export const deleteApplicationEmailService =
    async ({
        applicationEmailId,
        userId
    }) => {

        try {

            const deletedEmail =
                await ApplicationEmail.findOneAndDelete({

                    _id:
                        applicationEmailId,

                    userId
                });


            return deletedEmail;


        } catch (error) {

            throw new Error(

                error.message ||
                "Failed to delete application email"
            );
        }
    };