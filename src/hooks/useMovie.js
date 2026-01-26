// src/hooks/useMovie.js
import { useState, useEffect } from "react";
import * as movieService from "../services/movieService";
import toast from "react-hot-toast";

// src/hooks/useMovie.js
export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await movieService.getMovies();
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const addMovie = async (movie) => {
    try {
      const res = await movieService.createMovie(movie);
      setMovies((prev) => [...prev, res.data]);
      toast.success("Movie added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Server Error 500: Check format data Anda");
    }
  };

  const updateMovie = async (id, updatedData) => {
    try {
      // Panggil updateMovieApi dari service
      const res = await movieService.updateMovieApi(id, updatedData);
      setMovies((prev) => prev.map((m) => (m.id === id ? res.data : m)));
      toast.success("Update Berhasil!");
    } catch (err) {
      console.error(err);
      toast.error("Server Error 500: Cek format data Anda");
    }
  };

  const deleteMovie = async (id) => {
    try {
      await movieService.deleteMovieApi(id);
      setMovies((prev) => prev.filter((m) => m.id !== id));
      toast.success("Delete Berhasil!");
    } catch (err) {
      console.error(err);
      toast.error("Server Error 500");
    }
  };

  return { movies, loading, addMovie, updateMovie, deleteMovie };
}
