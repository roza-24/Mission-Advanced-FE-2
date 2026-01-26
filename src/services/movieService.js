import api from "./api";

// API CRUD (Dinamis ke MockAPI)
export const getMovies = () => api.get("/movie");
export const getMovieById = (id) => api.get(`/movie/${id}`);
export const createMovie = (movie) => api.post("/movie", movie);

export const updateMovieApi = (id, movie) => api.put(`/movie/${id}`, movie);
export const deleteMovieApi = (id) => api.delete(`/movie/${id}`);

// FAVORITES (LocalStorage Logic)
const FAVORITES_KEY = "movie_favorites";
export const getFavorites = () => {
  const data = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  return Promise.resolve({ data });
};

export const addFavorite = (movie) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  if (!favorites.find((f) => f.movieId === movie.movieId)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, movie]));
  }
  return Promise.resolve({ data: movie });
};

export const removeFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  const updated = favorites.filter((m) => m.movieId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return Promise.resolve({ data: id });
};