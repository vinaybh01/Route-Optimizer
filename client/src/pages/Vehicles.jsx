import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "truck",
    capacity: "",
    fuelType: "diesel",
    licensePlate: "",
    model: "",
    year: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Simulate loading vehicles data
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
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const vehicle = {
      id: vehicles.length + 1,
      ...newVehicle,
      capacity: parseInt(newVehicle.capacity),
      year: parseInt(newVehicle.year),
      status: "active",
      mileage: 0,
      lastService: new Date().toISOString().split("T")[0],
    };
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({
      name: "",
      type: "truck",
      capacity: "",
      fuelType: "diesel",
      licensePlate: "",
      model: "",
      year: "",
    });
    setShowAddForm(false);
  };

  const handleEditVehicle = (e) => {
    e.preventDefault();
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === editingVehicle.id
        ? {
            ...vehicle,
            ...editingVehicle,
            capacity: parseInt(editingVehicle.capacity),
            year: parseInt(editingVehicle.year),
          }
        : vehicle
    );
    setVehicles(updatedVehicles);
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || vehicle.type === filterType;
    const matchesStatus =
      filterStatus === "all" || vehicle.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "maintenance":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "inactive":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "maintenance":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "inactive":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case "truck":
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        );
      case "van":
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm1.5-9H17V12h4.46L19.5 9.5zM6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM20 8l3 4v5h-2c0-1.66-1.34-3-3-3s-3 1.34-3 3H9c0-1.66-1.34-3-3-3s-3 1.34-3 3H4v-7c0-1.1.9-2 2-2h14z" />
          </svg>
        );
      case "motorcycle":
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.84 5.84 18 4 18c-1.66 0-3-1.34-3-3s1.34-3 3-3c1.84 0 3.4 1.16 3.82 3H7.82zM20 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          </svg>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-pulse w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto opacity-30"></div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Loading Fleet
          </h3>
          <p className="text-gray-400">Fetching vehicle information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Fleet Management
            </h1>
            <p className="text-gray-300 text-lg">
              Monitor and manage your delivery vehicle fleet
            </p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  {vehicles.filter((v) => v.status === "active").length} Active
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  {vehicles.filter((v) => v.status === "maintenance").length}{" "}
                  Maintenance
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  {vehicles.length} Total
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 flex items-center space-x-2"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add Vehicle</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search vehicles by name, license plate, or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="all">All Types</option>
                <option value="truck">Trucks</option>
                <option value="van">Vans</option>
                <option value="motorcycle">Motorcycles</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add Vehicle Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Add New Vehicle
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddVehicle} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vehicle Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newVehicle.name}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., Heavy Duty Truck"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      License Plate *
                    </label>
                    <input
                      type="text"
                      required
                      value={newVehicle.licensePlate}
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          licensePlate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., ABC-123"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vehicle Type *
                    </label>
                    <select
                      value={newVehicle.type}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, type: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent [&>option]:bg-gray-800 [&>option]:text-white"
                    >
                      <option value="truck">Truck</option>
                      <option value="van">Van</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Model *
                    </label>
                    <input
                      type="text"
                      required
                      value={newVehicle.model}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, model: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., Freightliner Cascadia"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Capacity (kg) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newVehicle.capacity}
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          capacity: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., 5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      min="2000"
                      max="2024"
                      value={newVehicle.year}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, year: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="e.g., 2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Fuel Type *
                    </label>
                    <select
                      value={newVehicle.fuelType}
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          fuelType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent [&>option]:bg-gray-800 [&>option]:text-white"
                    >
                      <option value="diesel">Diesel</option>
                      <option value="petrol">Petrol</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Add Vehicle
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    {getVehicleIcon(vehicle.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {vehicle.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{vehicle.model}</p>
                    <p className="text-gray-400 text-xs">
                      {vehicle.licensePlate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingVehicle(vehicle)}
                    className="text-gray-400 hover:text-cyan-400 p-2 rounded-lg hover:bg-cyan-400/10 transition-all duration-200"
                    title="Edit Vehicle"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-all duration-200"
                    title="Delete Vehicle"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    vehicle.status
                  )}`}
                >
                  {getStatusIcon(vehicle.status)}
                  <span className="ml-2 capitalize">{vehicle.status}</span>
                </span>
              </div>

              {/* Vehicle Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
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
                    <p className="text-lg font-semibold text-white">
                      {vehicle.capacity.toLocaleString()} kg
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg
                        className="w-4 h-4 text-green-400"
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
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Fuel
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white capitalize">
                      {vehicle.fuelType}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg
                        className="w-4 h-4 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Year
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {vehicle.year}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
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
                    <p className="text-lg font-semibold text-white">
                      {vehicle.mileage?.toLocaleString() || "0"} km
                    </p>
                  </div>
                </div>

                {/* Last Service */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Last Service
                    </span>
                  </div>
                  <p className="text-sm text-white">
                    {new Date(vehicle.lastService).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && vehicles.length > 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No vehicles match your search
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to find the vehicles
              you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterStatus("all");
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {vehicles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-16 h-16 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Welcome to Fleet Management
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Get started by adding your first vehicle to the fleet. Track
              capacity, maintenance, and performance all in one place.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              Add Your First Vehicle
            </button>
          </div>
        )}

        {/* Edit Vehicle Modal */}
        {editingVehicle && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Edit Vehicle
                </h3>
                <button
                  onClick={() => setEditingVehicle(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleEditVehicle} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vehicle Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingVehicle.name}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      License Plate *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingVehicle.licensePlate}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          licensePlate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Vehicle Type *
                    </label>
                    <select
                      value={editingVehicle.type}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent [&>option]:bg-gray-800 [&>option]:text-white"
                    >
                      <option value="truck">Truck</option>
                      <option value="van">Van</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Model *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingVehicle.model}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          model: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Capacity (kg) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingVehicle.capacity}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          capacity: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      min="2000"
                      max="2024"
                      value={editingVehicle.year}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          year: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Fuel Type *
                    </label>
                    <select
                      value={editingVehicle.fuelType}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          fuelType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent [&>option]:bg-gray-800 [&>option]:text-white"
                    >
                      <option value="diesel">Diesel</option>
                      <option value="petrol">Petrol</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={editingVehicle.status}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-800/80 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Update Vehicle
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingVehicle(null)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vehicles;
