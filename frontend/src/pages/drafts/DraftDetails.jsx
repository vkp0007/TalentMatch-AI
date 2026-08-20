import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router";

import {
    getApplicationEmail
} from "../../api/applicationEmail.api.js";


const DraftDetails = () => {

    const {
        draftId
    } = useParams();

    const navigate =
        useNavigate();


    const [
        draft,
        setDraft
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        copied,
        setCopied
    ] = useState(false);



    // =====================================================
    // LOAD DRAFT
    // =====================================================

    const loadDraft = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getApplicationEmail(
                    draftId
                );


            setDraft(
                response?.data?.data || null
            );


        } catch (error) {

            console.error(
                "Failed to load draft:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load draft."
            );


        } finally {

            setLoading(false);

        }
    };



    useEffect(() => {

        if (draftId) {

            loadDraft();

        }

    }, [draftId]);



    // =====================================================
    // COPY
    // =====================================================

    const handleCopy = async () => {

        if (!draft?.email) {

            return;
        }


        try {

            const content =
                draft.subject
                    ? `Subject: ${draft.subject}\n\n${draft.email}`
                    : draft.email;


            await navigator.clipboard.writeText(
                content
            );


            setCopied(true);


            setTimeout(() => {

                setCopied(false);

            }, 2000);


        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

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

                <p className="
                    text-sm
                    text-gray-500
                ">
                    Loading draft...
                </p>

            </div>

        );
    }



    // =====================================================
    // ERROR
    // =====================================================

    if (error || !draft) {

        return (

            <div className="
                max-w-4xl
                mx-auto
                px-6
                py-8
            ">

                <div className="
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    text-sm
                    text-red-700
                ">
                    {error || "Draft not found."}
                </div>

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
            py-8
        ">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                items-start
                justify-between
                gap-6
                mb-8
            ">

                <div className="
                    min-w-0
                ">

                    <h1 className="
                        text-2xl
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        {draft.role ||
                            "Application Email"}
                    </h1>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                    ">
                        Application Email Draft
                    </p>

                </div>


                {/* =================================================
                    BACK TO DRAFTS
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/drafts")
                    }
                    className="
                        shrink-0
                        inline-flex
                        items-center
                        px-4
                        py-2.5
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        text-sm
                        font-medium
                        text-gray-700
                        hover:bg-gray-50
                        hover:border-gray-300
                        transition
                    "
                >
                    Back to Drafts
                </button>

            </div>



            {/* =================================================
                EMAIL
            ================================================= */}

            <section className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                shadow-sm
                overflow-hidden
            ">

                <div className="
                    p-6
                ">

                    <div className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/50
                        overflow-hidden
                    ">

                        {/* =================================================
                            EMAIL TOOLBAR
                        ================================================= */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            px-5
                            py-3
                            border-b
                            border-gray-200
                        ">

                            <span className="
                                text-xs
                                font-medium
                                text-gray-500
                            ">
                                Application Email
                            </span>


                            {/* COPY */}

                            <button
                                type="button"
                                onClick={
                                    handleCopy
                                }
                                disabled={
                                    !draft.email
                                }
                                className="
                                    inline-flex
                                    items-center
                                    px-3
                                    py-1.5
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    hover:bg-gray-50
                                    hover:border-gray-300
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >
                                {copied
                                    ? "Copied"
                                    : "Copy"}
                            </button>

                        </div>


                        {/* =================================================
                            SUBJECT
                        ================================================= */}

                        <div className="
                            px-5
                            py-4
                            bg-gray-50/50
                            border-b
                            border-gray-200
                        ">

                            <div className="
                                flex
                                items-start
                                gap-3
                            ">

                                <span className="
                                    shrink-0
                                    text-xs
                                    font-medium
                                    text-gray-400
                                    pt-0.5
                                ">
                                    Subject
                                </span>


                                <p className="
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                    min-w-0
                                ">
                                    {draft.subject ||
                                        "No subject available."}
                                </p>

                            </div>

                        </div>


                        {/* =================================================
                            EMAIL BODY
                        ================================================= */}

                        <div className="
                            px-5
                            py-5
                            bg-white
                        ">

                            <p className="
                                whitespace-pre-wrap
                                text-sm
                                leading-7
                                text-gray-800
                            ">
                                {draft.email ||
                                    "No email content available."}
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};


export default DraftDetails;