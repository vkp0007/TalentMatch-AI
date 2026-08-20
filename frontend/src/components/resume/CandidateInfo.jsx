const CandidateInfo = ({
    candidateInfo = {}
}) => {

    const {
        name,
        email,
        phone,
        linkedin,
        github
    } = candidateInfo;


    const fields = [
        {
            label: "Name",
            value: name
        },
        {
            label: "Email",
            value: email
        },
        {
            label: "Phone",
            value: phone
        },
        {
            label: "LinkedIn",
            value: linkedin
        },
        {
            label: "GitHub",
            value: github
        }
    ];


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
                mb-6
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-900
                    ">
                        Candidate Information
                    </h2>

                    <p className="
                        text-xs
                        text-gray-500
                        mt-1
                    ">
                        Contact and profile information extracted from your resume.
                    </p>

                </div>

            </div>


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
            ">

                {fields.map(
                    field => (

                        <div
                            key={field.label}
                            className="
                                rounded-xl
                                bg-white
                                border
                                border-[#E8E2D7]
                                px-4
                                py-3.5
                                transition
                                hover:border-[#DCD4C6]
                            "
                        >

                            <p className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-gray-400
                            ">
                                {field.label}
                            </p>


                            <p className="
                                mt-1.5
                                text-sm
                                font-medium
                                text-gray-800
                                break-all
                            ">
                                {field.value ||
                                    "Not provided"}
                            </p>

                        </div>

                    )
                )}

            </div>

        </section>
    );
};


export default CandidateInfo;