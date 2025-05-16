const Loading = () => {
    return (
        <div className="flex items-center">
            <svg
                className="animate-spin h-6 w-6 text-gray-500 mr-2"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Loading...</span>
        </div>
    )
}

export default Loading