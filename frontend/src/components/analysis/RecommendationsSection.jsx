const RecommendationsSection = ({
    recommendations = []
}) => {

    return (

        <div
            className="

            bg-white
            border
            border-slate-200
            rounded-3xl
            p-6

            "
        >

            <h2
                className="

                text-2xl
                font-bold
                text-slate-900
                mb-6

                "
            >
                AI Recommendations
            </h2>

            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

                {
                    recommendations.map((recommendation, index) => (

                        <div
                            key={index}
                            className="

                            bg-slate-50
                            rounded-2xl
                            p-5
                            border
                            border-slate-100

                            "
                        >

                            <p
                                className="

                                text-slate-900
                                text-md
                                leading-relaxed

                                "
                            >
                                {recommendation}
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default RecommendationsSection;