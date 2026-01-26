import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isStrongPassword } from "../utils/validators";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function Register() {
  useAuthRedirect();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!isStrongPassword(form.password)) {
      setError(
        "Password harus min 8 karakter, mengandung huruf besar, angka, dan simbol."
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (u) => u.username === form.username || u.email === form.email
    );
    if (exists) {
      setError("Username atau email sudah terdaftar");
      return;
    }

    const newUsers = [...users, form];
    localStorage.setItem("users", JSON.stringify(newUsers));

    alert("Register berhasil! Silakan login.");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-900 p-6 rounded w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 rounded bg-gray-700"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700"
          onChange={handleChange}
          required
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700"
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-blue-300"
          >
            {showPass ? "Hide" : "Show"}
          </span>
        </div>

        <button className="w-full bg-green-500 p-2 rounded hover:bg-green-600">
          Register
        </button>

        <p className="text-center text-sm">
          Sudah punya akun?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 ml-1 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
