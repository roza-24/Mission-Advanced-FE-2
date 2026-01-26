import { Link } from "react-router-dom";
import { addFavorite } from "../../services/movieService";
import toast from "react-hot-toast";

export default function MovieCard({ movie, onUpdate, onDelete }) {
  const handleFavorite = async () => {
    try {
      await addFavorite({
        movieId: movie.id,
        title: movie.title,
        image: movie.image,
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

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onUpdate(movie)}
          className="bg-blue-600 px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(movie.id)}
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
