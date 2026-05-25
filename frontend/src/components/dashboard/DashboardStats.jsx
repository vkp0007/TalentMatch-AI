const DashboardStats = ({

    analyses

}) => {

    const totalAnalyses =
        analyses?.length || 0;


    const averageScore =

        totalAnalyses > 0

            ?

            Math.round(

                analyses.reduce(

                    (acc, item) =>

                        acc + item.finalScore,

                    0
                ) / totalAnalyses
            )

            :

            0;


    const highestScore =

        totalAnalyses > 0

            ?

            Math.max(

                ...analyses.map(

                    (item) => item.finalScore
                )
            )

            :

            0;


    return (

        <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >

            {/* ================================================= */}
            {/* TOTAL ANALYSES */}
            {/* ================================================= */}

            <div
                className="bg-white border border-slate-200 rounded-3xl p-7 hover:shadow-sm transition-all duration-300"
            >

                <p
                    className="text-slate-500 text-sm font-medium"
                >
                    Total Analyses
                </p>

                <h2
                    className="text-5xl font-bold tracking-tight text-slate-900 mt-4"
                >
                    {totalAnalyses}
                </h2>

                <p
                    className="text-slate-400 mt-3 text-sm"
                >
                    Resume analyses completed
                </p>

            </div>


            {/* ================================================= */}
            {/* AVERAGE SCORE */}
            {/* ================================================= */}

            <div
                className="bg-white border border-slate-200 rounded-3xl p-7 hover:shadow-sm transition-all duration-300"
            >

                <p
                    className="text-slate-500 text-sm font-medium"
                >
                    Average ATS Score
                </p>

                <h2
                    className="text-5xl font-bold tracking-tight text-slate-900 mt-4"
                >
                    {averageScore}%
                </h2>

                <p
                    className="text-slate-400 mt-3 text-sm"
                >
                    Overall ATS performance
                </p>

            </div>


            {/* ================================================= */}
            {/* HIGHEST SCORE */}
            {/* ================================================= */}

            <div
                className="bg-white border border-slate-200 rounded-3xl p-7 hover:shadow-sm transition-all duration-300"
            >

                <p
                    className="text-slate-500 text-sm font-medium"
                >
                    Highest ATS Score
                </p>

                <h2
                    className="text-5xl font-bold tracking-tight text-slate-900 mt-4"
                >
                    {highestScore}%
                </h2>

                <p
                    className="text-slate-400 mt-3 text-sm"
                >
                    Best resume-job match
                </p>

            </div>

        </div>
    );
};

export default DashboardStats;