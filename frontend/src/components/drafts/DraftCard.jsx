import {
    FileText,
    Trash2
} from "lucide-react";


const DraftCard = ({
    draft,
    onOpen,
    onDelete
}) => {

    const handleOpen = () => {

        if (!draft?._id) {
            return;
        }

        onOpen(
            draft._id
        );
    };


    return (

        <div
            className="
                group
                bg-white
                border
                border-gray-200
                rounded-xl
                hover:border-gray-300
                hover:shadow-sm
                transition
            "
        >

            <div className="
                flex
                items-center
                gap-4
                p-5
            ">

                {/* =================================================
                    CLICKABLE DRAFT
                ================================================= */}

                <button
                    type="button"
                    onClick={
                        handleOpen
                    }
                    className="
                        flex
                        items-center
                        gap-3
                        min-w-0
                        flex-1
                        text-left
                    "
                >

                    {/* ICON */}

                    <div className="
                        w-10
                        h-10
                        shrink-0
                        rounded-lg
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-600
                    ">
                        <FileText
                            size={18}
                        />
                    </div>


                    {/* INFO */}

                    <div className="
                        min-w-0
                    ">

                        <h3 className="
                            text-sm
                            font-semibold
                            text-gray-900
                            truncate
                        ">
                            {draft.role ||
                                "Application Email"}
                        </h3>


                        {draft.companyName && (

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                                truncate
                            ">
                                {draft.companyName}
                            </p>

                        )}


                        <p className="
                            text-xs
                            text-gray-400
                            mt-1.5
                        ">
                            {draft.createdAt
                                ? new Date(
                                    draft.createdAt
                                ).toLocaleDateString()
                                : "No date"}
                        </p>

                    </div>

                </button>


                {/* =================================================
                    DELETE
                ================================================= */}

                <button
                    type="button"
                    onClick={
                        event => {

                            event.stopPropagation();

                            onDelete(
                                draft._id
                            );
                        }
                    }
                    className="
                        shrink-0
                        w-8
                        h-8
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        hover:text-red-600
                        hover:bg-red-50
                        transition
                    "
                    title="Delete draft"
                >

                    <Trash2
                        size={16}
                    />

                </button>

            </div>

        </div>
    );
};


export default DraftCard;