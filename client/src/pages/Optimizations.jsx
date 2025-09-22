import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Optimizations() {
  const [optimizations, setOptimizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [newOptimization, setNewOptimization] = useState({
    name: "",
    vehicles: [],
    locations: [],
    preferences: {
      priority: "distance",
      avoidTolls: false,
      avoidHighways: false,
    },
  });
  const navigate = useNavigate();

  // Sample data for dropdowns
  const availableVehicles = [
    { id: 1, name: "Truck-001", capacity: 5000 },
    { id: 2, name: "Van-002", capacity: 2000 },
    { id: 3, name: "Truck-003", capacity: 7500 },
  ];

  const availableLocations = [
    { id: 1, name: "Warehouse Central", type: "warehouse" },
    { id: 2, name: "Customer A", type: "delivery" },
    { id: 3, name: "Supplier Hub", type: "pickup" },
    { id: 4, name: "Customer B", type: "delivery" },
  ];

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    setTimeout(() => {
      setOptimizations([]); // or actual API data
      setIsLoading(false); // stop loading
    }, 1000);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading optimizations...</p>
        </div>
      </div>
    );
  }

  const handleNewOptimization = () => {
    navigate("/optimizations/new");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Route Optimizations
            </h1>
            <p className="text-gray-400">
              Create and manage your route optimization tasks
            </p>
          </div>
          <button
            onClick={() => handleNewOptimization()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
          >
            New Optimization
          </button>
        </div>

        {/* Create Optimization Form */}

        {/* Optimizations List */}
        <div className="space-y-6">
          {optimizations.map((optimization) => (
            <div></div>
          ))}
        </div>

        {optimizations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No optimizations found
            </h3>
            <p className="text-gray-400 mb-6">
              Get started by creating your first route optimization.
            </p>
            <button
              onClick={() => handleNewOptimization()}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Create First Optimization
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Optimizations;
