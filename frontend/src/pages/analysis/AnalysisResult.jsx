import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router";

import {
    getAnalysisById
} from "../../api/analysis.api";

import AnalysisHeader
    from "../../components/analysis/AnalysisHeader";

import ScoreOverview
    from "../../components/analysis/ScoreOverview";

import EligibilityWarnings
    from "../../components/analysis/EligibilityWarnings";

import SkillsGrid
    from "../../components/analysis/SkillsGrid";

import AdditionalSkills
    from "../../components/analysis/AdditionalSkills";

import EligibilitySection
    from "../../components/analysis/EligibilitySection";

import JobRequirements
    from "../../components/analysis/JobRequirements";

import RecommendationBanner
    from "../../components/analysis/RecommendationBanner";

import LoadingState
    from "../../components/dashboard/LoadingState";

import ErrorState
    from "../../components/dashboard/ErrorState";


const AnalysisResult = () => {

    const {
        analysisId
    } = useParams();

    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [analysis, setAnalysis] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD ANALYSIS
    // =====================================================

    const loadAnalysis = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await getAnalysisById(
                    analysisId
                );


            console.log(
                "ANALYSIS RESULT RESPONSE:",
                response
            );


            setAnalysis(
                response?.data?.analysis ||
                null
            );


        } catch (error) {

            console.error(
                "Failed to load analysis:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load analysis."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        if (analysisId) {

            loadAnalysis();

        }

    }, [analysisId]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-6
            ">

                <LoadingState />

            </div>

        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-6
            ">

                <ErrorState
                    message={error}
                    onRetry={loadAnalysis}
                />

            </div>

        );
    }


    // =====================================================
    // ANALYSIS NOT FOUND
    // =====================================================

    if (!analysis) {

        return (

            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-6
            ">

                <ErrorState
                    message="Analysis not found."
                    onRetry={() =>
                        navigate(
                            "/dashboard"
                        )
                    }
                />

            </div>

        );
    }


    // =====================================================
    // DATA
    // =====================================================

    const matchedSkills =
        analysis.matchedSkills || [];


    const missingSkills =
        analysis.missingSkills || [];


    const additionalSkills =
        analysis.additionalSkills || [];


    const eligibilityWarnings =
        analysis.eligibilityWarnings || [];


    const responsibilities =
        analysis.jdProfile
            ?.responsibilities || [];


    const requiredSkills =
        analysis.jdProfile
            ?.requiredSkills || [];


    const preferredSkills =
        analysis.jdProfile
            ?.preferredSkills || [];


    const educationRequirements =
        analysis.jdProfile
            ?.educationRequirements
            ?.required || [];


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            max-w-6xl
            mx-auto
            px-6
            pb-12
        ">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="
                pt-1
                mb-6
            ">

                <AnalysisHeader

                    targetRole={
                        analysis.targetRole
                    }

                    resumeId={
                        analysis.resumeId
                    }

                    onBack={() =>
                        navigate(
                            "/dashboard"
                        )
                    }

                    onNewAnalysis={() =>
                        navigate(
                            `/analysis/new?resumeId=${analysis.resumeId?._id || analysis.resumeId}`
                        )
                    }

                />

            </div>


            {/* =================================================
                ANALYSIS CONTENT
            ================================================= */}

            <div className="
                space-y-5
            ">

                {/* =================================================
                    SCORE OVERVIEW
                ================================================= */}

                <ScoreOverview

                    finalScore={
                        analysis.finalScore
                    }

                    semanticScore={
                        analysis.semanticScore
                    }

                    skillScore={
                        analysis.skillScore
                    }

                />


                {/* =================================================
                    JOB REQUIREMENTS
                ================================================= */}

                <JobRequirements

                    requiredSkills={
                        requiredSkills
                    }

                    preferredSkills={
                        preferredSkills
                    }

                    educationRequirements={
                        educationRequirements
                    }

                    responsibilities={
                        responsibilities
                    }

                />


                {/* =================================================
                    ELIGIBILITY WARNINGS
                ================================================= */}

                <EligibilityWarnings

                    warnings={
                        eligibilityWarnings
                    }

                />


                {/* =================================================
                    SKILLS
                ================================================= */}

                <SkillsGrid

                    matchedSkills={
                        matchedSkills
                    }

                    missingSkills={
                        missingSkills
                    }

                />


                {/* =================================================
                    ADDITIONAL SKILLS
                ================================================= */}

                <AdditionalSkills

                    skills={
                        additionalSkills
                    }

                />


                {/* =================================================
                    ELIGIBILITY
                ================================================= */}

                <EligibilitySection

                    educationMatch={
                        analysis.educationMatch
                    }

                    experienceMatch={
                        analysis.experienceMatch
                    }

                />


                {/* =================================================
                    RECOMMENDATIONS
                ================================================= */}

                <RecommendationBanner

                    onViewRecommendations={() =>
                        navigate(
                            `/recommendations/${analysis._id}`
                        )
                    }

                />

            </div>

        </div>
    );
};


export default AnalysisResult;