import DropdownPortal from "./DropdownPortal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="container mx-auto flex navbar-footer-style">
      <div className="flex gap-6">
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-100 transition">
          Home
        </Link>
        <Link to="/matches" className="text-xl font-bold text-white hover:text-gray-100 transition">
          Partidos
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none text-white hover:text-gray-100 transition"
        >
          <FaUserCircle className="text-2xl" />
          <span className="hidden md:inline">
            {user ? user.name : "Cuenta"}
          </span>
        </button>

        {dropdownOpen && (
          <DropdownPortal>
            <div className="w-48 bg-white text-gray-800 rounded shadow-lg">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Mi perfil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </DropdownPortal>
        )}
      </div>
    </nav>
  );
}
