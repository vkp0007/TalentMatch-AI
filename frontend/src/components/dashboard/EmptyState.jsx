import {
    FileText,
    ArrowRight
} from "lucide-react";


const EmptyState = ({
    title,
    description,
    actionLabel,
    onAction
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

                <FileText
                    size={17}
                    strokeWidth={1.8}
                />

            </div>


            <h3 className="
                mt-4
                text-sm
                font-semibold
                text-gray-900
            ">
                {title}
            </h3>


            {description && (

                <p className="
                    mt-1.5
                    max-w-sm
                    mx-auto
                    text-sm
                    leading-5
                    text-gray-500
                ">
                    {description}
                </p>

            )}


            {actionLabel && onAction && (

                <button
                    type="button"
                    onClick={onAction}
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-1.5
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
                    "
                >

                    {actionLabel}

                    <ArrowRight
                        size={14}
                        strokeWidth={1.8}
                    />

                </button>

            )}

        </div>
    );
};


export default EmptyState;