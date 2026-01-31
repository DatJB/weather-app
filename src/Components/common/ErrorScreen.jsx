const ErrorScreen = ({ onRetry }) => {
  return (
    <section className="-mt-100">
      <div className="w-full h-300 flex flex-col items-center justify-center text-center gap-4">
        
        <div className="text-gray-400 text-3xl"><img src="/assets/images/icon-error.svg" className="w-8 h-8"/></div>

        <h2 className="text-4xl font-[Bricola] font-semibold text-white">
          Something went wrong
        </h2>

        <p className="text-sm text-gray-400 max-w-sm">
          We couldn't connect to the server (API error).
          Please try again in a few moments.
        </p>

        <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2f2f4a] text-white text-sm hover:bg-[#3a3a5c] cursor-pointer transition"
        >
          <span><img src="/assets/images/icon-retry.svg" /></span> Retry
        </button>
      </div>
    </section>
  );
};

export default ErrorScreen;