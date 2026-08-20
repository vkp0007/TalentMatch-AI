import {
    Sparkles
} from "lucide-react";


const RecommendationEmptyState = ({
    text
}) => {

    return (

        <div className="
            bg-[#F7F3EA]
            border
            border-dashed
            border-[#DCD4C6]
            rounded-2xl
            px-6
            py-10
            text-center
            shadow-sm
        ">

            <div className="
                w-10
                h-10
                mx-auto
                rounded-xl
                bg-white
                border
                border-[#E8E2D7]
                flex
                items-center
                justify-center
                text-gray-500
            ">

                <Sparkles
                    size={17}
                    strokeWidth={1.8}
                />

            </div>


            <p className="
                text-sm
                font-semibold
                text-gray-900
                mt-4
            ">
                Nothing to improve here
            </p>


            {text && (

                <p className="
                    text-sm
                    text-gray-500
                    mt-1.5
                    max-w-md
                    mx-auto
                ">
                    {text}
                </p>

            )}

        </div>
    );
};


export default RecommendationEmptyState;