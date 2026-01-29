import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      .then((res) => setFavorites(res.data || []))
      .catch(() => toast.error("Gagal memuat favorites"))
      .finally(() => setLoading(false));
  };

  const handleRemove = async (id) => {
    try {
      await removeFavorite(id);
      toast.success("Dihapus dari Favorites");
      setFavorites((prev) => prev.filter((f) => f?.movieId !== id));
    } catch {
      toast.error("Gagal menghapus favorite");
    }
  };

  if (loading) {
    return <p className="pt-24 text-white text-center">Loading...</p>;
  }

  return (
    <div className="pt-24 px-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold">My Favorites</h1>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full
                       bg-white/10 border border-white/20 hover:bg-white/15 transition
                       text-sm font-semibold"
          >
            ← Back to Home
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-xl font-bold">Belum ada favorite</p>
            <p className="text-gray-300 mt-2">
              Tambahkan film favorit dari halaman Home atau Detail film.
            </p>
            <Link
              to="/"
              className="inline-flex mt-6 px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 transition font-semibold"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {favorites.filter(Boolean).map((movie) => {
                const poster =
                  movie?.image && String(movie.image).startsWith("http")
                    ? movie.image
                    : "https://via.placeholder.com/500x750?text=No+Image";

                return (
                  <div
                    key={movie.movieId}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <div className="relative">
                      <img
                        src={poster}
                        alt={movie.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    <div className="p-4">
                      <Link to={`/movie/${movie.movieId}`}>
                        <h3
                          className="text-white font-bold text-lg line-clamp-1
               hover:text-red-400 hover:underline transition cursor-pointer"
                        >
                          {movie.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-300 mt-1">
                        {movie.year ?? "-"} • {movie.genre ?? "-"}
                      </p>

                      <button
                        onClick={() => handleRemove(movie.movieId)}
                        className="mt-4 w-full bg-red-600 hover:bg-red-700 transition
                                   px-3 py-2 rounded-lg text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
