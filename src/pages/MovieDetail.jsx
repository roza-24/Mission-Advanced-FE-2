import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getMovieById,
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../services/movieService";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(id);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // cek status favorite setelah movie ada
  useEffect(() => {
    const checkFav = async () => {
      if (!movie?.id) return;
      try {
        const res = await getFavorites();
        const exists = (res.data || []).some((f) => f?.movieId === movie.id);
        setIsFav(exists);
      } catch (e) {
        console.error(e);
      }
    };

    checkFav();
  }, [movie]);

  if (loading)
    return <p className="pt-24 text-white text-center">Loading...</p>;
  if (!movie)
    return <p className="pt-24 text-white text-center">Movie not found</p>;

  const poster =
    movie.image && String(movie.image).startsWith("http")
      ? movie.image
      : "https://via.placeholder.com/500x750?text=No+Image";

  const handleToggleFavorite = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Login dulu untuk menambahkan favorites");
      navigate("/login", { replace: true, state: { from: location.pathname } });
      return;
    }

    try {
      setFavLoading(true);

      if (isFav) {
        await removeFavorite(movie.id);
        setIsFav(false);
        toast.success("Dihapus dari Favorites");
      } else {
        await addFavorite({
          movieId: movie.id,
          title: movie.title,
          image: poster,
          year: movie.year,
          genre: movie.genre,
        });
        setIsFav(true);
        toast.success("Ditambahkan ke Favorites");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal memproses favorites");
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <div className="pt-24 px-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          ← Back to Home
        </Link>

        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
            {/* Poster */}
            <div className="w-full">
              <img
                src={poster}
                alt={movie.title}
                className="w-full h-[420px] md:h-[460px] object-cover rounded-xl border border-white/10"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                    🎬 {movie.year ?? "-"}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-200">
                    {movie.genre ?? "Unknown Genre"}
                  </span>
                </div>

                {/* Button Favorite */}
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={handleToggleFavorite}
                    disabled={favLoading}
                    className={`px-5 py-2 rounded-full font-semibold transition border
                      ${
                        isFav
                          ? "bg-pink-600/20 border-pink-400/30 text-pink-100 hover:bg-pink-600/30"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/15"
                      }
                      ${favLoading ? "opacity-60 cursor-not-allowed" : ""}
                    `}
                  >
                    {favLoading
                      ? "Processing..."
                      : isFav
                        ? "💔 Remove Favorite"
                        : "❤️ Add to Favorites"}
                  </button>

                  <Link
                    to="/favorites"
                    className="px-5 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 text-sm font-semibold"
                  >
                    Go to Favorites
                  </Link>
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <h2 className="text-lg font-bold mb-2">Synopsis</h2>
              <p className="text-gray-200 leading-relaxed">
                {movie.description?.trim()
                  ? movie.description
                  : "No description available."}
              </p>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
