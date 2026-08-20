const AnalysisHeader = ({
    targetRole,
    resumeId,
    onBack,
    onNewAnalysis
}) => {

    return (

        <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-start
            sm:justify-between
            gap-5
            mb-7
        ">

            <div>


                <h1 className="
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-gray-900
                ">
                    {targetRole || "Analysis"}
                </h1>


                <p className="
                    text-sm
                    text-gray-500
                    mt-1.5
                ">
                    Resume analysis and job match
                </p>

            </div>


            <button
                type="button"
                onClick={onNewAnalysis}
                className="
                    shrink-0
                    inline-flex
                    items-center
                    justify-center
                    px-4
                    py-2.5
                    rounded-xl
                    bg-gray-900
                    text-white
                    text-sm
                    font-medium
                    shadow-sm
                    hover:bg-gray-800
                    hover:shadow-md
                    transition-all
                    duration-200
                "
            >
                New Analysis
            </button>

        </div>
    );
};


export default AnalysisHeader;