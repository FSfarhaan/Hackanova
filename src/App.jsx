import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import FeelSafe from "./FeelSafe";
import SendEmergencySOS from "./SendEmergencySOS";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feelsafe" element={<FeelSafe />} />
        <Route path="/sos" element={<SendEmergencySOS />} />
      </Routes>
    </Router>
  );
};

export default App;
