import { useState } from "react";
import useMovies from "../hooks/useMovie";
import MovieList from "../components/organisms/MovieList";
import AddMovieForm from "../components/forms/AddMovieForm";

export default function Home() {
  const { movies, loading, addMovie, updateMovie, deleteMovie } = useMovies();
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  if (loading)
    return <div className="text-white text-center pt-32">Loading...</div>;

  return (
    <div className="pt-24 px-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-white text-black px-6 py-2 rounded-full font-bold"
        >
          {showForm ? "Cancel" : "+ Add Film"}
        </button>
      </div>

      {showForm && (
        <AddMovieForm
          onAdd={addMovie}
          onUpdate={updateMovie}
          editingMovie={editingMovie}
          onSuccess={handleCloseForm}
        />
      )}

      <MovieList movies={movies} onDelete={deleteMovie} onUpdate={handleEdit} />
    </div>
  );
}
