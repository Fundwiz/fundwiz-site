// src/pages/DailyReport.jsx  (simplified)
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

export default function DailyReport() {
  const { date } = useParams();               // 'latest'   or 'YYYY-MM-DD'
  const today = new Date().toISOString().slice(0, 10);
  const reportDate = date === "latest" ? today : date;

  const [html, setHtml] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/reports/${reportDate}/${reportDate.replace(/-/g, "_")}.html`)
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then(setHtml)
      .catch(() => setNotFound(true));
  }, [reportDate]);

  if (notFound) return <Navigate to="/reports/archive" replace />;

  return (
    <div className="max-w-4xl mx-auto p-6 prose">
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p>Loading report…</p>
      )}
    </div>
  );
}
