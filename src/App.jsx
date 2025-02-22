import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import FeelSafe from "./FeelSafe";
import SendEmergencySOS from "./SendEmergencySOS";
import MapsTest from "./MapPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feelsafe" element={<FeelSafe />} />
        <Route path="/sos" element={<SendEmergencySOS />} />
        <Route path="/maps" element={<MapsTest />} />
      </Routes>
    </Router>
  );
};

export default App;
