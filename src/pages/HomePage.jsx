export default function HomePage() {
  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="bg-gradient-to-br from-blue-100 to-blue-50 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          Smarter Nifty Analytics
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Live options data, real-time insights, and startup capital support —
          all in one platform.
        </p>
        <button className="mt-8 px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
          Explore Analytics
        </button>
      </section>

      {/* ───────── PLACEHOLDER ───────── */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">
            📊 Nifty Options Tools
          </h3>
          <p className="text-gray-600">
            Real-time data tools and funding dashboard will appear here.
          </p>
        </div>
      </section>
    </>
  );
}
