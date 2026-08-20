import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router";

import {
    getApplicationEmails,
    deleteApplicationEmail
} from "../../api/applicationEmail.api.js";

import DraftList
    from "../../components/drafts/DraftList";


const ManageDrafts = () => {

    const navigate =
        useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [drafts, setDrafts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================================
    // LOAD DRAFTS
    // =====================================================

    const loadDrafts = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getApplicationEmails();


            setDrafts(
                response?.data?.data || []
            );


        } catch (error) {

            console.error(
                "Failed to load drafts:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load drafts."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadDrafts();

    }, []);


    // =====================================================
    // OPEN DRAFT
    // =====================================================

    const handleOpen = (
        draftId
    ) => {

        if (!draftId) {
            return;
        }


        navigate(
            `/drafts/${draftId}`
        );
    };


    // =====================================================
    // DELETE DRAFT
    // =====================================================

    const handleDelete = async (
        draftId
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this draft?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setError("");


            await deleteApplicationEmail(
                draftId
            );


            setDrafts(
                current =>
                    current.filter(
                        draft =>
                            draft._id !==
                            draftId
                    )
            );


        } catch (error) {

            console.error(
                "Failed to delete draft:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to delete draft."
            );

        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="
            min-h-full
            bg-[#F7F5F0]
        ">

            <div className="
                max-w-6xl
                mx-auto
                px-4
                sm:px-6
                py-8
                sm:py-10
            ">

                {/* =================================================
                    PAGE HEADER
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

       

                        <h1 className="
                            
                            text-2xl
                            sm:text-3xl
                            font-semibold
                            tracking-tight
                            text-gray-900
                        ">

                            Existing Drafts

                        </h1>


                        <p className="
                            mt-1.5
                            text-sm
                            leading-6
                            text-gray-500
                            max-w-lg
                        ">

                            View and manage your saved
                            application emails.

                        </p>

                    </div>


                    {/* =================================================
                        CREATE NEW EMAIL
                    ================================================= */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/application-email"
                            )
                        }
                        className="
                            shrink-0
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
                            active:scale-[0.98]
                            transition-all
                            duration-200
                        "
                    >

                        Create New Email

                    </button>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="
                        mb-6
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-5
                        py-4
                        text-sm
                        text-red-700
                        shadow-sm
                    ">

                        {error}

                    </div>

                )}


                {/* =================================================
                    DRAFT LIST
                ================================================= */}

                <div className="
                    rounded-2xl
                    border
                    border-[#E8E2D7]
                    bg-[#F7F3EA]/70
                    p-3
                    sm:p-4
                ">

                    <DraftList
                        drafts={
                            drafts
                        }
                        loading={
                            loading
                        }
                        onOpen={
                            handleOpen
                        }
                        onDelete={
                            handleDelete
                        }
                    />

                </div>

            </div>

        </div>
    );
};


export default ManageDrafts;