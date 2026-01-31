import { useState } from "react";

const SearchBar = ({ city, setCity, cache, onSearch }) => {
    const [showSuggest, setShowSuggest] = useState(false);

    return (
        <section>
            <h2 className="font-[Bricola] font-semibold text-4xl text-center mt-15">How's the sky looking today?</h2>

            <form className="flex flex-col sm:flex-row items-center place-content-center gap-3 mt-15" onSubmit={(e) => {
                e.preventDefault();
                onSearch(city);
            }}>
                <div className="relative">
                <img src="./assets/images/icon-search.svg" alt="search"className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70"/>

                <input type="text" value={city} placeholder="Search for a place..." className="w-70 mm:w-100 sm:w-80 h-11 pl-11 pr-4 rounded-lg bg-[#2A2A44] text-white text-sm placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setCity(e.target.value)} onFocus={() => {
                    if(cache.current.length > 0) (
                    setShowSuggest(true)
                    )
                }} onBlur={() => {
                    setTimeout(() => setShowSuggest(false), 120);
                }}/>

                {showSuggest && cache.current.length > 0 && (
                    <div className="absolute mt-2 w-full bg-[#2A2A44] rounded-lg   z-50">
                    {cache.current.map((name, index) => (
                        <div
                        key={index}
                        className="px-4 py-2 hover:bg-[#32325A] hover:rounded-lg cursor-pointer"
                        onClick={() => {
                            setCity(name);
                            setShowSuggest(false);
                        }}
                        >
                        {name}
                        </div>
                    ))}
                    </div>
                )}

                </div>

                <button type="submit" className="w-70 sm:w-25 h-11 px-6 rounded-lg bg-linear-to-r from-indigo-500 to-blue-500 text-white font-medium hover:opacity-90 cursor-pointer">
                Search
                </button>
            </form>
        </section>
    )
};

export default SearchBar;