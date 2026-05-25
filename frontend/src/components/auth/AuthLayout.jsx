const AuthLayout = ({

    children,
    title,
    subtitle

}) => {

    return (

        <div
            className="min-h-screen bg-slate-50 grid grid-cols-1 lg:grid-cols-2"
        >

            {/* ================================================= */}
            {/* LEFT SECTION */}
            {/* ================================================= */}

            <div
                className="hidden lg:flex flex-col justify-center px-20 border-r border-slate-200 bg-white"
            >

                <div
                    className="max-w-2xl"
                >

                    {/* Label */}

                    <p
                        className="text-slate-500 font-medium mb-6 tracking-wide uppercase text-sm"
                    >
                        AI Resume Intelligence
                    </p>


                    {/* Heading */}

                    <h1
                        className="text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-8"
                    >
                        Optimize resumes with intelligent ATS analysis
                    </h1>


                    {/* Description */}

                    <p
                        className="text-slate-500 text-lg leading-relaxed max-w-xl"
                    >
                        Upload resumes, compare them against job descriptions,
                        calculate ATS scores, and receive AI-powered recommendations.
                    </p>


                    {/* Features */}

                    <div
                        className="mt-16 space-y-6"
                    >

                        <div
                            className="flex items-center gap-4"
                        >

                            <div
                                className="w-2 h-2 rounded-full bg-slate-900"
                            />

                            <p
                                className="text-slate-700 text-lg"
                            >
                                AI-powered ATS scoring
                            </p>

                        </div>


                        <div
                            className="flex items-center gap-4"
                        >

                            <div
                                className="w-2 h-2 rounded-full bg-slate-900"
                            />

                            <p
                                className="text-slate-700 text-lg"
                            >
                                Semantic resume matching
                            </p>

                        </div>


                        <div
                            className="flex items-center gap-4"
                        >

                            <div
                                className="w-2 h-2 rounded-full bg-slate-900"
                            />

                            <p
                                className="text-slate-700 text-lg"
                            >
                                AI-generated resume recommendations
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* RIGHT SECTION */}
            {/* ================================================= */}

            <div
                className="flex items-center justify-center px-6 py-12"
            >

                <div
                    className="w-full max-w-md"
                >

                    {/* Brand */}

                    <div
                        className="mb-12"
                    >

                        <h2
                            className="text-4xl font-bold tracking-tight text-slate-900"
                        >
                            TalentMatch
                        </h2>

                        <p
                            className="text-slate-500 mt-3 text-lg"
                        >
                            {subtitle}
                        </p>

                    </div>


                    {/* Form Card */}

                    <div
                        className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
                    >

                        <h3
                            className="text-3xl font-bold tracking-tight text-slate-900 mb-8"
                        >
                            {title}
                        </h3>


                        {children}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AuthLayout;