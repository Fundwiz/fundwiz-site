import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* brand */}
        <h1 className="text-2xl font-bold text-blue-700">
          <Link to="/">Fundwiz</Link>
        </h1>

        {/* links with explicit left-margin for rock-solid spacing */}
        <nav className="flex text-sm font-medium">
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
        </nav>
      </div>
    </header>
  );
}
