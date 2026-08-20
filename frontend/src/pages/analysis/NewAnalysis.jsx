import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useSearchParams
} from "react-router";

import {
    getResumes
} from "../../api/resume.api.js";

import {
    analyzeResume
} from "../../api/analysis.api.js";

import LoadingState
    from "../../components/dashboard/LoadingState";

import ErrorState
    from "../../components/dashboard/ErrorState";


const NewAnalysis = () => {

    const navigate =
        useNavigate();

    const [searchParams] =
        useSearchParams();


    const resumeIdFromUrl =
        searchParams.get("resumeId");


    // =====================================================
    // STATE
    // =====================================================

    const [resumes, setResumes] =
        useState([]);

    const [selectedResumeId, setSelectedResumeId] =
        useState(
            resumeIdFromUrl || ""
        );

    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [analyzing, setAnalyzing] =
        useState(false);

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD RESUMES
    // =====================================================

    const loadResumes = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await getResumes();


            setResumes(
                response?.data?.data || []
            );


        } catch (error) {

            console.error(
                "Failed to load resumes:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load resumes."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadResumes();

    }, []);


    // =====================================================
    // ANALYZE
    // =====================================================

    const handleAnalyze = async () => {

        if (!selectedResumeId) {

            setError(
                "Please select a resume."
            );

            return;
        }


        if (!jobDescription.trim()) {

            setError(
                "Please enter a job description."
            );

            return;
        }


        try {

            setAnalyzing(true);
            setError("");


            const response =
                await analyzeResume({

                    resumeId:
                        selectedResumeId,

                    jobDescription:
                        jobDescription.trim()

                });


            const analysis =
                response?.data?.data ||
                response?.data?.analysis;


            if (!analysis?._id) {

                throw new Error(
                    "Analysis was created but no analysis ID was returned."
                );
            }


            navigate(
                `/analysis/${analysis._id}`
            );


        } catch (error) {

            console.error(
                "Analysis failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to analyze resume."
            );


        } finally {

            setAnalyzing(false);

        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                max-w-4xl
                mx-auto
                px-6
                py-8
            ">

                <LoadingState />

            </div>

        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (
        error &&
        resumes.length === 0
    ) {

        return (

            <div className="
                max-w-4xl
                mx-auto
                px-6
                py-8
            ">

                <ErrorState
                    message={error}
                    onRetry={loadResumes}
                />

            </div>

        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            max-w-4xl
            mx-auto
            px-6
            pb-14
        ">



            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="
                    mb-6
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3.5
                    text-sm
                    text-red-700
                ">

                    <div className="
                        mt-0.5
                        h-5
                        w-5
                        shrink-0
                        rounded-full
                        bg-red-100
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-bold
                    ">
                        !
                    </div>

                    <span>
                        {error}
                    </span>

                </div>

            )}


            {/* =================================================
                STEP 1 — RESUME
            ================================================= */}

            <section className="
                group
                bg-[#F7F3EA]
                border
                border-[#E8E2D7]
                rounded-2xl
                p-5
                sm:p-6
                mb-5
                shadow-sm
                transition-all
                duration-200
                hover:border-[#DCD4C6]
                hover:shadow-md
            ">

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    gap-4
                    mb-6
                ">

                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <div className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-gray-900
                            text-white
                            text-xs
                            font-semibold
                            shadow-sm
                        ">
                            1
                        </div>


                        <div>

                            <h2 className="
                                text-base
                                font-semibold
                                tracking-tight
                                text-gray-900
                            ">
                                Select Resume
                            </h2>


                            <p className="
                                mt-1
                                text-sm
                                leading-5
                                text-gray-500
                            ">
                                Choose the resume you want to
                                match against this job.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/resumes")
                        }
                        className="
                            shrink-0
                            inline-flex
                            items-center
                            justify-center
                            px-3.5
                            py-2
                            rounded-lg
                            border
                            border-[#DCD4C6]
                            bg-white
                            text-xs
                            font-semibold
                            text-gray-700
                            shadow-sm
                            hover:bg-[#FCFBF8]
                            hover:border-gray-400
                            hover:shadow
                            transition-all
                            duration-200
                        "
                    >
                        Manage Resumes
                    </button>

                </div>


                {resumes.length === 0 ? (

                    <div className="
                        rounded-xl
                        border
                        border-dashed
                        border-[#D8D0C2]
                        bg-white/70
                        px-6
                        py-10
                        text-center
                    ">

                        <p className="
                            text-sm
                            font-semibold
                            text-gray-800
                        ">
                            No resumes available
                        </p>


                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Upload a resume before starting an analysis.
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/resumes")
                            }
                            className="
                                mt-5
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
                                hover:-translate-y-0.5
                                hover:shadow-md
                                transition-all
                                duration-200
                            "
                        >
                            Upload Resume
                        </button>

                    </div>

                ) : (

                    <div>

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-2
                        ">

                            <label className="
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-gray-500
                            ">
                                Resume
                            </label>

                            {selectedResumeId && (

                                <span className="
                                    text-[11px]
                                    font-medium
                                    text-emerald-600
                                ">
                                    Selected
                                </span>

                            )}

                        </div>


                        <div className="
                            relative
                        ">

                            <select
                                value={selectedResumeId}
                                onChange={event =>
                                    setSelectedResumeId(
                                        event.target.value
                                    )
                                }
                                className="
                                    w-full
                                    h-12
                                    appearance-none
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    px-4
                                    pr-10
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    outline-none
                                    shadow-sm
                                    transition-all
                                    duration-200
                                    hover:border-gray-300
                                    focus:border-gray-400
                                    focus:ring-4
                                    focus:ring-[#E8E2D7]
                                "
                            >

                                <option value="">
                                    Select a resume
                                </option>


                                {resumes.map(
                                    resume => (

                                        <option
                                            key={resume._id}
                                            value={resume._id}
                                        >
                                            {resume.resumeName ||
                                                "Resume"}

                                            {resume.targetRole
                                                ? ` — ${resume.targetRole}`
                                                : ""}
                                        </option>

                                    )
                                )}

                            </select>


                            <div className="
                                pointer-events-none
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            ">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        d="m6 9 6 6 6-6"
                                    />
                                </svg>
                            </div>

                        </div>


                        {selectedResumeId && (

                            <p className="
                                mt-2.5
                                text-xs
                                text-gray-500
                            ">
                                This resume will be used for the
                                analysis.
                            </p>

                        )}

                    </div>

                )}

            </section>


            {/* =================================================
                STEP 2 — JOB DESCRIPTION
            ================================================= */}

            <section className="
                group
                bg-[#F7F3EA]
                border
                border-[#E8E2D7]
                rounded-2xl
                p-5
                sm:p-6
                shadow-sm
                transition-all
                duration-200
                hover:border-[#DCD4C6]
                hover:shadow-md
            ">

                <div className="
                    flex
                    items-start
                    gap-3
                    mb-6
                ">

                    <div className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-gray-900
                        text-white
                        text-xs
                        font-semibold
                        shadow-sm
                    ">
                        2
                    </div>


                    <div>

                        <h2 className="
                            text-base
                            font-semibold
                            tracking-tight
                            text-gray-900
                        ">
                            Job Description
                        </h2>


                        <p className="
                            mt-1
                            text-sm
                            leading-5
                            text-gray-500
                        ">
                            Paste the job description you want
                            to analyze.
                        </p>

                    </div>

                </div>


                <div>

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-2.5
                    ">

                        <label className="
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-gray-500
                        ">
                            Job Description
                        </label>


                        <span className="
                            text-[11px]
                            font-medium
                            tabular-nums
                            text-gray-400
                        ">
                            {jobDescription.length} characters
                        </span>

                    </div>


                    <textarea
                        value={jobDescription}
                        onChange={event =>
                            setJobDescription(
                                event.target.value
                            )
                        }
                        placeholder="Paste the complete job description here..."
                        rows={13}
                        className="
                            w-full
                            resize-y
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            px-4
                            py-4
                            text-sm
                            leading-6
                            text-gray-900
                            placeholder:text-gray-400
                            outline-none
                            shadow-sm
                            transition-all
                            duration-200
                            hover:border-gray-300
                            focus:border-gray-400
                            focus:ring-4
                            focus:ring-[#E8E2D7]
                        "
                    />

                </div>


                <div className="
                    mt-5
                    pt-5
                    border-t
                    border-[#E5DED2]
                    flex
                    flex-col-reverse
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                ">

                    <div>

                        <p className="
                            text-sm
                            font-medium
                            text-gray-700
                        ">
                            Ready to find your match?
                        </p>


                        <p className="
                            mt-0.5
                            text-xs
                            leading-5
                            text-gray-400
                        ">
                            We'll compare your resume with the
                            requirements in this job description.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={handleAnalyze}
                        disabled={
                            analyzing ||
                            !selectedResumeId ||
                            !jobDescription.trim()
                        }
                        className="
                            shrink-0
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-6
                            py-3
                            rounded-xl
                            bg-gray-900
                            text-white
                            text-sm
                            font-semibold
                            shadow-sm
                            hover:bg-gray-800
                            hover:-translate-y-0.5
                            hover:shadow-md
                            active:translate-y-0
                            transition-all
                            duration-200
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            disabled:shadow-none
                            disabled:transform-none
                        "
                    >

                        {analyzing && (

                            <span className="
                                h-4
                                w-4
                                rounded-full
                                border-2
                                border-white/30
                                border-t-white
                                animate-spin"
                            />

                        )}

                        {analyzing
                            ? "Analyzing..."
                            : "Analyze Resume"}

                    </button>

                </div>

            </section>

        </div>
    );
};


export default NewAnalysis;