import {
    AlertCircle,
    RefreshCw
} from "lucide-react";


const ErrorState = ({
    message = "Something went wrong.",
    onRetry
}) => {

    return (

        <div className="
            min-h-90
            flex
            items-center
            justify-center
        ">

            <div className="
                w-full
                max-w-md
                bg-white
                border
                border-[#E8E2D7]
                rounded-2xl
                px-6
                py-8
                text-center
                shadow-sm
            ">

                <div className="
                    w-10
                    h-10
                    mx-auto
                    rounded-xl
                    bg-red-50
                    border
                    border-red-100
                    text-red-600
                    flex
                    items-center
                    justify-center
                ">

                    <AlertCircle
                        size={18}
                        strokeWidth={1.8}
                    />

                </div>


                <h2 className="
                    mt-4
                    text-base
                    font-semibold
                    text-gray-900
                ">
                    Unable to load dashboard
                </h2>


                <p className="
                    mt-1.5
                    text-sm
                    leading-5
                    text-gray-500
                ">
                    {message}
                </p>


                {onRetry && (

                    <button
                        type="button"
                        onClick={onRetry}
                        className="
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-gray-900
                            text-white
                            text-sm
                            font-medium
                            hover:bg-gray-800
                            hover:shadow-md
                            transition-all
                        "
                    >

                        <RefreshCw
                            size={14}
                            strokeWidth={1.8}
                        />

                        Try Again

                    </button>

                )}

            </div>

        </div>
    );
};


export default ErrorState;