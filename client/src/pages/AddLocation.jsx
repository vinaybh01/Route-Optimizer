import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";

function AddLocation() {
  const [newLocation, setNewLocation] = useState({
    name: "",
    type: "warehouse",
    address: "",
    coordinates: {
      lat: "",
      lng: "",
    },
    status: "active",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Enhanced console logging
      console.log("🎯 Action: Location successfully added to the system");
      // Also save to localStorage for persistence
      const existingLocations = JSON.parse(
        localStorage.getItem("locations") || "[]"
      );
      const locationWithId = {
        ...newLocation,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      existingLocations.push(locationWithId);
      localStorage.setItem("locations", JSON.stringify(existingLocations));

      setIsLoading(false);
      // Navigate back to locations page
      navigate("/locations");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/locations");
  };

  const handleLocationSelect = (latitude, longitude) => {
    setLat(latitude);
    setLon(longitude);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Locations</span>
          </button>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Add New Location
          </h1>
          <p className="text-gray-300 text-lg">
            Create a new pickup or delivery location
          </p>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location Name *
                </label>
                <input
                  type="text"
                  required
                  value={newLocation.name}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="e.g., Central Warehouse"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location Type *
                </label>
                <select
                  value={newLocation.type}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, type: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent [&>option]:bg-gray-800 [&>option]:text-white"
                >
                  <option value="warehouse">Warehouse</option>
                  <option value="delivery">Delivery Point</option>
                </select>
              </div>
            </div>

            <div>
              <MapComponent onLocationSelect={handleLocationSelect} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address *
              </label>
              <textarea
                required
                value={newLocation.address}
                onChange={(e) =>
                  setNewLocation({ ...newLocation, address: e.target.value })
                }
                rows="3"
                className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                placeholder="Enter the full address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Latitude *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={lat}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      coordinates: {
                        ...newLocation.coordinates,
                        lat: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="e.g., 40.7128"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Longitude *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={newLocation.coordinates.lng}
                  onChange={(e) =>
                    setNewLocation({
                      ...newLocation,
                      coordinates: {
                        ...newLocation.coordinates,
                        lng: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="e.g., -74.0060"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={newLocation.status}
                onChange={(e) =>
                  setNewLocation({ ...newLocation, status: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Adding Location...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Location</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLocation;
