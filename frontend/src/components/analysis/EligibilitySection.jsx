import {
    ShieldCheck
} from "lucide-react";

import EligibilityCard
    from "./EligibilityCard";


const EligibilitySection = ({
    educationMatch,
    experienceMatch
}) => {

    return (

        <section className="
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            rounded-2xl
            p-5
            sm:p-6
        ">

            {/* HEADER */}

            <div className="
                flex
                items-start
                gap-3
                mb-5
            ">

                <div className="
                    w-9
                    h-9
                    shrink-0
                    rounded-xl
                    bg-white
                    border
                    border-[#E8E2D7]
                    flex
                    items-center
                    justify-center
                    text-gray-600
                ">

                    <ShieldCheck
                        size={17}
                        strokeWidth={1.8}
                    />

                </div>


                <div>

                    <h2 className="
                        text-base
                        font-semibold
                        text-gray-900
                    ">
                        Eligibility
                    </h2>


                    <p className="
                        text-xs
                        text-gray-500
                        mt-1
                    ">
                        How your profile compares with
                        the basic job requirements.
                    </p>

                </div>

            </div>


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
            ">

                <EligibilityCard
                    label="Education Match"
                    value={educationMatch}
                />


                <EligibilityCard
                    label="Experience Match"
                    value={experienceMatch}
                />

            </div>

        </section>
    );
};


export default EligibilitySection;