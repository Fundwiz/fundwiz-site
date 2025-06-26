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
              Nifty Analytics
            </Link>

            <Link
              to="/funding"
              style={{ marginLeft: "24px" }}
              className="text-gray-700 hover:text-blue-600"
            >
              Funding Support
            </Link>

            <Link
              to="/contact"
              style={{ marginLeft: "24px" }}
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>

            {/* Reports dropdown visible **only** to registered clients */}
            {user && user.isRegisteredClient && (
              <div className="relative group" style={{ marginLeft: "24px" }}>
                <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
                  Reports
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded hidden group-hover:block z-50">
                  <Link
                    to="/reports/latest"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Daily Report
                  </Link>
                  <Link
                    to="/reports/archive"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Archive
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>

        {/* login status */}
        {user ? (
          <div className="mt-2 flex justify-end items-center space-x-4 text-sm">
            <span className="text-gray-500">{user.email}</span>
            <button onClick={logout} className="text-red-500 hover:underline">
              Logout
            </button>
          </div>
        ) : (
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
