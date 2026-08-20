const ApplicationEmailItem = ({
    email,
    selected,
    onOpen,
    onDelete
}) => {

    return (

        <div
            className={`
                group
                p-4
                border-b
                border-[#EEE9E1]
                last:border-b-0
                transition-all
                duration-200

                ${
                    selected
                        ? "bg-[#F7F3EA]"
                        : "bg-white hover:bg-[#FCFBF8]"
                }
            `}
        >

            <div className="
                flex
                items-start
                gap-3
            ">


                {/* =================================================
                    OPEN EMAIL
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        onOpen(
                            email._id
                        )
                    }
                    className="
                        flex-1
                        min-w-0
                        text-left
                        rounded-lg
                        outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#E5DED2]
                    "
                >

                    <div className="
                        flex
                        items-center
                        gap-2
                        min-w-0
                    ">

                        <span className="
                            w-1.5
                            h-1.5
                            shrink-0
                            rounded-full
                            bg-gray-300
                            group-hover:bg-gray-500
                            transition-colors
                        " />

                        <p className="
                            font-semibold
                            text-sm
                            text-gray-900
                            truncate
                        ">
                            {email.role ||
                                "Application Email"}
                        </p>

                    </div>


                    {email.subject && (

                        <p className="
                            text-sm
                            text-gray-600
                            truncate
                            mt-1.5
                            pl-3.5
                        ">
                            {email.subject}
                        </p>

                    )}


                    <p className="
                        text-[11px]
                        text-gray-400
                        mt-2
                        pl-3.5
                    ">
                        {email.createdAt
                            ? new Date(
                                email.createdAt
                            ).toLocaleDateString()
                            : ""}
                    </p>

                </button>


                {/* =================================================
                    DELETE
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        onDelete(
                            email._id
                        )
                    }
                    className="
                        shrink-0
                        px-2.5
                        py-1.5
                        rounded-lg
                        text-[11px]
                        font-medium
                        text-gray-400
                        hover:text-red-600
                        hover:bg-red-50
                        transition-all
                        duration-200
                    "
                >
                    Delete
                </button>

            </div>

        </div>
    );
};


export default ApplicationEmailItem;