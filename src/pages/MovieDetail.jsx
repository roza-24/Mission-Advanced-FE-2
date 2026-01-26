import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieService";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-white">Loading...</p>;
  if (!movie) return <p className="text-white">Movie not found</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
      <img src={movie.image} alt={movie.title} className="w-64 mb-4" />
      <p>{movie.description}</p>
    </div>
  );
}
