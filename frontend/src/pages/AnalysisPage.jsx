import {
    useState
} from "react";

import {
    useParams
} from "react-router";

import DashboardLayout
from "../components/layout/DashboardLayout";

import Topbar
from "../components/layout/Topbar";

import AnalysisForm
from "../components/analysis/AnalysisForm";

import AnalysisResults
from "../components/analysis/AnalysisResults";

import {
    analyzeResume
} from "../api/analysisApi.js";


const AnalysisPage = () => {

    // =====================================================
    // ROUTE PARAMS
    // =====================================================

    const {
        resumeId
    } = useParams();


    // =====================================================
    // STATE
    // =====================================================

    const [
        targetRole,
        setTargetRole
    ] = useState("");


    const [
        jobDescription,
        setJobDescription
    ] = useState("");


    const [
        analysis,
        setAnalysis
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    // =====================================================
    // ANALYZE RESUME
    // =====================================================

    const handleAnalyze = async (e) => {

        e.preventDefault();

        setError("");


        // =================================================
        // VALIDATION
        // =================================================

        if (!targetRole.trim()) {

            return setError(
                "Please enter target role"
            );
        }


        if (!jobDescription.trim()) {

            return setError(
                "Please enter job description"
            );
        }


        try {

            setLoading(true);


            // =============================================
            // API CALL
            // =============================================

            const response =
                await analyzeResume({

                    resumeId,

                    targetRole,

                    jobDescription
                });


            // =============================================
            // STORE ANALYSIS
            // =============================================

            setAnalysis(
                response.data
            );

        } catch(error) {

            console.log(error);

            setError(

                error.response?.data
                    ?.message ||

                "Analysis failed"
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <DashboardLayout>

            <Topbar

                title="Resume Analysis"

                subtitle="AI-powered ATS and semantic analysis"

            />


            {/* ============================================= */}
            {/* ANALYSIS FORM */}
            {/* ============================================= */}

            <AnalysisForm

                targetRole={targetRole}

                setTargetRole={setTargetRole}

                jobDescription={jobDescription}

                setJobDescription={setJobDescription}

                handleAnalyze={handleAnalyze}

                loading={loading}

                error={error}
            />


            {/* ============================================= */}
            {/* ANALYSIS RESULTS */}
            {/* ============================================= */}

            {
                analysis && (

                    <AnalysisResults
                        analysis={analysis}
                    />
                )
            }

        </DashboardLayout>
    );
};

export default AnalysisPage;