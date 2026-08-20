import {
    BriefcaseBusiness
} from "lucide-react";

import RequirementList
    from "./RequirementList";


const JobRequirements = ({
    requiredSkills,
    preferredSkills,
    educationRequirements,
    responsibilities
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
                mb-6
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

                    <BriefcaseBusiness
                        size={16}
                        strokeWidth={1.8}
                    />

                </div>


                <div>

                    <h2 className="
                        text-base
                        font-semibold
                        text-gray-900
                    ">
                        Job Requirements
                    </h2>


                    <p className="
                        text-xs
                        text-gray-500
                        mt-1
                    ">
                        Requirements and responsibilities
                        extracted from the job description.
                    </p>

                </div>

            </div>


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-x-10
                gap-y-8
            ">

                <RequirementList
                    title="Required Skills"
                    items={requiredSkills}
                    variant="primary"
                />


                <RequirementList
                    title="Preferred Skills"
                    items={preferredSkills}
                />


                <RequirementList
                    title="Education Requirements"
                    items={educationRequirements}
                />


                <RequirementList
                    title="Responsibilities"
                    items={responsibilities}
                    variant="success"
                />

            </div>

        </section>
    );
};


export default JobRequirements;