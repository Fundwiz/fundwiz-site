import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* brand + nav */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            <Link to="/">Fundwiz</Link>
          </h1>

          <nav className="flex text-sm font-medium items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            <Link
              to="/analytics"
              style={{ marginLeft: "24px" }}
              className="text-gray-700 hover:text-blue-600"
            >
              Nifty&nbsp;Analytics
            </Link>

            <Link
              to="/funding"
              style={{ marginLeft: "24px" }}
              className="text-gray-700 hover:text-blue-600"
            >
              Funding&nbsp;Support
            </Link>

            <Link
              to="/contact"
              style={{ marginLeft: "24px" }}
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>

            {/* Daily Nifty Report link */}
            <a
              href="/reports/2025-06-26/26_06_25.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "24px" }}
              className="text-gray-700 hover:text-blue-600"
            >
              Daily Nifty Report
            </a>
          </nav>
        </div>

        {/* login status */}
        {user && (
          <div className="mt-2 flex justify-end items-center space-x-4 text-sm">
            <span className="text-gray-500">{user.email}</span>
            <button
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        )}

        {!user && (
          <div className="mt-2 flex justify-end">
            <Link to="/auth" className="text-blue-600 hover:underline text-sm">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
