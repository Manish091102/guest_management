// Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Import your Dashboard component
import App from "./App"; // Import your main App component
import InvitationResponse from "./components/Invitation";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/invitation/:invitationId" element={<InvitationResponse />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default RoutesComponent;
