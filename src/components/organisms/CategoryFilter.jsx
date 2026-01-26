export default function CategoryFilter({ category, setCategory }) {
  const categories = ["All", "Action", "Drama", "Comedy", "Sci-Fi"];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition 
            ${
              category === cat
                ? "bg-red-600 text-white shadow-md"
                : "bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20"
            }
          `}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
