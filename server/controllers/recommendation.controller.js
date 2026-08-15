import {
    createRecommendationService,
    getRecommendationService
} from "../services/recommendation.service.js";


// =========================================================
// CREATE RECOMMENDATION
// =========================================================

export const createRecommendation =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                analysisId
            } = req.body;


            const recommendation =
                await createRecommendationService({

                    userId,

                    analysisId
                });


            return res.status(200).json({

                success: true,

                message:
                    "Recommendations generated successfully",

                data:
                    recommendation
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to generate recommendations"
            });
        }
    };


// =========================================================
// GET RECOMMENDATION
// =========================================================

export const getRecommendation =
    async (req, res) => {

        try {

            const userId =
                req.user._id;

            const {
                analysisId
            } = req.params;


            const recommendation =
                await getRecommendationService({

                    userId,

                    analysisId
                });


            if (!recommendation) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Recommendations not found"
                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Recommendations retrieved successfully",

                data:
                    recommendation
            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    error.message ||
                    "Failed to get recommendations"
            });
        }
    };