import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router";

import {
    getUserAnalyses,
    deleteAnalysis
} from "../../api/analysis.api.js";

import AnalysisRow
    from "../../components/dashboard/AnalysisRow";

import EmptyState
    from "../../components/dashboard/EmptyState";


const Analyses = () => {

    const navigate =
        useNavigate();


    const [analyses, setAnalyses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD ALL ANALYSES
    // =====================================================

    const loadAnalyses = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getUserAnalyses();


            setAnalyses(
                response?.data?.analyses || []
            );


        } catch (error) {

            console.error(
                "Failed to load analyses:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load analyses."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadAnalyses();

    }, []);


    // =====================================================
    // OPEN ANALYSIS
    // =====================================================

    const handleOpen = (
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
    // DELETE ANALYSIS
    // =====================================================

    const handleDelete = async (
        analysisId
    ) => {

        if (!analysisId) {
            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this analysis?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setError("");


            await deleteAnalysis(
                analysisId
            );


            setAnalyses(
                current =>
                    current.filter(
                        analysis =>
                            analysis._id !==
                            analysisId
                    )
            );


        } catch (error) {

            console.error(
                "Failed to delete analysis:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to delete analysis."
            );

        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-8
            ">

                <div className="
                    py-16
                    text-center
                    text-sm
                    text-gray-500
                ">

                    Loading analyses...

                </div>

            </div>

        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (
        error &&
        analyses.length === 0
    ) {

        return (

            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-8
            ">

                <div className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    text-sm
                    text-red-700
                ">

                    {error}

                </div>

            </div>

        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            max-w-6xl
            mx-auto
            px-6
            py-6
        ">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-end
                sm:justify-between
                gap-4
                mb-8
            ">

                <div>

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-2.5
                        py-1
                        rounded-full
                        bg-[#F7F3EA]
                        border
                        border-[#E8E2D7]
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-gray-500
                    ">

                        <span className="
                            w-1.5
                            h-1.5
                            rounded-full
                            bg-emerald-500"
                        />

                        Analysis History

                    </div>


                    <h1 className="
                        mt-3
                        text-2xl
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">

                        All Analyses

                    </h1>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1.5
                    ">

                        View and manage your previous
                        resume-to-job analyses.

                    </p>

                </div>


                {/* EXISTING BUTTON — KEPT */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/analysis/new"
                        )
                    }
                    className="
                        inline-flex
                        items-center
                        justify-center
                        px-4
                        py-2.5
                        rounded-xl
                        bg-gray-900
                        text-white
                        text-sm
                        font-medium
                        shadow-sm
                        hover:bg-gray-800
                        hover:shadow-md
                        hover:-translate-y-0.5
                        transition-all
                        duration-200
                    "
                >

                    New Analysis

                </button>

            </div>


            {/* =================================================
                ERROR AFTER DELETE
            ================================================= */}

            {error && (

                <div className="
                    mb-5
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                ">

                    {error}

                </div>

            )}


            {/* =================================================
                ANALYSES
            ================================================= */}

            {analyses.length === 0 ? (

                <EmptyState

                    title="No analyses yet"

                    description="
                        Create your first analysis to compare
                        your resume with a job description.
                    "

                    actionLabel="New Analysis"

                    onAction={() =>
                        navigate(
                            "/analysis/new"
                        )
                    }

                />

            ) : (

                <div className="
                    bg-white
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    overflow-hidden
                    shadow-sm
                ">

                    {analyses.map(
                        analysis => (

                            <div
                                key={
                                    analysis._id
                                }
                                className="
                                    border-b
                                    border-[#EEE9E0]
                                    last:border-b-0
                                    hover:bg-[#FDFBF7]
                                    transition-colors
                                    duration-200
                                "
                            >

                                <AnalysisRow

                                    analysis={
                                        analysis
                                    }

                                    onOpen={
                                        handleOpen
                                    }

                                    onDelete={
                                        handleDelete
                                    }

                                />

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
};


export default Analyses;