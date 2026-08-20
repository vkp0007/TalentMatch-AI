const RecommendationSection = ({
    title,
    description,
    count,
    children
}) => {

    return (

        <section className="
            mb-8
        ">

            <div className="
                flex
                items-start
                justify-between
                gap-4
                mb-4
            ">

                <div className="
                    min-w-0
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        {title}
                    </h2>


                    {description && (

                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            {description}
                        </p>

                    )}

                </div>


                {count !== undefined && (

                    <span className="
                        shrink-0
                        min-w-7
                        h-7
                        px-2
                        rounded-full
                        bg-gray-50
                        border
                        border-gray-200
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-semibold
                        text-gray-600
                    ">
                        {count}
                    </span>

                )}

            </div>


            {children}

        </section>
    );
};


export default RecommendationSection;