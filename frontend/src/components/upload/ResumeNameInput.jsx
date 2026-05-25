const ResumeNameInput = ({
    resumeName,
    setResumeName
}) => {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-700 mb-3">
                Resume Name
            </label>


            <input
                type="text"
                placeholder="Frontend Developer Resume"
                value={resumeName}
                onChange={(e) =>
                    setResumeName(
                        e.target.value
                    )
                }
                className="

                w-full
                bg-white
                border
                border-slate-300
                focus:border-slate-900
                outline-none
                transition-all
                duration-300
                rounded-2xl
                px-5
                py-4
                text-slate-900
                placeholder:text-slate-400

                "
            />

        </div>
    );
};

export default ResumeNameInput;