const AnalysisForm = ({
    targetRole,
    setTargetRole,
    jobDescription,
    setJobDescription,
    handleAnalyze,
    loading,
    error
}) => {

    return (

        <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-10">

            {
                error && (

                    <div className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-2xl mb-6">

                        {error}

                    </div>
                )
            }

            <form
                onSubmit={handleAnalyze}
                className="space-y-8"
            >

                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-3">
                        Target Role
                    </label>

                    <input
                        type="text"
                        placeholder="Frontend Developer"
                        value={targetRole}
                        onChange={(e) =>
                            setTargetRole(
                                e.target.value
                            )
                        }
                        className="w-full bg-white border border-slate-300 focus:border-slate-900 outline-none rounded-2xl px-5 py-4 text-slate-900"
                    />

                </div>


                <div>

                    <label className="block text-sm font-medium text-slate-700 mb-3">
                        Job Description
                    </label>

                    <textarea
                        rows="12"
                        placeholder="Paste job description here..."
                        value={jobDescription}
                        onChange={(e) =>
                            setJobDescription(
                                e.target.value
                            )
                        }
                        className="w-full bg-white border border-slate-300 focus:border-slate-900 outline-none rounded-2xl px-5 py-4 text-slate-900 resize-none"
                    />

                </div>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-medium text-lg"
                >

                    {
                        loading
                        ?
                        "Running AI Analysis..."
                        :
                        "Analyze Resume"
                    }

                </button>

            </form>

        </div>
    );
};

export default AnalysisForm;