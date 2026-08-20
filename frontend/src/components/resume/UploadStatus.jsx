import {
    Check,
    AlertCircle,
    X
} from "lucide-react";


const UploadStatus = ({
    type,
    message
}) => {

    if (!message) {
        return null;
    }


    if (type === "success") {

        return (

            <div className="
                mb-6
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-green-200
                bg-green-50/80
                px-4
                py-3.5
                shadow-sm
            ">

                <div className="
                    w-8
                    h-8
                    shrink-0
                    rounded-lg
                    bg-white
                    border
                    border-green-200
                    text-green-600
                    flex
                    items-center
                    justify-center
                ">

                    <Check
                        size={15}
                        strokeWidth={2.2}
                    />

                </div>


                <div className="
                    min-w-0
                    flex-1
                ">

                    <p className="
                        text-sm
                        font-medium
                        text-green-800
                    ">
                        Upload successful
                    </p>

                    <p className="
                        text-xs
                        text-green-700
                        mt-0.5
                    ">
                        {message}
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="
            mb-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-200
            bg-red-50/80
            px-4
            py-3.5
            shadow-sm
        ">

            <div className="
                w-8
                h-8
                shrink-0
                rounded-lg
                bg-white
                border
                border-red-200
                text-red-600
                flex
                items-center
                justify-center
            ">

                <AlertCircle
                    size={15}
                    strokeWidth={2}
                />

            </div>


            <div className="
                min-w-0
                flex-1
            ">

                <p className="
                    text-sm
                    font-medium
                    text-red-800
                ">
                    Upload failed
                </p>

                <p className="
                    text-xs
                    text-red-700
                    mt-0.5
                ">
                    {message}
                </p>

            </div>

        </div>
    );
};


export default UploadStatus;