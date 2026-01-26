export default function SearchBar({ search, setSearch, children }) {
  return (
    <div className="w-full flex justify-center mt-4 px-4">
      <div className="w-full max-w-7xl flex flex-wrap items-center gap-4 mb-8 border-b border-white/10 pb-4">
        {/* Input Search*/}
        <div className="relative flex-1 max-w-lg min-w-[220px]">
          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white rounded-2xl py-2 pl-12 pr-4
                       border border-white/20 backdrop-blur-md shadow-lg 
                       placeholder-gray-300 focus:ring-2 focus:ring-red-500 
                       focus:outline-none transition-all duration-300"
          />

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl">
            🔍
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
