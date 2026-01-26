import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { loginUser } from "../services/auth";

export default function Login() {
  useAuthRedirect();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    identifier: "", // bisa username atau email
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      loginUser(form.identifier, form.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-6 rounded w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="text"
          name="identifier"
          placeholder="Username / Email"
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

        <button className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
          Login
        </button>

        <p className="text-center text-sm">
          Belum punya akun?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 ml-1 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
