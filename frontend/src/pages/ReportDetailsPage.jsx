import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router";

import DashboardLayout
from "../components/layout/DashboardLayout";

import Topbar
from "../components/layout/Topbar";

import AnalysisResults
from "../components/analysis/AnalysisResults";

import LoadingState
from "../components/dashboard/LoadingState";

import ErrorState
from "../components/dashboard/ErrorState";

import {
    getAnalysisById
} from "../api/analysisApi.js";


const ReportDetailsPage = () => {

    // =====================================================
    // ROUTE PARAMS
    // =====================================================

    const {
        analysisId
    } = useParams();


    // =====================================================
    // STATE
    // =====================================================

    const [
        analysis,
        setAnalysis
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    // =====================================================
    // FETCH REPORT
    // =====================================================

    useEffect(() => {

        fetchReport();

    }, []);


    const fetchReport = async () => {

        try {

            setLoading(true);

            const response =
                await getAnalysisById(
                    analysisId
                );

            setAnalysis(
                response.analysis
            );

        } catch(error) {

            console.log(error);

            setError(

                error.response?.data
                    ?.message ||

                "Failed to load report"
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

                title="ATS Report"

                subtitle="Detailed AI-powered resume analysis"

            />


            {/* ============================================= */}
            {/* LOADING */}
            {/* ============================================= */}

            {
                loading && (
                    <LoadingState />
                )
            }


            {/* ============================================= */}
            {/* ERROR */}
            {/* ============================================= */}

            {
                error && (
                    <ErrorState error={error} />
                )
            }


            {/* ============================================= */}
            {/* REPORT */}
            {/* ============================================= */}

            {
                !loading
                &&
                !error
                &&
                analysis
                &&
                (
                    <AnalysisResults
                        analysis={analysis}
                    />
                )
            }

        </DashboardLayout>
    );
};

export default ReportDetailsPage;