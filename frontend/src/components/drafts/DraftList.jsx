import DraftCard
    from "./DraftCard";


const DraftList = ({
    drafts,
    loading,
    onOpen,
    onDelete
}) => {

    if (loading) {

        return (

            <div className="
                py-16
                text-center
                text-sm
                text-gray-500
            ">
                Loading drafts...
            </div>

        );
    }


    if (!drafts.length) {

        return (

            <div className="
                border
                border-dashed
                border-gray-300
                rounded-xl
                py-16
                px-6
                text-center
                bg-white
            ">

                <h3 className="
                    text-sm
                    font-semibold
                    text-gray-900
                ">
                    No saved drafts
                </h3>


                <p className="
                    text-sm
                    text-gray-500
                    mt-1
                ">
                    Generated application emails will
                    appear here.
                </p>

            </div>

        );
    }


    return (

        <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
        ">

            {drafts.map(
                draft => (

                    <DraftCard
                        key={
                            draft._id
                        }
                        draft={
                            draft
                        }
                        onOpen={
                            onOpen
                        }
                        onDelete={
                            onDelete
                        }
                    />

                )
            )}

        </div>
    );
};


export default DraftList;