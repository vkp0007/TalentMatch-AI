import {
    analyzeResumeService,
    getUserAnalysesService,
    getAnalysisByIdService,
    getResumeAnalysesService,
    deleteAnalysisService
} from "../services/analysis.service.js";



// =========================================================
// ANALYZE RESUME
// =========================================================

export const analyzeResume = async (req, res) => {

    try {

        // =================================================
        // REQUEST DATA
        // =================================================

        let {
            resumeId,
            jobDescription,
            targetRole = ""
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (!resumeId) {

            return res.status(400).json({

                success: false,

                message: "Resume ID is required"
            });
        }


        if (
            !jobDescription
            ||
            !jobDescription.trim()
        ) {

            return res.status(400).json({

                success: false,

                message: "Job description is required"
            });
        }


        // =================================================
        // CLEAN INPUT
        // =================================================

        jobDescription = jobDescription.trim();

        targetRole = targetRole?.trim?.() || "";


        // =================================================
        // TOKEN SAFETY
        // =================================================

        if (jobDescription.length > 15000) {

            jobDescription = jobDescription.slice(
                0,
                15000
            );
        }


        // =================================================
        // SERVICE CALL
        // =================================================

        const result = await analyzeResumeService({

            userId: req.user._id,

            resumeId,

            targetRole,

            jobDescription
        });




        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({

            success: true,

            message: "Resume analyzed successfully",

            data: result
        });

    } catch (error) {
  return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Resume analysis failed"
        });
    }
};



// =========================================================
// GET ALL USER ANALYSES
// =========================================================

export const getUserAnalyses = async (req, res) => {

    try {

        const analyses =
            await getUserAnalysesService(
                req.user._id
            );

        return res.status(200).json({

            success: true,

            count: analyses.length,

            analyses
        });

    } catch (error) {
        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch analyses"
        });
    }
};



// =========================================================
// GET SINGLE ANALYSIS
// =========================================================

export const getAnalysisById = async (req, res) => {

    try {

        const {
            id
        } = req.params;

        const analysis =
            await getAnalysisByIdService({

                analysisId: id,

                userId: req.user._id
            });


        if (!analysis) {

            return res.status(404).json({

                success: false,

                message: "Analysis not found"
            });
        }

        return res.status(200).json({

            success: true,

            analysis
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch analysis"
        });
    }
};



// =========================================================
// GET ANALYSES FOR SINGLE RESUME
// =========================================================

export const getResumeAnalyses = async (req, res) => {

    try {

        const {
            resumeId
        } = req.params;

        const analyses =
            await getResumeAnalysesService({

                resumeId,

                userId: req.user._id
            });

        return res.status(200).json({

            success: true,

            count: analyses.length,

            analyses
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch resume analyses"
        });
    }
};



// =========================================================
// DELETE ANALYSIS
// =========================================================

export const deleteAnalysis = async (req, res) => {

    try {

        const {
            id
        } = req.params;

        const deletedAnalysis =
            await deleteAnalysisService({

                analysisId: id,

                userId: req.user._id
            });

        if (!deletedAnalysis) {

            return res.status(404).json({

                success: false,

                message: "Analysis not found"
            });
        }

        return res.status(200).json({

            success: true,

            message:
                "Analysis deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to delete analysis"
        });
    }
};