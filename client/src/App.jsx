import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import Vehicles from "./pages/Vehicles";
import Optimizations from "./pages/Optimizations";
import Dashboard from "./pages/Dashboard";
import Locations from "./pages/Locations";
import AddLocation from "./pages/AddLocation";
import NewOptimization from "./pages/NewOptimization";

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <div className="bg-black text-white overflow-hidden">
          <Navbar />
        </div>
      )}
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/addlocation" element={<AddLocation />} />
          <Route path="/optimizations" element={<Optimizations />} />
          <Route path="/optimizations/new" element={<NewOptimization />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
