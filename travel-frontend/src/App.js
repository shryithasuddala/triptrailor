import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import TripNotes from "./TripNotes"; // 🔥 ADD

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 🔥 ADD THIS BLOCK */}
      <Route
        path="/trip-notes"
        element={
          <ProtectedRoute>
            <TripNotes />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;