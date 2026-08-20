import ProjectCard
    from "./ProjectCard";


const ProjectsSection = ({
    projects = []
}) => {

    return (

        <section className="
            bg-[#F7F3EA]
            border
            border-[#E8E2D7]
            rounded-2xl
            p-6
            mb-6
            shadow-sm
            transition-all
            duration-200
            hover:border-[#DCD4C6]
            hover:shadow-md
        ">

            <div className="
                flex
                items-center
                justify-between
                gap-4
                mb-6
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        Projects
                    </h2>

                    <p className="
                        text-xs
                        text-gray-500
                        mt-1
                    ">
                        Projects and technical work identified from your resume.
                    </p>

                </div>


                {projects.length > 0 && (

                    <span className="
                        shrink-0
                        min-w-7
                        h-7
                        px-2
                        rounded-full
                        bg-white
                        border
                        border-[#E8E2D7]
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-semibold
                        text-gray-600
                    ">
                        {projects.length}
                    </span>

                )}

            </div>


            {projects.length === 0 ? (

                <div className="
                    rounded-xl
                    border
                    border-dashed
                    border-[#DCD4C6]
                    bg-white/60
                    px-5
                    py-5
                ">

                    <p className="
                        text-sm
                        text-gray-400
                    ">
                        No projects listed.
                    </p>

                </div>

            ) : (

                <div className="
                    space-y-3
                ">

                    {projects.map(
                        (project, index) => (

                            <ProjectCard
                                key={
                                    project._id ||
                                    index
                                }
                                project={
                                    project
                                }
                            />

                        )
                    )}

                </div>

            )}

        </section>
    );
};


export default ProjectsSection;