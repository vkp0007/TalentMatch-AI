import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    useNavigate
} from "react-router";

import {
    createApplicationEmail,
    refineApplicationEmail
} from "../../api/applicationEmail.api.js";

import ApplicationEmailForm
    from "../../components/application-email/ApplicationEmailForm.jsx";

import ApplicationEmailResult
    from "../../components/application-email/ApplicationEmailResult.jsx";


const ApplicationEmail = () => {

    const navigate =
        useNavigate();


    // =====================================================
    // SELECTED EMAIL
    // =====================================================

    const [
        selectedEmail,
        setSelectedEmail
    ] = useState(null);


    // =====================================================
    // FORM
    // =====================================================

    const [
        role,
        setRole
    ] = useState("");


    const [
        jobUrl,
        setJobUrl
    ] = useState("");


    const [
        userRequest,
        setUserRequest
    ] = useState("");


    // =====================================================
    // GENERATED EMAIL
    // =====================================================

    const [
        subject,
        setSubject
    ] = useState("");


    const [
        email,
        setEmail
    ] = useState("");


    // =====================================================
    // REFINE
    // =====================================================

    const [
        refineInstruction,
        setRefineInstruction
    ] = useState("");


    // =====================================================
    // UI STATE
    // =====================================================

    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        refining,
        setRefining
    ] = useState(false);


    const [
        copied,
        setCopied
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    // =====================================================
    // RESULT REF
    // =====================================================

    const resultRef =
        useRef(null);


    // =====================================================
    // GENERATE EMAIL
    // =====================================================

    const handleGenerate =
        async () => {

            if (!role.trim()) {

                setError(
                    "Role is required."
                );

                return;
            }


            if (!jobUrl.trim()) {

                setError(
                    "Job URL is required."
                );

                return;
            }


            if (!userRequest.trim()) {

                setError(
                    "Please specify what you want included in the email."
                );

                return;
            }


            try {

                setLoading(true);

                setError("");

                setCopied(false);


                const response =
                    await createApplicationEmail({

                        role:
                            role.trim(),

                        jobUrl:
                            jobUrl.trim(),

                        userRequest:
                            userRequest.trim()

                    });


                const result =
                    response?.data?.data;


                if (!result?._id) {

                    throw new Error(
                        "Invalid application email response."
                    );
                }


                setSelectedEmail(
                    result
                );


                setSubject(
                    result.subject || ""
                );


                setEmail(
                    result.email || ""
                );


                setTimeout(() => {

                    resultRef.current?.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }, 100);


            } catch (error) {

                console.error(
                    "Application email generation failed:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to generate application email."
                );


            } finally {

                setLoading(false);

            }
        };


    // =====================================================
    // COPY EMAIL
    // =====================================================

    const handleCopy =
        async () => {

            if (!email) {

                return;
            }


            try {

                const textToCopy =
                    `Subject: ${subject}\n\n${email}`;


                await navigator.clipboard.writeText(
                    textToCopy
                );


                setCopied(true);


                setTimeout(
                    () => {

                        setCopied(false);

                    },
                    2000
                );


            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }
        };


    // =====================================================
    // REFINE EMAIL
    // =====================================================

    const handleRefine =
        async () => {

            if (!selectedEmail?._id) {

                return;
            }


            if (!refineInstruction.trim()) {

                setError(
                    "Enter an instruction for refinement."
                );

                return;
            }


            try {

                setRefining(true);

                setError("");


                const response =
                    await refineApplicationEmail(

                        selectedEmail._id,

                        refineInstruction.trim()

                    );


                const result =
                    response?.data?.data;


                if (!result) {

                    throw new Error(
                        "Invalid refinement response."
                    );
                }


                setSelectedEmail(
                    result
                );


                setSubject(
                    result.subject || ""
                );


                setEmail(
                    result.email || ""
                );


                setRefineInstruction("");


            } catch (error) {

                console.error(
                    "Application email refinement failed:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to refine application email."
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
            min-h-full
            bg-[#FCFBF8]
            px-4
            sm:px-6
            lg:px-8
            py-8
            sm:py-10
            pb-14
        ">

            <div className="
                max-w-4xl
                mx-auto
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

    <div>

        <h1 className="
            text-2xl
            sm:text-3xl
            font-semibold
            tracking-tight
            text-gray-900
        ">
            Application Email
        </h1>


        <p className="
            mt-1.5
            text-sm
            leading-6
            text-gray-500
            max-w-xl
        ">
            Create a professional application email
            tailored to the job you're applying for.
        </p>

    </div>


    {/* EXISTING DRAFTS */}

    <button
        type="button"
        onClick={() =>
            navigate("/drafts")
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

        Existing Drafts

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
                        leading-5
                        text-red-700
                    ">

                        <span className="
                            shrink-0
                            w-5
                            h-5
                            rounded-full
                            bg-red-100
                            flex
                            items-center
                            justify-center
                            text-xs
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
                    FORM
                ================================================= */}

                <div className="
                    bg-white
                    border
                    border-[#E8E2D7]
                    rounded-2xl
                    shadow-[0_1px_2px_rgba(0,0,0,0.03)]
                    overflow-hidden
                    transition-all
                    duration-200
                    hover:border-[#DDD5C8]
                    hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]
                ">

                    <div className="
                        px-3
                        pt-4
                        pb-2
                    ">



                    </div>


                    <div className="
                        px-6
                        pb-6
                    ">

                        <ApplicationEmailForm

                            role={
                                role
                            }

                            jobUrl={
                                jobUrl
                            }

                            userRequest={
                                userRequest
                            }

                            loading={
                                loading
                            }

                            errors={{}}

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

                            onUserRequestChange={
                                event =>
                                    setUserRequest(
                                        event.target.value
                                    )
                            }

                            onGenerate={
                                handleGenerate
                            }

                        />

                    </div>

                </div>


                {/* =================================================
                    GENERATED EMAIL
                ================================================= */}

                {email && (

                    <div
                        ref={
                            resultRef
                        }
                        className="
                            mt-8
                            scroll-mt-6
                        "
                    >

                        <ApplicationEmailResult

                            subject={
                                subject
                            }

                            setSubject={
                                setSubject
                            }

                            email={
                                email
                            }

                            setEmail={
                                setEmail
                            }

                            copied={
                                copied
                            }

                            selectedEmail={
                                selectedEmail
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

        </div>
    );
};


export default ApplicationEmail;