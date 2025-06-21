import { Routes, Route } from "react-router-dom";

import Navbar  from "./components/Navbar";
import Footer  from "./components/Footer";

import HomePage       from "./pages/HomePage";
import AnalyticsPage  from "./pages/AnalyticsPage";
import FundingPage    from "./pages/FundingPage";
import ContactPage    from "./pages/ContactPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* -------- Page content switches here -------- */}
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/funding"   element={<FundingPage />} />
        <Route path="/contact"   element={<ContactPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
