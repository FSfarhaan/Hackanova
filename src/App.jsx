import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import FeelSafe from "./FeelSafe";
import SendEmergencySOS from "./SendEmergencySOS";
import MapsTest from "./MapPages"
import DMartDetails from "./DmartDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feelsafe" element={<FeelSafe />} />
        <Route path="/sos" element={<SendEmergencySOS />} />
        <Route path="/maps" element={<MapsTest />} />
        <Route path="/dmartdetails" element={<DMartDetails />} /> {/* Catch all route */}
      </Routes>
    </Router>
  );
};

export default App;
