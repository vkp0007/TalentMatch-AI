const UploadButton = ({ loading }) => {

    return (

        <button
            type="submit"
            disabled={loading}
            className="

            w-full
            bg-slate-900
            hover:bg-slate-800
            text-white
            transition-all
            duration-300
            py-5
            rounded-2xl
            font-medium
            text-lg

            "
        >

            {
                loading
                ?
                "Uploading Resume..."
                :
                "Upload Resume"
            }

        </button>
    );
};

export default UploadButton;