import { useState } from "react";

import MovieList from "../components/organisms/MovieList";
import AddMovieForm from "../components/forms/AddMovieForm";
import useMoviesRedux from "../hooks/useMoviesRedux";

export default function Home() {
  const { movies, loading, error, addMovie, editMovie, deleteMovie } =
    useMoviesRedux();

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

  if (error)
    return (
      <div className="text-red-400 text-center pt-32">{String(error)}</div>
    );

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
          editingMovie={editingMovie}
          onSuccess={handleCloseForm}
          onAdd={addMovie}
          onUpdate={editMovie}
        />
      )}

      <MovieList movies={movies} onUpdate={handleEdit} onDelete={deleteMovie} />
    </div>
  );
}
