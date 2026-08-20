import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router";

import {
    getResumes
} from "../../api/resume.api.js";

import {
    getUserAnalyses
} from "../../api/analysis.api.js";

import DashboardHeader
    from "../../components/dashboard/DashboardHeader";

import ResumeSection
    from "../../components/dashboard/ResumeSection";

import AnalysisSection
    from "../../components/dashboard/AnalysisSection";

import LoadingState
    from "../../components/dashboard/LoadingState";

import ErrorState
    from "../../components/dashboard/ErrorState";


const Dashboard = () => {

    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [
        resumes,
        setResumes
    ] = useState([]);

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
    // LOAD DASHBOARD
    // =====================================================

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");


            const [
                resumesResponse,
                analysesResponse
            ] = await Promise.all([

                getResumes(),

                getUserAnalyses()

            ]);


            setResumes(
                resumesResponse?.data?.data || []
            );


            setAnalyses(
                analysesResponse?.data?.analyses || []
            );


        } catch (error) {

            console.error(
                "Dashboard loading failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load dashboard."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadDashboard();

    }, []);


    // =====================================================
    // OPEN ANALYSIS
    // =====================================================

    const handleOpenAnalysis = (
        analysis
    ) => {

        if (!analysis?._id) {
            return;
        }


        navigate(
            `/analysis/${analysis._id}`
        );
    };


    // =====================================================
    // NEW ANALYSIS
    // =====================================================

    const handleNewAnalysis = () => {

        navigate(
            "/analysis/new"
        );
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                max-w-7xl
                mx-auto
                px-1
                py-2
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
                max-w-7xl
                mx-auto
                px-1
                py-2
            ">

                <ErrorState
                    message={error}
                    onRetry={loadDashboard}
                />

            </div>

        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            max-w-7xl
            mx-auto
            px-1
            py-2
        ">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <DashboardHeader
                onNewAnalysis={
                    handleNewAnalysis
                }
            />


            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="
                mt-7
                space-y-8
            ">

                {/* =================================================
                    SAVED RESUMES
                ================================================= */}

                <section className="
                    bg-white
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    shadow-sm
                    p-5
                    sm:p-6
                ">

                    <ResumeSection
                        resumes={resumes}
                    />

                </section>


                {/* =================================================
                    RECENT ANALYSES
                ================================================= */}

                <section className="
                    bg-white
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    shadow-sm
                    p-5
                    sm:p-6
                ">

                    <AnalysisSection
                        analyses={analyses}
                        onOpen={
                            handleOpenAnalysis
                        }
                    />

                </section>

            </div>

        </div>
    );
};


export default Dashboard;