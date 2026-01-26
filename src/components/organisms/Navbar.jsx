import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition ${
          isScrolled ? "bg-black/90 shadow-lg" : "bg-black/40 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="text-3xl font-extrabold text-red-500">
            Chill
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8 text-white">
            <Link to="/" className="hover:text-red-400">
              Home
            </Link>

            <Link to="/favorites" className="hover:text-red-400">
              My Favorites
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/95 text-white z-[60]
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <span className="text-2xl font-bold text-red-500">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/favorites" onClick={() => setMenuOpen(false)}>
            My Favorites
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-600 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-red-600 py-2 rounded-full text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
