const ScoreCard = ({
    label,
    value,
    large = false,
    variant = "neutral"
}) => {

    const numericValue =
        Number(value);


    const variants = {
        neutral: "text-gray-900",
        primary: "text-gray-900",
        success: "text-emerald-600"
    };


    const valueColor =
        variants[variant] ||
        variants.neutral;


    return (

        <div className="
            flex
            flex-col
            items-center
            justify-center
            px-5
            py-5
            sm:py-6
        ">

            <p className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-gray-400
            ">
                {label}
            </p>


            <p className={`
                font-semibold
                tracking-tight
                mt-2
                ${valueColor}
                ${
                    large
                        ? "text-4xl sm:text-5xl"
                        : "text-2xl sm:text-3xl"
                }
            `}>

                {Number.isFinite(numericValue)
                    ? `${numericValue.toFixed(1)}%`
                    : "—"
                }

            </p>

        </div>
    );
};


export default ScoreCard;