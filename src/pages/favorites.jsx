import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/movieService";
import toast from "react-hot-toast";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    setLoading(true);
    getFavorites()
      .then((res) => setFavorites(res.data))
      .catch(() => toast.error("Gagal memuat favorites"))
      .finally(() => setLoading(false));
  };

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id);
      toast.success("Dihapus dari Favorites");
      setFavorites((prev) => prev.filter((f) => f.movieId !== id));
    } catch {
      toast.error("Gagal menghapus favorite");
    }
  };

  if (loading)
    return <p className="pt-24 text-white text-center">Loading...</p>;

  return (
    <div className="pt-24 max-w-7xl mx-auto px-6">
      <h1 className="text-2xl text-white mb-6">My Favorites</h1>

      {favorites.length === 0 && (
        <p className="text-gray-400">Belum ada favorite</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.filter(Boolean).map((movie) => (
          <div
            key={movie.movieId}
            className="bg-gray-800 rounded-xl overflow-hidden p-3"
          >
            <img src={movie.image} className="w-full h-48 object-cover" />
            <h3 className="text-white mt-2">{movie.title}</h3>

            <button
              onClick={() => handleRemove(movie.movieId)}
              className="mt-3 bg-red-600 px-3 py-1 rounded text-sm text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
