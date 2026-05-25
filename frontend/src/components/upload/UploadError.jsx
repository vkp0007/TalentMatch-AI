const UploadError = ({ error }) => {

    if (!error) return null;

    return (

        <div className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-2xl mb-6">

            {error}

        </div>
    );
};

export default UploadError;