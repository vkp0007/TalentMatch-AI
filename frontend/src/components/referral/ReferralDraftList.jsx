import {
    FileText
} from "lucide-react";

import ReferralDraftItem
    from "./ReferralDraftItem";


const ReferralDraftList = ({
    drafts = [],
    loading,
    onOpen,
    onDelete
}) => {

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
            ">

                {[1, 2, 3, 4].map(
                    item => (

                        <div
                            key={item}
                            className="
                                h-28
                                bg-white
                                border
                                border-[#E8E2D7]
                                rounded-2xl
                                p-5
                                animate-pulse
                            "
                        >

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-[#F7F3EA]
                                    border
                                    border-[#E8E2D7]
                                    shrink-0
                                "/>


                                <div className="
                                    flex-1
                                    space-y-2
                                ">

                                    <div className="
                                        h-3.5
                                        w-36
                                        bg-gray-200
                                        rounded
                                    "/>

                                    <div className="
                                        h-3
                                        w-24
                                        bg-gray-100
                                        rounded
                                    "/>

                                    <div className="
                                        h-2.5
                                        w-16
                                        bg-gray-100
                                        rounded
                                    "/>

                                </div>

                            </div>

                        </div>

                    )
                )}

            </div>
        );
    }


    // =====================================================
    // EMPTY
    // =====================================================

    if (drafts.length === 0) {

        return (

            <div className="
                bg-[#F7F3EA]
                border
                border-dashed
                border-[#DCD4C6]
                rounded-2xl
                px-6
                py-12
                text-center
                shadow-sm
            ">

                <div className="
                    w-11
                    h-11
                    mx-auto
                    rounded-xl
                    bg-white
                    border
                    border-[#E8E2D7]
                    flex
                    items-center
                    justify-center
                    text-gray-500
                ">

                    <FileText
                        size={18}
                        strokeWidth={1.8}
                    />

                </div>


                <h3 className="
                    mt-4
                    text-sm
                    font-semibold
                    text-gray-900
                ">
                    No referral drafts yet
                </h3>


                <p className="
                    mt-1.5
                    text-sm
                    leading-5
                    text-gray-500
                    max-w-sm
                    mx-auto
                ">
                    Your generated referral requests
                    will appear here.
                </p>

            </div>
        );
    }


    // =====================================================
    // LIST
    // =====================================================

    return (

        <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
        ">

            {drafts.map(
                draft => (

                    <ReferralDraftItem
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


export default ReferralDraftList;