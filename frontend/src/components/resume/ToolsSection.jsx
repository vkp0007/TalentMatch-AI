import TagList
    from "./TagList";


const ToolsSection = ({
    tools
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
            hover:shadow-md
            hover:border-[#DCD4C6]
            hover:-translate-y-0.5
            transition-all
            duration-200
        ">

            <div className="
                flex
                items-center
                justify-between
                gap-4
                mb-5
            ">

                <div>

                    <p className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-gray-400
                    ">
                        Profile
                    </p>

                    <h2 className="
                        mt-1
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        Tools & Platforms
                    </h2>

                </div>


                {tools?.length > 0 && (

                    <span className="
                        shrink-0
                        px-2.5
                        py-1
                        rounded-full
                        bg-white
                        border
                        border-[#E8E2D7]
                        text-xs
                        font-medium
                        text-gray-600
                    ">
                        {tools.length}
                    </span>

                )}

            </div>


            <TagList
                items={tools}
                variant="neutral"
                emptyText="No tools listed."
            />

        </section>
    );
};


export default ToolsSection;