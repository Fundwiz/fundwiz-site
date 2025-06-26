// src/pages/Archive.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Shows a list of all available report folders from /reports/index.json.
 */
export default function Archive() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch("/reports/index.json")
      .then((res) => res.json())
      .then((data) => setDates(data.dates || []))
      .catch(() => setDates([]));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Past Reports Archive</h2>
      <ul className="list-disc list-inside space-y-2">
        {dates.map((d) => (
          <li key={d}>
            <Link
              to={`/reports/${d}`}
              className="text-blue-600 hover:underline"
            >
              {d}
            </Link>
          </li>
        ))}
        {dates.length === 0 && <p>No archived reports yet.</p>}
      </ul>
    </div>
  );
}
