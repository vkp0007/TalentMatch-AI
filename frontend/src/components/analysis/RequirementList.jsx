const RequirementList = ({
    title,
    items = [],
    variant = "neutral"
}) => {

    const styles = {
        neutral: {
            bullet: "bg-gray-400",
            title: "text-gray-900"
        },

        primary: {
            bullet: "bg-gray-700",
            title: "text-gray-900"
        },

        success: {
            bullet: "bg-emerald-500",
            title: "text-gray-900"
        }
    };


    const style =
        styles[variant] ||
        styles.neutral;


    return (

        <div>

            <div className="
                flex
                items-center
                justify-between
                gap-3
                mb-3
            ">

                <h3 className={`
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    ${style.title}
                `}>
                    {title}
                </h3>


                {items?.length > 0 && (

                    <span className="
                        text-[10px]
                        font-medium
                        text-gray-400
                    ">
                        {items.length}
                    </span>

                )}

            </div>


            {items?.length === 0 ? (

                <div className="
                    rounded-xl
                    bg-white/70
                    border
                    border-dashed
                    border-[#DCD4C6]
                    px-4
                    py-3
                ">

                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        None specified.
                    </p>

                </div>

            ) : (

                <ul className="
                    space-y-2.5
                ">

                    {items.map(
                        (item, index) => (

                            <li
                                key={index}
                                className="
                                    flex
                                    items-start
                                    gap-2.5
                                    text-sm
                                    leading-5
                                    text-gray-600
                                "
                            >

                                <span className={`
                                    mt-2
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    shrink-0
                                    ${style.bullet}
                                `} />

                                <span>
                                    {item}
                                </span>

                            </li>

                        )
                    )}

                </ul>

            )}

        </div>
    );
};


export default RequirementList;