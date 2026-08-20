import {
    ArrowRight,
    Sparkles
} from "lucide-react";


const RecommendationBanner = ({
    onViewRecommendations
}) => {

    return (

        <section className="
            relative
            overflow-hidden
            bg-gray-900
            rounded-2xl
            p-5
            sm:p-6
            text-white
        ">

            {/* Subtle decorative element */}

            <div className="
                absolute
                -right-12
                -top-12
                w-32
                h-32
                rounded-full
                bg-white/5
            " />


            <div className="
                relative
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
            ">

                <div className="
                    flex
                    items-start
                    gap-3
                ">

                    <div className="
                        w-9
                        h-9
                        shrink-0
                        rounded-xl
                        bg-white/10
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                    ">

                        <Sparkles
                            size={16}
                            strokeWidth={1.8}
                        />

                    </div>


                    <div>

                        <p className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-gray-400
                        ">
                            Next step
                        </p>


                        <h2 className="
                            mt-1
                            text-base
                            font-semibold
                        ">
                            Improve Your Match
                        </h2>


                        <p className="
                            text-sm
                            text-gray-400
                            mt-1
                            max-w-xl
                        ">
                            Get personalized skills and resume
                            recommendations based on this analysis.
                        </p>

                    </div>

                </div>


                <button
                    type="button"
                    onClick={onViewRecommendations}
                    className="
                        relative
                        shrink-0
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-xl
                        bg-white
                        text-gray-900
                        text-sm
                        font-medium
                        hover:bg-gray-100
                        transition-all
                    "
                >

                    View Recommendations

                    <ArrowRight
                        size={14}
                        strokeWidth={1.8}
                    />

                </button>

            </div>

        </section>
    );
};


export default RecommendationBanner;