const EmptyState = ({
    title,
    description
}) => {

    return (

        <div className="bg-white border border-slate-200 rounded-3xl py-24 px-10 text-center">

            <h3 className="text-3xl font-bold text-slate-900">
                {title}
            </h3>

            <p className="text-slate-500 mt-4">
                {description}
            </p>

        </div>
    );
};

export default EmptyState;