import {
    ArrowUp
} from "lucide-react";


const ApplicationEmailRefine = ({
    instruction,
    setInstruction,
    refining,
    onRefine
}) => {

    const handleKeyDown = event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            onRefine();
        }
    };


    return (

        <div className="
            mt-6
            pt-6
            border-t
            border-[#EEE9E1]
        ">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                items-center
                justify-between
                gap-3
                mb-3
            ">

                <div>

                    <h3 className="
                        text-sm
                        font-semibold
                        text-gray-900
                    ">
                        Refine with AI
                    </h3>

                    <p className="
                        text-xs
                        text-gray-400
                        mt-0.5
                    ">
                        Adjust the tone or wording of your email.
                    </p>

                </div>


                <span className="
                    hidden
                    sm:inline-flex
                    items-center
                    px-2
                    py-1
                    rounded-full
                    bg-[#F7F3EA]
                    border
                    border-[#E8E2D7]
                    text-[10px]
                    font-medium
                    text-gray-500
                ">
                    AI
                </span>

            </div>


            {/* =================================================
                INPUT
            ================================================= */}

            <div className="
                flex
                items-center
                gap-2
                p-1.5
                rounded-xl
                border
                border-[#E2DACC]
                bg-[#FCFBF8]
                focus-within:bg-white
                focus-within:border-[#CFC5B5]
                focus-within:ring-4
                focus-within:ring-[#F3EFE7]
                transition-all
                duration-200
            ">

                <input
                    value={instruction}
                    onChange={event =>
                        setInstruction(
                            event.target.value
                        )
                    }
                    onKeyDown={
                        handleKeyDown
                    }
                    disabled={refining}
                    placeholder="e.g. Make it shorter and more natural..."
                    className="
                        flex-1
                        min-w-0
                        bg-transparent
                        border-none
                        outline-none
                        px-2.5
                        py-2
                        text-sm
                        text-gray-900
                        placeholder:text-gray-400
                        disabled:opacity-50
                    "
                />


                <button
                    type="button"
                    onClick={onRefine}
                    disabled={
                        refining ||
                        !instruction.trim()
                    }
                    className="
                        shrink-0
                        w-9
                        h-9
                        rounded-lg
                        bg-gray-900
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-sm
                        hover:bg-gray-800
                        hover:shadow-md
                        hover:-translate-y-0.5
                        active:translate-y-0
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                        disabled:hover:translate-y-0
                        transition-all
                        duration-200
                    "
                    title="Refine email"
                >

                    {refining ? (

                        <span className="
                            w-4
                            h-4
                            rounded-full
                            border-2
                            border-white
                            border-t-transparent
                            animate-spin
                        " />

                    ) : (

                        <ArrowUp
                            size={16}
                            strokeWidth={2}
                        />

                    )}

                </button>

            </div>


            {/* =================================================
                HINT
            ================================================= */}

            <p className="
                text-[11px]
                text-gray-400
                mt-2
            ">
                Enter to refine · Shift + Enter for a new line
            </p>

        </div>
    );
};


export default ApplicationEmailRefine;