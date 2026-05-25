import {
    Brain,
    Target
} from "lucide-react";


const ScoreCards = ({
    semanticScore,
    skillScore
}) => {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Semantic */}

            <div
                className="

                bg-white
                border
                border-slate-200
                rounded-3xl
                p-6

                "
            >

                <div className="flex items-center gap-4">

                    <div
                        className="

                        bg-slate-100
                        p-3
                        rounded-2xl

                        "
                    >

                        <Brain
                            size={22}
                            className="text-slate-900"
                        />

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Semantic Match
                        </p>

                        <h3
                            className="

                            text-3xl
                            font-bold
                            text-slate-900
                            mt-1

                            "
                        >
                            {semanticScore}%
                        </h3>

                    </div>

                </div>

            </div>


            {/* Skill Match */}

            <div
                className="

                bg-white
                border
                border-slate-200
                rounded-3xl
                p-6

                "
            >

                <div className="flex items-center gap-4">

                    <div
                        className="

                        bg-slate-100
                        p-3
                        rounded-2xl

                        "
                    >

                        <Target
                            size={22}
                            className="text-slate-900"
                        />

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Skill Match
                        </p>

                        <h3
                            className="

                            text-3xl
                            font-bold
                            text-slate-900
                            mt-1

                            "
                        >
                            {skillScore}%
                        </h3>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ScoreCards;