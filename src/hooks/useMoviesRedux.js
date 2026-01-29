import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMovies,
  addMovie,
  editMovie,
  deleteMovie,
} from "../store/redux/moviesSlice";

export default function useMoviesRedux() {
  const dispatch = useDispatch();

  // Ambil state dari Redux
  const { items: movies, loading, error } = useSelector(
    (state) => state.movies
  );

  // Get data saat pertama kali dipakai
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleAddMovie = (payload) => dispatch(addMovie(payload));
  const handleEditMovie = (id, payload) =>
    dispatch(editMovie({ id, payload }));
  const handleDeleteMovie = (id) => dispatch(deleteMovie(id));

  return {
    movies,
    loading,
    error,
    addMovie: handleAddMovie,
    editMovie: handleEditMovie,
    deleteMovie: handleDeleteMovie,
  };
}
