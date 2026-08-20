import TagList
    from "./TagList";


const ProjectCard = ({
    project
}) => {

    return (

        <article className="
            rounded-xl
            bg-white
            border
            border-[#E8E2D7]
            p-5
            transition-all
            duration-200
            hover:border-[#DCD4C6]
            hover:shadow-sm
        ">

            <div>

                <h3 className="
                    text-base
                    font-semibold
                    tracking-tight
                    text-gray-900
                ">
                    {project.name ||
                        "Untitled Project"}
                </h3>


                {project.technologies?.length > 0 && (

                    <div className="mt-3">

                        <TagList
                            items={
                                project.technologies
                            }
                            variant="neutral"
                        />

                    </div>

                )}

            </div>


            {project.description && (

                <p className="
                    text-sm
                    leading-6
                    text-gray-600
                    mt-4
                ">
                    {project.description}
                </p>

            )}


            {project.responsibilities?.length > 0 && (

                <ul className="
                    mt-4
                    space-y-2.5
                ">

                    {project.responsibilities.map(
                        (item, index) => (

                            <li
                                key={index}
                                className="
                                    flex
                                    items-start
                                    gap-2.5
                                    text-sm
                                    leading-5
                                    text-gray-600
                                "
                            >

                                <span className="
                                    mt-2
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    bg-gray-500
                                    shrink-0
                                " />

                                <span>
                                    {item}
                                </span>

                            </li>

                        )
                    )}

                </ul>

            )}

        </article>
    );
};


export default ProjectCard;