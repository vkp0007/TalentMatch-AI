import {
    MessageSquare,
    Code2,
    BriefcaseBusiness,
    Brain,
    FolderGit2
} from "lucide-react";


const InterviewEmptyState = ({
    onPrompt
}) => {

    const suggestions = [

        {
            icon: Code2,
            title: "Technical questions",
            text: "Give me Python interview questions"
        },

        {
            icon: FolderGit2,
            title: "Project discussion",
            text: "Help me explain my project"
        },

        {
            icon: BriefcaseBusiness,
            title: "HR preparation",
            text: "Ask me common HR questions"
        },

        {
            icon: Brain,
            title: "Mock interview",
            text: "Start a mock interview"
        }

    ];


    return (

        <div className="
            min-h-[60vh]
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-4
        ">


            {/* =================================================
                TITLE
            ================================================= */}

            <h2 className="
                mt-5
                text-2xl
                font-semibold
                tracking-tight
                text-gray-900
            ">
                How can I help you prepare?
            </h2>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p className="
                mt-2
                text-sm
                leading-6
                text-gray-500
                max-w-lg
            ">
                Practice technical questions, discuss your
                projects, prepare for HR rounds, or run a
                mock interview.
            </p>


            {/* =================================================
                SUGGESTIONS
            ================================================= */}

            <div className="
                mt-8
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
                w-full
                max-w-2xl
            ">

                {suggestions.map(
                    suggestion => {

                        const Icon =
                            suggestion.icon;


                        return (

                            <button
                                key={
                                    suggestion.title
                                }
                                type="button"
                                onClick={() =>
                                    onPrompt?.(
                                        suggestion.text
                                    )
                                }
                                className="
                                    group
                                    text-left
                                    bg-white
                                    border
                                    border-[#E8E2D7]
                                    rounded-2xl
                                    p-4
                                    shadow-[0_1px_4px_rgba(0,0,0,0.03)]
                                    hover:border-[#D6CCBD]
                                    hover:shadow-[0_5px_16px_rgba(0,0,0,0.055)]
                                    hover:-translate-y-0.5
                                    active:translate-y-0
                                    transition-all
                                    duration-200
                                "
                            >

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <div className="
                                        w-9
                                        h-9
                                        shrink-0
                                        rounded-xl
                                        bg-[#F7F3EA]
                                        border
                                        border-[#E8E2D7]
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-600
                                        group-hover:bg-[#F3EEE4]
                                        group-hover:text-gray-800
                                        transition-all
                                    ">

                                        <Icon
                                            size={16}
                                            strokeWidth={1.8}
                                        />

                                    </div>


                                    <div className="
                                        min-w-0
                                    ">

                                        <p className="
                                            text-sm
                                            font-semibold
                                            text-gray-900
                                            group-hover:text-gray-800
                                            transition-colors
                                        ">
                                            {
                                                suggestion.title
                                            }
                                        </p>


                                        <p className="
                                            text-xs
                                            text-gray-500
                                            mt-0.5
                                            truncate
                                        ">
                                            {
                                                suggestion.text
                                            }
                                        </p>

                                    </div>

                                </div>

                            </button>

                        );

                    }
                )}

            </div>

        </div>
    );
};


export default InterviewEmptyState;