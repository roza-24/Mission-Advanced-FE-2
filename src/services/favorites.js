export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function addFavorite(movie) {
  const favs = getFavorites();
  if (!favs.find((m) => m.id === movie.id)) {
    favs.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  const favs = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(id) {
  const favs = getFavorites();
  return favs.some((m) => m.id === id);
}

