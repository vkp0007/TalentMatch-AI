import {
    useState
} from "react";

import {
    useNavigate
} from "react-router";

import {
    ArrowRight,
    FileText
} from "lucide-react";

import {
    createReferralDraft,
    refineReferralDraft
} from "../../api/referralDraft.api.js";

import ReferralForm
    from "../../components/referral/ReferralForm";

import ReferralResult
    from "../../components/referral/ReferralResult";


const ReferralDraft = () => {

    const navigate =
        useNavigate();


    // =====================================================
    // FORM STATE
    // =====================================================

    const [recipientName, setRecipientName] =
        useState("");

    const [companyName, setCompanyName] =
        useState("");

    const [role, setRole] =
        useState("");

    const [jobUrl, setJobUrl] =
        useState("");

    const [customContext, setCustomContext] =
        useState("");


    // =====================================================
    // RESULT STATE
    // =====================================================

    const [draft, setDraft] =
        useState("");

    const [selectedDraft, setSelectedDraft] =
        useState(null);

    const [copied, setCopied] =
        useState(false);


    // =====================================================
    // UI STATE
    // =====================================================

    const [loading, setLoading] =
        useState(false);

    const [refining, setRefining] =
        useState(false);

    const [refineInstruction, setRefineInstruction] =
        useState("");

    const [error, setError] =
        useState("");


    // =====================================================
    // GENERATE REFERRAL
    // =====================================================

    const handleGenerate = async () => {

        setError("");


        if (!companyName.trim()) {

            setError(
                "Please enter the company name."
            );

            return;
        }


        if (!role.trim()) {

            setError(
                "Please enter the role."
            );

            return;
        }


        if (!jobUrl.trim()) {

            setError(
                "Please enter the job URL."
            );

            return;
        }


        if (!customContext.trim()) {

            setError(
                "Please enter the referral context."
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await createReferralDraft({

                    recipientName:
                        recipientName.trim(),

                    companyName:
                        companyName.trim(),

                    role:
                        role.trim(),

                    jobUrl:
                        jobUrl.trim(),

                    customContext:
                        customContext.trim()

                });


            const createdDraft =
                response?.data?.data;


            if (!createdDraft) {

                throw new Error(
                    "Invalid referral draft response."
                );
            }


            setSelectedDraft(
                createdDraft
            );


            setDraft(
                createdDraft.draft || ""
            );


        } catch (error) {

            console.error(
                "Referral generation failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to generate referral draft."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // COPY
    // =====================================================

    const handleCopy = async () => {

        if (!draft) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                draft
            );


            setCopied(true);


            setTimeout(() => {

                setCopied(false);

            }, 2000);


        } catch (error) {

            console.error(
                "Failed to copy referral:",
                error
            );

        }
    };


    // =====================================================
    // REFINE
    // =====================================================

    const handleRefine = async () => {

        if (
            !selectedDraft?._id ||
            !refineInstruction.trim()
        ) {

            return;
        }


        try {

            setRefining(true);
            setError("");


            const response =
                await refineReferralDraft(

                    selectedDraft._id,

                    refineInstruction.trim()

                );


            const updatedDraft =
                response?.data?.data;


            const updatedContent =
                updatedDraft?.draft || "";


            if (updatedContent) {

                setDraft(
                    updatedContent
                );


                setSelectedDraft(
                    current => ({
                        ...current,
                        draft: updatedContent
                    })
                );

            }


            setRefineInstruction("");


        } catch (error) {

            console.error(
                "Referral refinement failed:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to refine referral draft."
            );


        } finally {

            setRefining(false);

        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            max-w-5xl
            mx-auto
            px-6
            pb-14
        ">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

     <div className="
    pt-4
    mb-8
    flex
    flex-col
    sm:flex-row
    sm:items-start
    sm:justify-between
    gap-5
">

    {/* LEFT */}

    <div className="
        flex
        items-start
        gap-3.5
    ">

        <div className="
            w-11
            h-11
            shrink-0
            rounded-xl
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            flex
            items-center
            justify-center
            text-gray-700
            shadow-sm
        ">

            <FileText
                size={19}
                strokeWidth={1.8}
            />

        </div>


        <div>

            <h1 className="
                text-2xl
                sm:text-3xl
                font-semibold
                tracking-tight
                text-gray-900
            ">
                Referral Draft
            </h1>


            <p className="
                mt-1.5
                text-sm
                leading-6
                text-gray-500
                max-w-xl
            ">
                Generate a personalized referral request
                for a specific job opportunity.
            </p>

        </div>

    </div>


    {/* VIEW DRAFTS */}

    <button
        type="button"
        onClick={() =>
            navigate("/referral-drafts")
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
            border
            border-[#E8E2D7]
            bg-white
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            hover:bg-[#F7F3EA]
            hover:border-[#DCD4C6]
            hover:text-gray-900
            hover:shadow
            transition-all
            duration-200
        "
    >

        View Drafts

        <ArrowRight
            size={15}
            strokeWidth={1.8}
        />

    </button>

</div>


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


                    <span className="
                        leading-5
                    ">
                        {error}
                    </span>

                </div>

            )}


            {/* =================================================
                REFERRAL FORM
            ================================================= */}

            <div className="
                rounded-2xl
                border
                border-[#E8E2D7]
                bg-[#F7F3EA]
                p-1
                shadow-sm
            ">

                <ReferralForm

                    recipientName={
                        recipientName
                    }

                    companyName={
                        companyName
                    }

                    role={
                        role
                    }

                    jobUrl={
                        jobUrl
                    }

                    customContext={
                        customContext
                    }

                    loading={
                        loading
                    }

                    onRecipientNameChange={
                        event =>
                            setRecipientName(
                                event.target.value
                            )
                    }

                    onCompanyChange={
                        event =>
                            setCompanyName(
                                event.target.value
                            )
                    }

                    onRoleChange={
                        event =>
                            setRole(
                                event.target.value
                            )
                    }

                    onJobUrlChange={
                        event =>
                            setJobUrl(
                                event.target.value
                            )
                    }

                    onContextChange={
                        event =>
                            setCustomContext(
                                event.target.value
                            )
                    }

                    onGenerate={
                        handleGenerate
                    }

                />

            </div>


            {/* =================================================
                GENERATED RESULT
            ================================================= */}

            {draft && (

                <div className="
                    mt-6
                    rounded-2xl
                    border
                    border-[#E8E2D7]
                    bg-[#F7F3EA]
                    p-1
                    shadow-sm
                ">

                    <ReferralResult

                        draft={
                            draft
                        }

                        setDraft={
                            setDraft
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

                    />

                </div>

            )}

        </div>
    );
};


export default ReferralDraft;