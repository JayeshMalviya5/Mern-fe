import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import BikePage from "./components/BikePage";
import ERickshawPage from "./components/ERickshawPage";
import BicyclePage from "./components/BicyclePage";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<LandingPage />} />
          <Route path="/bikes" element={<BikePage />} />
          <Route path="/e-rickshaw" element={<ERickshawPage />} />
          <Route path="/bicycles" element={<BicyclePage />} />
        </Route>
      </Routes>
    </div>
  );
}
