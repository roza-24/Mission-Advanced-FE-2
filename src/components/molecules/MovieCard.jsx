import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { deleteMovie } from "../../store/redux/moviesSlice";
import { addFavorite } from "../../services/movieService";

export default function MovieCard({ movie, onUpdate }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteMovie(movie.id)).unwrap();
      toast.success("Delete Berhasil!");
    } catch (err) {
      console.error(err);
      toast.error("Server Error 500");
    }
  };

  const handleFavorite = async () => {
    try {
      await addFavorite({
        movieId: movie.id,
        title: movie.title,
        image: movie.image,
        year: movie.year,
        genre: movie.genre,
      });
      toast.success("Ditambahkan ke Favorites");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan favorite");
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md p-4">
      <img
        src={
          movie.image && movie.image.startsWith("http")
            ? movie.image
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-64 object-cover mb-2"
      />

      <Link to={`/movie/${movie.id}`}>
        <h3 className="font-bold text-white hover:text-red-400">
          {movie.title}
        </h3>
      </Link>
      <p className="text-sm text-gray-300 mt-1">
        {movie.year ?? "-"} • {movie.genre ?? "-"}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onUpdate(movie)}
          className="bg-blue-600 px-3 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 px-3 py-1 rounded text-sm"
        >
          Delete
        </button>

        <button
          onClick={handleFavorite}
          className="bg-pink-600 px-3 py-1 rounded text-sm"
        >
          ❤️ Favorite
        </button>
      </div>
    </div>
  );
}
