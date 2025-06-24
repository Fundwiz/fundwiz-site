import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import FundingPage from "./pages/FundingPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoute"; // ✅ New import

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* 🔒 Protected Routes */}
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/funding"
          element={
            <PrivateRoute>
              <FundingPage />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
