const ListSection = ({
    title,
    items = [],
    emptyText = "No items listed.",
    hideWhenEmpty = false,
    variant = "neutral"
}) => {

    if (
        hideWhenEmpty &&
        items.length === 0
    ) {
        return null;
    }


    const bulletStyles = {

        neutral: "bg-gray-400",

        primary: "bg-gray-700",

        success: "bg-emerald-500"

    };


    const bulletColor =
        bulletStyles[variant] ||
        bulletStyles.neutral;


    return (

        <section className="
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            rounded-2xl
            p-6
            mb-6
            shadow-sm
            transition-all
            duration-200
            hover:border-[#DCD4C6]
            hover:shadow-md
        ">

            <div className="
                flex
                items-center
                justify-between
                gap-4
                mb-5
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        {title}
                    </h2>

                </div>


                {items.length > 0 && (

                    <span className="
                        shrink-0
                        min-w-7
                        h-7
                        px-2
                        rounded-full
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-semibold
                        text-gray-600
                    ">
                        {items.length}
                    </span>

                )}

            </div>


            {items.length === 0 ? (

                <div className="
                    rounded-xl
                    border
                    border-dashed
                    border-[#DCD4C6]
                    bg-white/60
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

                <ul className="space-y-2.5">

                    {items.map(
                        (item, index) => {

                            const isObject =
                                item !== null &&
                                typeof item === "object";


                            const itemName =
                                isObject
                                    ? item.name || "Training"
                                    : String(item);


                            const itemDuration =
                                isObject
                                    ? item.duration || ""
                                    : "";


                            return (

                                <li
                                    key={`${itemName}-${index}`}
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        rounded-xl
                                        bg-white
                                        border
                                        border-[#E8E2D7]
                                        px-4
                                        py-3.5
                                        transition-all
                                        duration-150
                                        hover:border-[#DCD4C6]
                                        hover:shadow-sm
                                    "
                                >

                                    <span className={`
                                        mt-2
                                        w-1.5
                                        h-1.5
                                        rounded-full
                                        shrink-0
                                        ${bulletColor}
                                    `} />


                                    <div className="
                                        min-w-0
                                        flex-1
                                    ">

                                        <p className="
                                            text-sm
                                            font-medium
                                            leading-5
                                            text-gray-800
                                        ">
                                            {itemName}
                                        </p>


                                        {itemDuration && (

                                            <p className="
                                                mt-1
                                                text-xs
                                                text-gray-500
                                            ">
                                                {itemDuration}
                                            </p>

                                        )}

                                    </div>

                                </li>

                            );

                        }
                    )}

                </ul>

            )}

        </section>
    );
};


export default ListSection;