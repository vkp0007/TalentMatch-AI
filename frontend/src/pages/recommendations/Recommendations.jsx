import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router";

import {
    Sparkles,
    ArrowLeft,
    LoaderCircle,
    RefreshCw
} from "lucide-react";

import {
    createRecommendation,
    getRecommendation
} from "../../api/recommendation.api.js";

import RecommendationHeader
    from "../../components/recommendations/RecommendationHeader";

import RecommendationSection
    from "../../components/recommendations/RecommendationSection";

import SkillCard
    from "../../components/recommendations/SkillCard";

import ImprovementCard
    from "../../components/recommendations/ImprovementCard";

import RecommendationEmptyState
    from "../../components/recommendations/RecommendationEmptyState";


const Recommendations = () => {

    const {
        analysisId
    } = useParams();


    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [
        recommendation,
        setRecommendation
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        generating,
        setGenerating
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    // =====================================================
    // GENERATE RECOMMENDATION
    // =====================================================

    const generateRecommendation = async () => {

        if (!analysisId) {
            return;
        }


        try {

            setGenerating(true);
            setError("");


            const response =
                await createRecommendation(
                    analysisId
                );


            const generated =
                response?.data?.data;


            if (!generated) {

                throw new Error(
                    "Invalid recommendation response."
                );
            }


            setRecommendation(
                generated
            );


        } catch (error) {

            console.error(
                "Recommendation generation failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to generate recommendations"
            );


        } finally {

            setGenerating(false);

        }
    };


    // =====================================================
    // LOAD / GENERATE
    // =====================================================

    useEffect(() => {

        let mounted = true;


        const loadRecommendation =
            async () => {

                if (!analysisId) {

                    if (mounted) {

                        setError(
                            "Analysis ID is missing."
                        );

                        setLoading(false);

                    }

                    return;
                }


                try {

                    setLoading(true);
                    setError("");


                    // =========================================
                    // TRY EXISTING RECOMMENDATION
                    // =========================================

                    const response =
                        await getRecommendation(
                            analysisId
                        );


                    const existing =
                        response?.data?.data;


                    if (
                        existing &&
                        mounted
                    ) {

                        setRecommendation(
                            existing
                        );

                        return;
                    }


                    // =========================================
                    // NO EXISTING DATA
                    // =========================================

                    if (mounted) {

                        setLoading(false);

                    }


                    await generateRecommendation();

                } catch (error) {

                    console.error(
                        "Recommendation loading failed:",
                        error
                    );


                    // =========================================
                    // 404 = GENERATE NEW
                    // =========================================

                    if (
                        error.response?.status === 404
                    ) {

                        if (mounted) {

                            setLoading(false);

                        }


                        await generateRecommendation();

                        return;
                    }


                    // =========================================
                    // OTHER ERROR
                    // =========================================

                    if (mounted) {

                        setError(
                            error.response?.data?.message ||
                            error.message ||
                            "Failed to load recommendations"
                        );

                    }

                } finally {

                    if (mounted) {

                        setLoading(false);

                    }

                }
            };


        loadRecommendation();


        return () => {

            mounted = false;

        };

    }, [analysisId]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading || generating) {

        return (

            <div className="
                max-w-5xl
                mx-auto
                pb-10
            ">

                {/* BACK */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/analysis/${analysisId}`
                        )
                    }
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-gray-500
                        hover:text-gray-900
                        transition
                        mb-6
                    "
                >

                    <ArrowLeft
                        size={15}
                    />

                    Back to Analysis

                </button>


                {/* LOADING CARD */}

                <div className="
                    bg-[#F7F3EA]
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    px-6
                    py-14
                    text-center
                    shadow-sm
                ">

                    <div className="
                        w-11
                        h-11
                        mx-auto
                        rounded-xl
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-600
                    ">

                        {generating ? (

                            <Sparkles
                                size={19}
                                strokeWidth={1.8}
                            />

                        ) : (

                            <LoaderCircle
                                size={19}
                                className="
                                    animate-spin
                                "
                            />

                        )}

                    </div>


                    <h2 className="
                        text-base
                        font-semibold
                        text-gray-900
                        mt-4
                    ">

                        {generating
                            ? "Generating recommendations..."
                            : "Loading recommendations..."}

                    </h2>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1.5
                        max-w-sm
                        mx-auto
                    ">

                        {generating
                            ? "Analyzing your resume and job requirements."
                            : "Getting your personalized recommendations ready."}

                    </p>


                    {generating && (

                        <div className="
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            mt-5
                        ">

                            <span className="
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-gray-400
                                animate-pulse
                            "/>

                            <span className="
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-gray-400
                                animate-pulse
                                [animation-delay:150ms]
                            "/>

                            <span className="
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-gray-400
                                animate-pulse
                                [animation-delay:300ms]
                            "/>

                        </div>

                    )}

                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="
                max-w-5xl
                mx-auto
                pb-10
            ">

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/analysis/${analysisId}`
                        )
                    }
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-gray-500
                        hover:text-gray-900
                        transition
                        mb-6
                    "
                >

                    <ArrowLeft
                        size={15}
                    />

                    Back to Analysis

                </button>


                <div className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-2xl
                    p-6
                    shadow-sm
                ">

                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <div className="
                            w-9
                            h-9
                            shrink-0
                            rounded-lg
                            bg-white
                            border
                            border-red-200
                            flex
                            items-center
                            justify-center
                            text-red-600
                        ">

                            <RefreshCw
                                size={16}
                            />

                        </div>


                        <div>

                            <h2 className="
                                text-sm
                                font-semibold
                                text-red-800
                            ">
                                Unable to load recommendations
                            </h2>


                            <p className="
                                text-sm
                                text-red-700
                                mt-1
                                leading-5
                            ">
                                {error}
                            </p>


                            <button
                                type="button"
                                onClick={() => {

                                    setError("");

                                    setLoading(true);

                                    generateRecommendation();

                                }}
                                className="
                                    mt-4
                                    inline-flex
                                    items-center
                                    gap-2
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
                                    active:translate-y-0
                                    transition-all
                                "
                            >

                                <RefreshCw
                                    size={15}
                                />

                                Try Again

                            </button>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // DATA
    // =====================================================

    const skillsToStudy =
        recommendation?.skillsToStudy || [];


    const resumeImprovements =
        recommendation?.resumeImprovements || [];


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            max-w-5xl
            mx-auto
            pb-10
        ">

            {/* =================================================
                HEADER
            ================================================= */}

            <RecommendationHeader

                analysisId={
                    analysisId
                }

                onBack={() =>
                    navigate(
                        `/analysis/${analysisId}`
                    )
                }

            />


            {/* =================================================
                SKILLS
            ================================================= */}

            <RecommendationSection

                title="Skills to Study"

                description="
                    Focus on these skills based on the job requirements.
                "

                count={
                    skillsToStudy.length
                }

            >

                {skillsToStudy.length === 0 ? (

                    <RecommendationEmptyState

                        text="
                            No additional skills were recommended.
                        "

                    />

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        gap-4
                    ">

                        {skillsToStudy.map(
                            (item, index) => (

                                <SkillCard

                                    key={
                                        item._id ||
                                        index
                                    }

                                    item={
                                        item
                                    }

                                />

                            )
                        )}

                    </div>

                )}

            </RecommendationSection>


            {/* =================================================
                RESUME IMPROVEMENTS
            ================================================= */}

            <RecommendationSection

                title="Resume Improvements"

                description="
                    Areas of your resume that could be strengthened for this role.
                "

                count={
                    resumeImprovements.length
                }

            >

                {resumeImprovements.length === 0 ? (

                    <RecommendationEmptyState

                        text="
                            No resume improvements were recommended.
                        "

                    />

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        gap-4
                    ">

                        {resumeImprovements.map(
                            (item, index) => (

                                <ImprovementCard

                                    key={
                                        item._id ||
                                        index
                                    }

                                    item={
                                        item
                                    }

                                />

                            )
                        )}

                    </div>

                )}

            </RecommendationSection>

        </div>
    );
};


export default Recommendations;