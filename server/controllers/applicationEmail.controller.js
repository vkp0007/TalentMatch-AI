import {
    createApplicationEmailService,
    getUserApplicationEmailsService,
    getApplicationEmailByIdService,
    refineApplicationEmailService,
    deleteApplicationEmailService
}
from "../services/applicationEmail.service.js";

// =========================================================
// CREATE APPLICATION EMAIL
// =========================================================

export const createApplicationEmail =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                resumeId,
                analysisId,
                role,
                jobUrl,
                userRequest
            } = req.body;


            const applicationEmail =
                await createApplicationEmailService({

                    userId,

                    resumeId,

                    analysisId,

                    role,

                    jobUrl,

                    userRequest
                });


            return res.status(201).json({

                success: true,

                message:
                    "Application email generated successfully",

                data:
                    applicationEmail
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to generate application email"
            });
        }
    };

    // =========================================================
// GET ALL APPLICATION EMAILS
// =========================================================

export const getUserApplicationEmails =
    async (req, res) => {

        try {

            const userId =
                req.user._id;


            const emails =
                await getUserApplicationEmailsService(
                    userId
                );


            return res.status(200).json({

                success: true,

                count:
                    emails.length,

                data:
                    emails
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch application emails"
            });
        }
    };


// =========================================================
// GET SINGLE APPLICATION EMAIL
// =========================================================

export const getApplicationEmailById =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                applicationEmailId
            } = req.params;


            const email =
                await getApplicationEmailByIdService({

                    applicationEmailId,

                    userId
                });


            if (!email) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Application email not found"
                });
            }


            return res.status(200).json({

                success: true,

                data:
                    email
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch application email"
            });
        }
    };


    // =========================================================
// REFINE APPLICATION EMAIL
// =========================================================

export const refineApplicationEmailController =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                applicationEmailId
            } = req.params;

            const {
                userRequest
            } = req.body;


            const applicationEmail =
                await refineApplicationEmailService({

                    userId,

                    applicationEmailId,

                    userRequest
                });


            return res.status(200).json({

                success: true,

                message:
                    "Application email refined successfully",

                data:
                    applicationEmail
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to refine application email"
            });
        }
    };

    // =========================================================
// DELETE APPLICATION EMAIL
// =========================================================

export const deleteApplicationEmail =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                applicationEmailId
            } = req.params;


            const deletedEmail =
                await deleteApplicationEmailService({

                    applicationEmailId,

                    userId
                });


            if (!deletedEmail) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Application email not found"
                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Application email deleted successfully"
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to delete application email"
            });
        }
    };