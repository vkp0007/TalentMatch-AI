const ErrorState = ({ error }) => {

    return (

        <div className="bg-red-50 border border-red-200 text-red-500 rounded-3xl p-6">

            {error}

        </div>
    );
};

export default ErrorState;