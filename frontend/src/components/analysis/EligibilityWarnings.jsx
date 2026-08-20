import {
    AlertTriangle
} from "lucide-react";


const EligibilityWarnings = ({
    warnings = []
}) => {

    if (!warnings.length) {
        return null;
    }


    return (

        <section className="
            bg-white
            border
            border-amber-200
            rounded-2xl
            p-5
            sm:p-6
        ">

            <div className="
                flex
                items-start
                gap-3
            ">

                <div className="
                    w-9
                    h-9
                    shrink-0
                    rounded-xl
                    bg-amber-50
                    border
                    border-amber-100
                    text-amber-600
                    flex
                    items-center
                    justify-center
                ">

                    <AlertTriangle
                        size={17}
                        strokeWidth={1.8}
                    />

                </div>


                <div className="
                    min-w-0
                    flex-1
                ">

                    <h2 className="
                        text-sm
                        font-semibold
                        text-gray-900
                    ">
                        Eligibility Warnings
                    </h2>


                    <p className="
                        text-xs
                        text-gray-500
                        mt-1
                    ">
                        Review these points before deciding
                        how strong the match is.
                    </p>


                    <ul className="
                        mt-4
                        space-y-2.5
                    ">

                        {warnings.map(
                            (warning, index) => (

                                <li
                                    key={index}
                                    className="
                                        flex
                                        items-start
                                        gap-2.5
                                        text-sm
                                        leading-5
                                        text-gray-700
                                    "
                                >

                                    <span className="
                                        mt-2
                                        w-1.5
                                        h-1.5
                                        shrink-0
                                        rounded-full
                                        bg-amber-500
                                    " />

                                    <span>
                                        {warning}
                                    </span>

                                </li>

                            )
                        )}

                    </ul>

                </div>

            </div>

        </section>
    );
};


export default EligibilityWarnings;