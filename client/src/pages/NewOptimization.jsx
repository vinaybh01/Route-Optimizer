import React, { useEffect, useState } from "react";
import Vehicles from "./Vehicles";

function NewOptimization() {
  const [vehicles, setVehicles] = useState([]);
  const [selectVehical, setSelectVehical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [optimizationName, setOptimizationName] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const algorithms = [
    { id: 1, name: "Dijkstra's Algorithm", description: "Shortest path first" },
    {
      id: 2,
      name: "A* Search Algorithm",
      description: "Heuristic-based search",
    },
    {
      id: 3,
      name: "Ant Colony Optimization",
      description: "Probabilistic technique",
    },
    {
      id: 4,
      name: "Genetic Algorithm",
      description: "Evolutionary-based search",
    },
    {
      id: 5,
      name: "Simulated Annealing",
      description: "Probabilistic metaheuristic",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setVehicles([
        {
          id: 1,
          name: "Heavy Duty Truck",
          type: "truck",
          capacity: 5000,
          fuelType: "diesel",
          status: "active",
          licensePlate: "ABC-123",
          model: "Freightliner Cascadia",
          year: "2022",
          mileage: 45000,
          lastService: "2024-01-15",
        },
        {
          id: 2,
          name: "Delivery Van",
          type: "van",
          capacity: 2000,
          fuelType: "petrol",
          status: "active",
          licensePlate: "XYZ-789",
          model: "Ford Transit",
          year: "2023",
          mileage: 12000,
          lastService: "2024-02-01",
        },
        {
          id: 3,
          name: "Cargo Truck",
          type: "truck",
          capacity: 7500,
          fuelType: "diesel",
          status: "maintenance",
          licensePlate: "DEF-456",
          model: "Volvo FH16",
          year: "2021",
          mileage: 78000,
          lastService: "2024-01-20",
        },
        {
          id: 4,
          name: "Electric Van",
          type: "van",
          capacity: 1500,
          fuelType: "electric",
          status: "active",
          licensePlate: "GHI-012",
          model: "Mercedes eSprinter",
          year: "2024",
          mileage: 5000,
          lastService: "2024-02-10",
        },
        {
          id: 5,
          name: "Delivery Bike",
          type: "motorcycle",
          capacity: 50,
          fuelType: "petrol",
          status: "active",
          licensePlate: "JKL-345",
          model: "Honda CB150",
          year: "2023",
          mileage: 15000,
          lastService: "2024-01-25",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (step === 2) {
      setLocationsLoading(true);
      setTimeout(() => {
        setLocations([
          {
            id: 1,
            name: "Warehouse Central",
            type: "warehouse",
            address: "123 Industrial Blvd, City Center",
            coordinates: { lat: 40.7128, lng: -74.006 },
          },
          {
            id: 2,
            name: "Store Downtown",
            type: "store",
            address: "456 Main St, Downtown",
            coordinates: { lat: 40.7138, lng: -74.005 },
          },
          {
            id: 3,
            name: "Distribution Center",
            type: "distribution",
            address: "789 Logistics Ave, Suburb",
            coordinates: { lat: 40.7148, lng: -74.004 },
          },
          {
            id: 4,
            name: "Customer Hub",
            type: "hub",
            address: "101 Customer Rd, Uptown",
            coordinates: { lat: 40.7158, lng: -74.003 },
          },
          {
            id: 5,
            name: "Warehouse Central",
            type: "warehouse",
            address: "123 Industrial Blvd, City Center",
            coordinates: { lat: 40.7128, lng: -74.006 },
          },
          {
            id: 6,
            name: "Store Downtown",
            type: "store",
            address: "456 Main St, Downtown",
            coordinates: { lat: 40.7138, lng: -74.005 },
          },
          {
            id: 7,
            name: "Distribution Center",
            type: "distribution",
            address: "789 Logistics Ave, Suburb",
            coordinates: { lat: 40.7148, lng: -74.004 },
          },
          {
            id: 8,
            name: "Customer Hub",
            type: "hub",
            address: "101 Customer Rd, Uptown",
            coordinates: { lat: 40.7158, lng: -74.003 },
          },
        ]);
        setLocationsLoading(false);
      }, 1000);
    }
  }, [step]);

  const saveVehical = (vehicalId) => {
    setSelectVehical(vehicalId);
    setShowValidationMessage(false);
  };

  const handleNext = () => {
    if (step === 1 && !selectVehical) {
      setShowValidationMessage(true);
      setTimeout(() => setShowValidationMessage(false), 3000);
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation((prevSelected) => {
      if (prevSelected.find((loc) => loc.id === location.id)) {
        return prevSelected.filter((loc) => loc.id !== location.id);
      } else {
        return [...prevSelected, location];
      }
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50">
        <div className="relative">
          <div className="animate-spin w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"></div>
          <div className="absolute inset-0 animate-pulse w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full opacity-30"></div>
        </div>
        <h3 className="text-2xl font-bold text-white mt-6">
          Loading Vehicles...
        </h3>
        <p className="text-gray-400 mt-2">
          Please wait while we fetch the fleet.
        </p>
      </div>
    );
  }
  return (
    <div className="container min-h-screen flex flex-col">
      {/* Header */}
      <div className="header font-extrabold font m-6">
        <div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2 pb-2">
            New Optimization
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="vehicle m-9 from-white/5 to-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl relative">
          {step === 1 && (
            <>
              <div>
                <p className="text-center text-4xl font-bold mb-4">
                  Select Vehicle
                </p>
              </div>
              {/* Validation Message */}
              {showValidationMessage && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4 text-center">
                  ⚠️ Please select a vehicle to move ahead
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 m-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`vehicleContanier flex m-4 cursor-pointer`}
                    onClick={() => saveVehical(vehicle.id)}
                  >
                    <div
                      className={`relative group backdrop-blur-xl rounded-3xl p-6 transition-all duration-400 transform hover:scale-[1.03] shadow-lg border-2 ${
                        selectVehical == vehicle.id
                          ? "bg-gradient-to-br from-cyan-900/60 via-blue-900/60 to-purple-900/60 border-cyan-400/80 shadow-cyan-500/30 scale-[1.04]"
                          : "bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:border-cyan-400/50 hover:shadow-cyan-500/10"
                      }`}
                    >
                      {/* Selected highlight icon */}
                      {selectVehical == vehicle.id && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        </div>
                      )}
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3
                              className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                                selectVehical == vehicle.id
                                  ? "text-cyan-300 drop-shadow-lg"
                                  : "text-white"
                              }`}
                            >
                              {vehicle.name}
                            </h3>
                            <p
                              className={`text-xs ${
                                selectVehical == vehicle.id
                                  ? "text-cyan-200"
                                  : "text-gray-400"
                              }`}
                            >
                              {vehicle.licensePlate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2"></div>
                      </div>

                      {/* Vehicle Details */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div
                            className={`rounded-xl p-4 transition-all duration-300 ${
                              selectVehical == vehicle.id
                                ? "bg-cyan-900/30 border border-cyan-400/40"
                                : "bg-white/5"
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <svg
                                className="w-4 h-4 text-cyan-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                              </svg>
                              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                Capacity
                              </span>
                            </div>
                            <p
                              className={`text-lg font-semibold ${
                                selectVehical == vehicle.id
                                  ? "text-cyan-200"
                                  : "text-white"
                              }`}
                            >
                              {vehicle.capacity.toLocaleString()} kg
                            </p>
                          </div>
                          <div
                            className={`rounded-xl p-4 transition-all duration-300 ${
                              selectVehical == vehicle.id
                                ? "bg-cyan-900/30 border border-cyan-400/40"
                                : "bg-white/5"
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <svg
                                className="w-4 h-4 text-orange-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                Mileage
                              </span>
                            </div>
                            <p
                              className={`text-lg font-semibold ${
                                selectVehical == vehicle.id
                                  ? "text-cyan-200"
                                  : "text-white"
                              }`}
                            >
                              {vehicle.mileage?.toLocaleString() || "0"} km
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <p className="text-center text-4xl font-bold mb-8">
                  Select Location
                </p>
              </div>
              {locationsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"></div>
                    <div className="absolute inset-0 animate-pulse w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full opacity-30"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mt-6">
                    Loading Locations...
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Fetching available points.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-5">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className={`relative cursor-pointer p-8 rounded-xl transition-all duration-300 border-2 ${
                        selectedLocation.some((loc) => loc.id === location.id)
                          ? "bg-gradient-to-br from-cyan-900/60 via-blue-900/60 to-purple-900/60 border-cyan-400/80 shadow-cyan-500/30 scale-[1.02]"
                          : "bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:border-cyan-400/50 hover:shadow-cyan-500/10"
                      }`}
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="text-center">
                        <div className="mb-3">
                          <svg
                            className={`w-8 h-8 mx-auto ${
                              selectedLocation.some(
                                (loc) => loc.id === location.id
                              )
                                ? "text-cyan-300"
                                : "text-gray-400"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <h3
                          className={`text-lg font-semibold ${
                            selectedLocation.some(
                              (loc) => loc.id === location.id
                            )
                              ? "text-cyan-300"
                              : "text-white"
                          }`}
                        >
                          {location.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {location.type}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {location.address}
                        </p>
                      </div>
                      {selectedLocation.some(
                        (loc) => loc.id === location.id
                      ) && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <p className="text-center text-4xl font-bold mb-8">
                  Optimize Routes
                </p>
              </div>
              <div className="p-5">
                <div className="mb-8">
                  <label
                    htmlFor="optimizationName"
                    className="block text-lg font-medium text-gray-300 mb-2"
                  >
                    Optimization Name
                  </label>
                  <input
                    type="text"
                    id="optimizationName"
                    value={optimizationName}
                    onChange={(e) => setOptimizationName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="e.g., Morning Delivery Route"
                  />
                </div>

                <div>
                  <p className="text-2xl font-bold mb-4">Algorithm</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {algorithms.map((algo) => (
                      <div
                        key={algo.id}
                        className={`relative cursor-pointer p-6 rounded-xl transition-all duration-300 border-2 ${
                          selectedAlgorithm === algo.id
                            ? "bg-gradient-to-br from-cyan-900/60 via-blue-900/60 to-purple-900/60 border-cyan-400/80 shadow-cyan-500/30 scale-[1.02]"
                            : "bg-gradient-to-br from-white/5 to-white/10 border-white/20 hover:border-cyan-400/50 hover:shadow-cyan-500/10"
                        }`}
                        onClick={() => setSelectedAlgorithm(algo.id)}
                      >
                        <h3
                          className={`text-lg font-semibold ${
                            selectedAlgorithm === algo.id
                              ? "text-cyan-300"
                              : "text-white"
                          }`}
                        >
                          {algo.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {algo.description}
                        </p>
                        {selectedAlgorithm === algo.id && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div>
                <p className="text-center text-4xl font-bold mb-8">
                  Optimization Summary
                </p>
              </div>
              <div className="p-6 text-lg text-white">
                <div className="mb-8">
                  <h3 className="text-3xl font-semibold text-cyan-400 mb-4">
                    Selected Vehicle
                  </h3>
                  {vehicles.find((v) => v.id === selectVehical) && (
                    <div className="bg-white/10 p-5 rounded-xl">
                      <p className="mb-2">
                        <strong className="font-bold text-xl text-gray-300">
                          Name :
                        </strong>{" "}
                        {vehicles.find((v) => v.id === selectVehical).name}
                      </p>
                      <p className="mb-2">
                        <strong className="font-bold text-xl text-gray-300">
                          Type :
                        </strong>{" "}
                        {vehicles.find((v) => v.id === selectVehical).type}
                      </p>
                      <p>
                        <strong className="font-bold text-xl text-gray-300">
                          Capacity :
                        </strong>{" "}
                        {vehicles.find((v) => v.id === selectVehical).capacity}{" "}
                        kg
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-3xl font-semibold text-cyan-400 mb-4">
                    Selected Locations ({selectedLocation.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-64 overflow-y-auto p-6 rounded-xl bg-white/5">
                    {selectedLocation.map((loc) => (
                      <div key={loc.id} className="bg-white/10 p-4 rounded-lg">
                        <p className="font-bold text-xl">{loc.name}</p>
                        <p className="text-base text-gray-300">{loc.address}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-3xl font-semibold text-cyan-400 mb-4">
                    Optimization Configuration
                  </h3>
                  <div className="bg-white/10 p-5 rounded-xl">
                    <p className="mb-2">
                      <strong className="font-bold text-xl text-gray-300">
                        Optimization Name:
                      </strong>{" "}
                      {optimizationName}
                    </p>
                    {algorithms.find((a) => a.id === selectedAlgorithm) && (
                      <p>
                        <strong className="font-bold text-xl text-gray-300">
                          Algorithm:
                        </strong>{" "}
                        {
                          algorithms.find((a) => a.id === selectedAlgorithm)
                            .name
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Navigation Buttons - always at bottom */}
      <div className="flex justify-between items-center w-full px-12 py-8">
        <button
          className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={step === 1}
        >
          Previous
        </button>
        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={
            (step === 1 && !selectVehical) ||
            (step === 2 && selectedLocation.length === 0) ||
            (step === 3 && (!optimizationName || !selectedAlgorithm))
          }
        >
          {step === 4 ? "Optimize" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default NewOptimization;
