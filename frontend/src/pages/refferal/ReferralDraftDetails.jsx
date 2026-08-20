import {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router";

import {
    getReferralDraft,
    updateReferralDraft,
    refineReferralDraft
} from "../../api/referralDraft.api.js";

import ReferralResult
    from "../../components/referral/ReferralResult";


const ReferralDraftDetails = () => {

    const {
        draftId
    } = useParams();

    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [draftData, setDraftData] =
        useState(null);

    const [content, setContent] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    const [refining, setRefining] =
        useState(false);

    const [copied, setCopied] =
        useState(false);

    const [refineInstruction, setRefineInstruction] =
        useState("");

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD DRAFT
    // =====================================================

    useEffect(() => {

        const loadDraft = async () => {

            try {

                setLoading(true);
                setError("");


                const response =
                    await getReferralDraft(
                        draftId
                    );


                const data =
                    response?.data?.data ||
                    response?.data;


                setDraftData(data);

                setContent(
                    data?.draft || ""
                );


            } catch (error) {

                console.error(
                    "Failed to load referral draft:",
                    error
                );


                setError(
                    error?.response?.data?.message ||
                    "Failed to load referral draft"
                );


            } finally {

                setLoading(false);

            }
        };


        if (draftId) {

            loadDraft();

        }

    }, [draftId]);


    // =====================================================
    // COPY
    // =====================================================

    const handleCopy = async () => {

        if (!content.trim()) {
            return;
        }


        try {

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
    // SAVE
    // =====================================================

    const handleSave = async () => {

        if (!content.trim()) {
            return;
        }


        try {

            setSaving(true);
            setError("");


            await updateReferralDraft(
                draftId,
                {
                    draft: content
                }
            );


        } catch (error) {

            console.error(
                "Failed to save referral draft:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "Failed to save referral draft"
            );


        } finally {

            setSaving(false);

        }
    };


    // =====================================================
    // REFINE
    // =====================================================

    const handleRefine = async () => {

        if (
            !content.trim() ||
            !refineInstruction.trim()
        ) {
            return;
        }


        try {

            setRefining(true);
            setError("");


            const response =
                await refineReferralDraft(
                    draftId,
                    refineInstruction.trim()
                );


            const data =
                response?.data?.data ||
                response?.data;


            const updatedDraft =
                data?.draft;


            if (updatedDraft) {

                setContent(
                    updatedDraft
                );

            }


            setRefineInstruction("");


        } catch (error) {

            console.error(
                "Referral refinement failed:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "Failed to refine referral draft"
            );


        } finally {

            setRefining(false);

        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                min-h-full
                bg-[#FCFBF8]
                px-4
                sm:px-6
                lg:px-8
                py-8
                sm:py-10
            ">

                <div className="
                    max-w-4xl
                    mx-auto
                ">

                    {/* TOP SKELETON */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-8
                    ">

                        <div className="
                            h-9
                            w-32
                            rounded-xl
                            bg-[#F1EEE7]
                            animate-pulse
                        " />

                    </div>


                    {/* CARD SKELETON */}

                    <div className="
                        bg-white
                        border
                        border-[#E8E2D7]
                        rounded-2xl
                        overflow-hidden
                        shadow-[0_1px_2px_rgba(0,0,0,0.03)]
                        animate-pulse
                    ">

                        <div className="
                            px-6
                            py-5
                            border-b
                            border-[#E8E2D7]
                            bg-[#F7F3EA]/60
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    w-9
                                    h-9
                                    rounded-xl
                                    bg-[#E8E2D7]
                                " />

                                <div className="
                                    space-y-2
                                ">

                                    <div className="
                                        h-4
                                        w-36
                                        rounded
                                        bg-[#E8E2D7]
                                    " />

                                    <div className="
                                        h-3
                                        w-56
                                        rounded
                                        bg-[#F1EEE7]
                                    " />

                                </div>

                            </div>

                        </div>


                        <div className="
                            p-6
                            space-y-4
                        ">

                            <div className="
                                h-64
                                rounded-xl
                                bg-[#F7F5F0]
                            " />

                            <div className="
                                h-11
                                rounded-xl
                                bg-[#F1EEE7]
                            " />

                        </div>

                    </div>

                </div>

            </div>

        );
    }


    // =====================================================
    // ERROR / NOT FOUND
    // =====================================================

    if (!draftData) {

        return (

            <div className="
                min-h-full
                bg-[#FCFBF8]
                px-4
                sm:px-6
                lg:px-8
                py-10
            ">

                <div className="
                    max-w-4xl
                    mx-auto
                ">

                    <div className="
                        bg-white
                        border
                        border-[#E8E2D7]
                        rounded-2xl
                        p-8
                        sm:p-10
                        text-center
                        shadow-[0_1px_2px_rgba(0,0,0,0.03)]
                    ">

                        <div className="
                            w-10
                            h-10
                            mx-auto
                            rounded-xl
                            bg-red-50
                            border
                            border-red-100
                            flex
                            items-center
                            justify-center
                            text-red-600
                            font-semibold
                        ">
                            !
                        </div>


                        <p className="
                            mt-4
                            text-sm
                            font-medium
                            text-gray-900
                        ">
                            {error || "Referral draft not found."}
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/referral-drafts"
                                )
                            }
                            className="
                                mt-5
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                rounded-xl
                                border
                                border-[#E2DACC]
                                bg-white
                                text-sm
                                font-medium
                                text-gray-700
                                hover:bg-[#F7F3EA]
                                hover:border-[#D5CBBB]
                                hover:text-gray-900
                                transition-all
                            "
                        >

                            <ArrowLeft
                                size={15}
                            />

                            Back to drafts

                        </button>

                    </div>

                </div>

            </div>

        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            min-h-full
            bg-[#FCFBF8]
            px-4
            sm:px-6
            lg:px-8
            py-7
            sm:py-9
            pb-14
        ">

            <div className="
                max-w-4xl
                mx-auto
            ">


                {/* =================================================
                    TOP ACTION
                ================================================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-7
                ">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/referral-drafts"
                            )
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-3.5
                            py-2
                            rounded-xl
                            border
                            border-[#E2DACC]
                            bg-white
                            text-xs
                            font-medium
                            text-gray-600
                            shadow-sm
                            hover:bg-[#F7F3EA]
                            hover:text-gray-900
                            hover:border-[#D5CBBB]
                            transition-all
                        "
                    >

                        <ArrowLeft
                            size={14}
                            strokeWidth={1.8}
                        />

                        Back to drafts

                    </button>


                    <div className="
                        hidden
                        sm:flex
                        items-center
                        gap-2
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-gray-400
                    ">

                        <span className="
                            w-1.5
                            h-1.5
                            rounded-full
                            bg-emerald-500"
                        />

                        Referral Draft

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="
                        mb-5
                        flex
                        items-start
                        gap-3
                        px-4
                        py-3.5
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        text-sm
                        text-red-700
                    ">

                        <span className="
                            shrink-0
                            font-semibold
                        ">
                            !
                        </span>

                        <span>
                            {error}
                        </span>

                    </div>

                )}


                {/* =================================================
                    REFERRAL RESULT
                ================================================= */}

                <ReferralResult

                    draft={
                        content
                    }

                    setDraft={
                        setContent
                    }

                    copied={
                        copied
                    }

                    refining={
                        refining
                    }

                    refineInstruction={
                        refineInstruction
                    }

                    setRefineInstruction={
                        setRefineInstruction
                    }

                    onCopy={
                        handleCopy
                    }

                    onRefine={
                        handleRefine
                    }

                    title="Referral Message"

                />


                {/* =================================================
                    SAVE
                ================================================= */}

                <div className="
                    flex
                    items-center
                    justify-end
                    mt-4
                ">

                    <button
                        type="button"
                        onClick={
                            handleSave
                        }
                        disabled={
                            saving ||
                            !content.trim()
                        }
                        className="
                            inline-flex
                            items-center
                            justify-center
                            min-w-32
                            px-5
                            py-2.5
                            rounded-xl
                            bg-gray-900
                            text-white
                            text-sm
                            font-medium
                            shadow-sm
                            hover:bg-gray-800
                            hover:shadow-md
                            active:bg-gray-950
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            transition-all
                            duration-200
                        "
                    >

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                </div>

            </div>

        </div>
    );
};


export default ReferralDraftDetails;