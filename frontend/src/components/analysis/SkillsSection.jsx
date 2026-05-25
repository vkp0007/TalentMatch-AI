import {
    CheckCircle,
    XCircle,
    PlusCircle
} from "lucide-react";

import SkillGroupCard from "./SkillGroupCard";


const SkillsSection = ({ analysis }) => {

    const sections = [

        {
            title: "Matched Skills",
            icon: CheckCircle,
            skills: analysis.matchedSkills
        },

        {
            title: "Missing Skills",
            icon: XCircle,
            skills: analysis.missingSkills
        },

        {
            title: "Additional Skills",
            icon: PlusCircle,
            skills: analysis.additionalSkills
        }
    ];


    return (

        <div
            className="

            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
            items-start

            "
        >

            {
                sections.map((section, index) => (

                    <SkillGroupCard
                        key={index}
                        title={section.title}
                        icon={section.icon}
                        skills={section.skills}
                    />
                ))
            }

        </div>
    );
};

export default SkillsSection;