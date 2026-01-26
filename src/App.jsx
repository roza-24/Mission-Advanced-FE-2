import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/organisms/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";

import MoviesData from "./data/movies";

export default function App() {
  const [movies, setMovies] = useState(MoviesData);
  const user = localStorage.getItem("user");

  return (
    <>
      <Toaster />
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* HOME */}
        <Route
          path="/"
          element={<Home movies={movies} setMovies={setMovies} />}
        />

        {/* DETAIL */}
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />

        {/* PROTECTED */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
