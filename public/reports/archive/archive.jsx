import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Archive component to list all past report dates
export default function Archive() {
  const [reportDates, setReportDates] = useState([]);

  useEffect(() => {
    // Fetch the JSON manifest of report dates
    fetch('/reports/index.json')
      .then((res) => res.json())
      .then((data) => {
        // Sort dates in descending order
        const sorted = data.dates.sort((a, b) => (a < b ? 1 : -1));
        setReportDates(sorted);
      })
      .catch((err) => console.error('Error loading report dates:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Past Nifty Reports Archive</h2>
      {reportDates.length === 0 ? (
        <p>No archived reports available.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {reportDates.map((date) => (
            <li key={date}>
              <Link
                to={`/reports/${date}`}
                className="text-blue-600 hover:underline"
              >
                {date}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
