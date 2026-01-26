import MovieCard from "../molecules/MovieCard";

export default function MovieList({ movies = [], onDelete, onUpdate }) {
  if (!Array.isArray(movies)) {
    return <p className="text-white">Loading movies...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
