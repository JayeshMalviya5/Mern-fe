import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import BikePage from "./components/BikePage";
import ERickshawPage from "./components/ERickshawPage";
import CarPage from "./components/CarPage";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage mode="login" />} />
        <Route path="/signup" element={<LoginPage mode="signup" />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/bikes" element={<BikePage />} />
          <Route path="/cars" element={<CarPage />} />
          <Route path="/e-rickshaw" element={<ERickshawPage />} />
        </Route>
      </Routes>
    </div>
  );
}
