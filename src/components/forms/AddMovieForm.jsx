// src/components/forms/AddMovieForm.jsx
import { useState, useEffect } from "react";
import { createMovie, updateMovieApi } from "../../services/movieService";
import { toast } from "react-hot-toast";

export default function AddMovieForm({
  onSuccess,
  onAdd,
  onUpdate,
  editingMovie,
}) {
  const [formData, setFormData] = useState({
    title: "",
    genre: "Action",
    year: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title || "",
        genre: editingMovie.genre || "Action",
        year: editingMovie.year || "",
        image: editingMovie.image || "",
        description: editingMovie.description || "",
      });
    }
  }, [editingMovie]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: String(formData.title),
      genre: String(formData.genre || "Action"),
      year: Number(formData.year),
      image: String(formData.image),
      description: String(formData.description),
    };

    try {
      if (editingMovie) {
        await updateMovieApi(editingMovie.id, payload);
      } else {
        await createMovie(payload);
      }
      onSuccess();
    } catch (err) {
      console.error("ALASAN ERROR 500:", err.response?.data);
      toast.error("Gagal memproses data ke server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl border border-white/10 max-w-4xl mx-auto my-6"
    >
      <h2 className="text-white text-xl font-bold mb-4">
        {editingMovie ? "Edit Film" : "Add Film"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="bg-gray-800 text-white p-3 rounded border border-gray-700"
          placeholder="Judul Film"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <select
          className="bg-gray-800 text-white p-3 rounded border border-gray-700"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        >
          <option>Action</option>
          <option>Comedy</option>
          <option>Drama</option>
          <option>Sci-Fi</option>
          <option>Crime</option>
        </select>
        <input
          className="bg-gray-800 text-white p-3 rounded border border-gray-700"
          placeholder="Tahun Rilis"
          type="number"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        />
        <input
          className="bg-gray-800 text-white p-3 rounded border border-gray-700"
          placeholder="URL Gambar"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </div>
      <textarea
        className="bg-gray-800 text-white p-3 rounded border border-gray-700 w-full mt-4"
        placeholder="Deskripsi Film"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>
      <button
        type="submit"
        className="w-full mt-4 bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700"
      >
        {editingMovie ? "Save" : "Create"}
      </button>
    </form>
  );
}
