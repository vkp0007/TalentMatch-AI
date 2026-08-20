import {
    FileText,
    Trash2,
    ArrowUpRight
} from "lucide-react";


const ReferralDraftItem = ({
    draft,
    onOpen,
    onDelete
}) => {

    return (

        <article className="
            group
            bg-white
            border
            border-[#E8E2D7]
            rounded-2xl
            shadow-sm
            overflow-hidden
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-[#DCD4C6]
            hover:shadow-md
        ">

            <div className="
                flex
                items-center
                gap-4
                p-5
            ">

                {/* OPEN DRAFT */}

                <button
                    type="button"
                    onClick={() =>
                        onOpen(draft._id)
                    }
                    className="
                        flex
                        items-center
                        gap-3.5
                        min-w-0
                        flex-1
                        text-left
                        outline-none
                        rounded-xl
                    "
                >

                    {/* ICON */}

                    <div className="
                        w-10
                        h-10
                        shrink-0
                        rounded-xl
                        bg-[#F7F3EA]
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        group-hover:bg-white
                        group-hover:border-[#DCD4C6]
                        transition-all
                    ">

                        <FileText
                            size={17}
                            strokeWidth={1.8}
                        />

                    </div>


                    {/* INFORMATION */}

                    <div className="
                        min-w-0
                        flex-1
                    ">

                        <h3 className="
                            text-sm
                            font-semibold
                            text-gray-900
                            truncate
                            tracking-tight
                        ">
                            {draft.role ||
                                "Referral Request"}
                        </h3>


                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                            truncate
                        ">
                            {draft.companyName ||
                                "Company"}
                        </p>


                        <p className="
                            text-[11px]
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


                    {/* OPEN ICON */}

                    <div className="
                        w-8
                        h-8
                        shrink-0
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-gray-300
                        group-hover:text-gray-700
                        group-hover:bg-[#F7F3EA]
                        transition-all
                    ">

                        <ArrowUpRight
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>

                </button>


                {/* DELETE */}

                <button
                    type="button"
                    onClick={() =>
                        onDelete(draft._id)
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
                        transition-all
                    "
                    title="Delete draft"
                    aria-label="Delete referral draft"
                >

                    <Trash2
                        size={16}
                        strokeWidth={1.8}
                    />

                </button>

            </div>

        </article>
    );
};


export default ReferralDraftItem;