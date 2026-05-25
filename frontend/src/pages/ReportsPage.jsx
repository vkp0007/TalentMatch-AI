import {
    useEffect,
    useState
} from "react";

import DashboardLayout
from "../components/layout/DashboardLayout";

import Topbar
from "../components/layout/Topbar";

import AnalysisSection
from "../components/dashboard/AnalysisSection";

import LoadingState
from "../components/dashboard/LoadingState";

import ErrorState
from "../components/dashboard/ErrorState";

import {
    getUserAnalyses
} from "../api/analysisApi.js";


const ReportsPage = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [
        analyses,
        setAnalyses
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    // =====================================================
    // FETCH REPORTS
    // =====================================================

    useEffect(() => {

        fetchReports();

    }, []);


    const fetchReports = async () => {

        try {

            setLoading(true);

            const response =
                await getUserAnalyses();

            setAnalyses(
                response.analyses || []
            );

        } catch(error) {

            console.log(error);

            setError(

                error.response?.data
                    ?.message ||

                "Failed to load reports"
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // DELETE REPORT
    // =====================================================

    const handleDelete = (analysisId) => {

        setAnalyses((prev) =>

            prev.filter(

                (analysis) =>

                    analysis._id !== analysisId
            )
        );
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <DashboardLayout>

            <Topbar

                title="ATS Reports"

                subtitle="View AI-powered ATS analysis reports"

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

                    <ErrorState
                        error={error}
                    />
                )
            }


            {/* ============================================= */}
            {/* REPORTS */}
            {/* ============================================= */}

            {
                !loading
                &&
                !error
                &&
                (
                    <AnalysisSection
                        analyses={analyses}
                        onDelete={handleDelete}
                    />
                )
            }

        </DashboardLayout>
    );
};

export default ReportsPage;