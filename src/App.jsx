import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

import CuttingPage from "./pages/CuttingPage";
import FormulaPage from "./pages/FormulaPage";
import ThreadCalcPage from "./pages/ThreadCalcPage";
import TolerancePage from "./pages/TolerancePage";
import TorquePage from "./pages/TorquePage";
import ScrewFinderPage from "./pages/ScrewFinderPage";
import FeedbackPage from "./pages/FeedbackPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="text-center py-6 bg-white shadow-md">
          <h1 className="text-3xl font-bold text-[#004998]">🔧 Der Mechaniker</h1>
          <nav className="flex justify-center flex-wrap gap-2 mt-4 text-sm font-medium text-[#004998]">
            <NavLink to="/" className="px-4 py-2 rounded hover:bg-blue-100" end>Formeln</NavLink>
            <NavLink to="/cutting" className="px-4 py-2 rounded hover:bg-blue-100">Drehzahlen</NavLink>
            <NavLink to="/threads" className="px-4 py-2 rounded hover:bg-blue-100">Gewinde</NavLink>
            <NavLink to="/tolerances" className="px-4 py-2 rounded hover:bg-blue-100">Toleranzen</NavLink>
            <NavLink to="/torque" className="px-4 py-2 rounded hover:bg-blue-100">Drehmomente</NavLink>
            <NavLink to="/screwfinder" className="px-4 py-2 rounded hover:bg-blue-100">Schraubenschlüssel</NavLink>
            <NavLink to="/feedback" className="px-4 py-2 rounded hover:bg-blue-100">Feedback</NavLink>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<FormulaPage />} />
            <Route path="/cutting" element={<CuttingPage />} />
            <Route path="/threads" element={<ThreadCalcPage />} />
            <Route path="/tolerances" element={<TolerancePage />} />
            <Route path="/torque" element={<TorquePage />} />
            <Route path="/screwfinder" element={<ScrewFinderPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
