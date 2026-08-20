import {
    Check,
    X
} from "lucide-react";


const EligibilityCard = ({
    label,
    value
}) => {

    const isMatch =
        Boolean(value);


    return (

        <div className="
            rounded-xl
            border
            border-[#E8E2D7]
            bg-white
            p-5
        ">

            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">

                <div>

                    <p className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-gray-400
                    ">
                        {label}
                    </p>


                    <p className="
                        mt-2
                        text-sm
                        font-semibold
                        text-gray-900
                    ">
                        {isMatch
                            ? "Requirement met"
                            : "Requirement not met"
                        }
                    </p>

                </div>


                <div className={`
                    w-9
                    h-9
                    shrink-0
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    border
                    ${
                        isMatch
                            ? `
                                bg-emerald-50
                                border-emerald-100
                                text-emerald-600
                            `
                            : `
                                bg-red-50
                                border-red-100
                                text-red-600
                            `
                    }
                `}>

                    {isMatch ? (

                        <Check
                            size={17}
                            strokeWidth={2}
                        />

                    ) : (

                        <X
                            size={17}
                            strokeWidth={2}
                        />

                    )}

                </div>

            </div>

        </div>
    );
};


export default EligibilityCard;