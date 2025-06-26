import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import FundingPage from "./pages/FundingPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import Archive from "./pages/Archive";
import DailyReport from "./pages/DailyReport";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected */}
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

        {/* Reports */}
        <Route
          path="/reports/:date"
          element={
            <PrivateRoute>
              <DailyReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/archive"
          element={
            <PrivateRoute>
              <Archive />
            </PrivateRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
