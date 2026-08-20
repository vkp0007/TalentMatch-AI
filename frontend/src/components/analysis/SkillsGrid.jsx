import SkillSection
    from "./SkillSection";


const SkillsGrid = ({
    matchedSkills = [],
    missingSkills = []
}) => {

    return (

        <section>

            <div className="
                mb-4
            ">

                <h2 className="
                    text-base
                    font-semibold
                    text-gray-900
                ">
                    Skills Analysis
                </h2>

                <p className="
                    text-xs
                    text-gray-500
                    mt-1
                ">
                    See which job skills are already covered
                    and where gaps remain.
                </p>

            </div>


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
            ">

                <SkillSection
                    title="Matched Skills"
                    skills={matchedSkills}
                    emptyText="No matched skills identified."
                    variant="matched"
                />


                <SkillSection
                    title="Missing Skills"
                    skills={missingSkills}
                    emptyText="No missing skills identified."
                    variant="missing"
                />

            </div>

        </section>
    );
};


export default SkillsGrid;