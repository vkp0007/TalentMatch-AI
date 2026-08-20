const TagList = ({
    items = [],
    variant = "neutral",
    emptyText = "No items listed."
}) => {

    const variants = {

        neutral: `
            bg-white
            border-[#E2DACC]
            text-gray-700
            hover:border-gray-300
        `,

        primary: `
            bg-white
            border-[#DCD4C6]
            text-gray-700
            hover:border-gray-400
            hover:bg-[#FDFBF7]
        `,

        success: `
            bg-white
            border-green-200
            text-green-700
            hover:border-green-300
        `

    };


    return (

        <>

            {items.length === 0 ? (

                <div className="
                    rounded-xl
                    bg-white/70
                    border
                    border-dashed
                    border-[#DCD4C6]
                    px-5
                    py-5
                ">

                    <p className="
                        text-sm
                        text-gray-400
                    ">
                        {emptyText}
                    </p>

                </div>

            ) : (

                <div className="
                    flex
                    flex-wrap
                    gap-2
                ">

                    {items.map(
                        (item, index) => (

                            <span
                                key={`${item}-${index}`}
                                className={`
                                    inline-flex
                                    items-center
                                    px-3
                                    py-1.5
                                    rounded-full
                                    border
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-150
                                    ${variants[variant] ||
                                        variants.neutral}
                                `}
                            >
                                {item}
                            </span>

                        )
                    )}

                </div>

            )}

        </>

    );
};


export default TagList;