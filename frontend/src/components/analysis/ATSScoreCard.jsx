const ATSScoreCard = ({ finalScore }) => {

    return (

        <div
            className="

            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            text-center

            "
        >

            <p
                className="

                text-slate-500
                text-sm
                font-medium
                uppercase
                tracking-wide

                "
            >
                Final ATS Score
            </p>

            <h2
                className="

                text-5xl
                md:text-5xl
                font-bold
                tracking-tight
                text-slate-900
                mt-4

                "
            >
                {finalScore}%
            </h2>

        </div>
    );
};

export default ATSScoreCard;