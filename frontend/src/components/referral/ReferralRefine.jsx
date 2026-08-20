import {
    ArrowUp
} from "lucide-react";


const ReferralRefine = ({
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
            mt-5
            pt-5
            border-t
            border-[#E8E2D7]
        ">

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                mb-2.5
            ">

                <h3 className="
                    text-sm
                    font-semibold
                    tracking-tight
                    text-gray-900
                ">
                    Refine with AI
                </h3>


                <span className="
                    text-[11px]
                    text-gray-400
                ">
                    Enter to refine
                </span>

            </div>


            {/* INPUT */}

            <div className="
                flex
                items-center
                gap-2
                p-1.5
                rounded-xl
                border
                border-[#E8E2D7]
                bg-[#F7F3EA]/60
                focus-within:bg-white
                focus-within:border-[#DCD4C6]
                focus-within:ring-4
                focus-within:ring-[#F7F3EA]
                transition-all
            ">

                <input
                    type="text"
                    value={instruction}
                    onChange={event =>
                        setInstruction(
                            event.target.value
                        )
                    }
                    onKeyDown={handleKeyDown}
                    disabled={refining}
                    placeholder="Make it shorter, more casual..."
                    className="
                        flex-1
                        min-w-0
                        h-9
                        bg-transparent
                        border-none
                        outline-none
                        px-2.5
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
                        hover:bg-gray-800
                        hover:shadow-sm
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                        transition-all
                    "
                    title="Refine draft"
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
                            strokeWidth={1.8}
                        />

                    )}

                </button>

            </div>


            {/* HINT */}

            <p className="
                text-[11px]
                text-gray-400
                mt-1.5
            ">
                Shift + Enter is not needed — this field sends on Enter.
            </p>

        </div>
    );
};


export default ReferralRefine;