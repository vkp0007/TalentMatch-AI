import {
    useEffect,
    useState
} from "react";

import {
    FileText,
    Plus
} from "lucide-react";

import {
    useNavigate
} from "react-router";

import {
    getResumes
} from "../../api/resume.api";

import ResumeList
    from "../../components/resume/ResumeList";

import EmptyState
    from "../../components/dashboard/EmptyState";

import ErrorState
    from "../../components/dashboard/ErrorState";

import LoadingState
    from "../../components/dashboard/LoadingState";


const Resumes = () => {

    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [resumes, setResumes] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

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
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-[#FDFBF7]
            ">

                <div className="
                    max-w-6xl
                    mx-auto
                    px-5
                    sm:px-6
                    py-8
                    sm:py-10
                ">

                    <LoadingState />

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
                min-h-screen
                bg-[#FDFBF7]
            ">

                <div className="
                    max-w-6xl
                    mx-auto
                    px-5
                    sm:px-6
                    py-8
                    sm:py-10
                ">

                    <ErrorState
                        message={error}
                        onRetry={loadResumes}
                    />

                </div>

            </div>
        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            min-h-screen
            bg-[#FDFBF7]
        ">

            <div className="
                max-w-6xl
                mx-auto
                px-5
                sm:px-6
                py-8
                sm:py-10
                pb-16
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
                    gap-5
                    mb-8
                ">

                    <div>



                        {/* TITLE */}

                        <h1 className="
                        
                            text-2xl
                            sm:text-3xl
                            font-semibold
                            tracking-tight
                            text-gray-900
                        ">

                            My Resumes

                        </h1>


                        {/* DESCRIPTION */}

                        <p className="
                            mt-1.5
                            text-sm
                            leading-6
                            text-gray-500
                            max-w-lg
                        ">

                            View and manage your saved resumes.

                        </p>

                    </div>


                    {/* =================================================
                        UPLOAD BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/resumes/upload"
                            )
                        }
                        className="
                            shrink-0
                            inline-flex
                            items-center
                            justify-center
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
                            duration-200
                        "
                    >

                        <Plus
                            size={16}
                            strokeWidth={2}
                        />

                        Upload Resume

                    </button>

                </div>


                {/* =================================================
                    RESUME COUNT
                ================================================= */}

                {resumes.length > 0 && (

                    <div className="
                        mb-5
                        flex
                        items-center
                        justify-between
                        gap-4
                    ">

                        <div>

                            <div className="
                                flex
                                items-center
                                gap-2.5
                            ">

                                <h2 className="
                                    text-lg
                                    font-semibold
                                    tracking-tight
                                    text-gray-900
                                ">

                                    Saved Resumes

                                </h2>


                                <span className="
                                    inline-flex
                                    min-w-7
                                    h-6
                                    items-center
                                    justify-center
                                    px-2
                                    rounded-full
                                    bg-white
                                    border
                                    border-[#E8E2D7]
                                    text-[11px]
                                    font-semibold
                                    text-gray-600
                                    shadow-sm
                                ">

                                    {resumes.length}

                                </span>

                            </div>


                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">

                                {resumes.length}{" "}

                                {resumes.length === 1
                                    ? "resume"
                                    : "resumes"}

                                {" "}saved to your account.

                            </p>

                        </div>

                    </div>

                )}


                {/* =================================================
                    CONTENT
                ================================================= */}

                {resumes.length === 0 ? (

                    <div className="
                        rounded-2xl
                        border
                        border-[#E8E2D7]
                        bg-[#F7F3EA]/50
                        p-1
                    ">

                        <EmptyState

                            title="No resumes yet"

                            description="
                                Upload your first resume to start
                                analyzing job opportunities.
                            "

                            actionLabel="Upload Resume"

                            onAction={() =>
                                navigate(
                                    "/resumes/upload"
                                )
                            }

                        />

                    </div>

                ) : (

                    <div className="
                        rounded-2xl
                        border
                        border-[#E8E2D7]
                        bg-white/50
                        p-3
                        sm:p-4
                    ">

                        <ResumeList

                            resumes={
                                resumes
                            }

                            loading={false}

                        />

                    </div>

                )}

            </div>

        </div>
    );
};


export default Resumes;