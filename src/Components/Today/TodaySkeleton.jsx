const TodaySkeleton = () => {
    return (
        <div className="w-170 h-55 rounded-xl animate-pulse bg-[#25253D] flex flex-col items-center justify-center gap-1">
      
            <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>

            <span className="text-sm text-gray-400 mt-2">Loading...</span>
        </div>
    )
};

export default TodaySkeleton;