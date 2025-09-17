import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Optimizations() {
  const [optimizations, setOptimizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
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

    // Simulate loading optimizations data
    setTimeout(() => {
      setOptimizations([
        {
          id: 1,
          name: "Morning Delivery Route",
          status: "completed",
          createdAt: "2025-09-15T08:00:00Z",
          totalDistance: "45.2 km",
          estimatedTime: "2h 15m",
          fuelSavings: "15%",
          vehiclesCount: 2,
          locationsCount: 8,
        },
        {
          id: 2,
          name: "Express Pickup Route",
          status: "running",
          createdAt: "2025-09-15T10:30:00Z",
          totalDistance: "32.8 km",
          estimatedTime: "1h 45m",
          fuelSavings: "12%",
          vehiclesCount: 1,
          locationsCount: 5,
        },
        {
          id: 3,
          name: "Weekend Distribution",
          status: "pending",
          createdAt: "2025-09-15T14:20:00Z",
          totalDistance: "67.5 km",
          estimatedTime: "3h 30m",
          fuelSavings: "22%",
          vehiclesCount: 3,
          locationsCount: 12,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleCreateOptimization = async (e) => {
    e.preventDefault();
    setIsOptimizing(true);

    // Simulate optimization process
    setTimeout(() => {
      const optimization = {
        id: optimizations.length + 1,
        ...newOptimization,
        status: "completed",
        createdAt: new Date().toISOString(),
        totalDistance: `${(Math.random() * 50 + 20).toFixed(1)} km`,
        estimatedTime: `${Math.floor(Math.random() * 3 + 1)}h ${Math.floor(
          Math.random() * 60
        )}m`,
        fuelSavings: `${Math.floor(Math.random() * 20 + 10)}%`,
        vehiclesCount: newOptimization.vehicles.length,
        locationsCount: newOptimization.locations.length,
      };

      setOptimizations([optimization, ...optimizations]);
      setNewOptimization({
        name: "",
        vehicles: [],
        locations: [],
        preferences: {
          priority: "distance",
          avoidTolls: false,
          avoidHighways: false,
        },
      });
      setShowCreateForm(false);
      setIsOptimizing(false);
    }, 3000);
  };

  const handleDeleteOptimization = (id) => {
    setOptimizations(optimizations.filter((opt) => opt.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "running":
        return "text-blue-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "completed":
        return "from-green-400 to-green-600";
      case "running":
        return "from-blue-400 to-blue-600";
      case "pending":
        return "from-yellow-400 to-yellow-600";
      case "failed":
        return "from-red-400 to-red-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  return (
    // <div className="min-h-screen bg-black text-white">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     {/* Header */}
    //     <div className="flex justify-between items-center mb-8">
    //       <div>
    //         <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
    //           Route Optimizations
    //         </h1>
    //         <p className="text-gray-400">
    //           Create and manage your route optimization tasks
    //         </p>
    //       </div>
    //       <button
    //         onClick={() => setShowCreateForm(true)}
    //         className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
    //       >
    //         New Optimization
    //       </button>
    //     </div>

    //     {/* Create Optimization Form */}
    //     {showCreateForm && (
    //       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    //         <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    //           <h3 className="text-2xl font-bold text-white mb-6">
    //             Create New Optimization
    //           </h3>

    //           {isOptimizing ? (
    //             <div className="text-center py-12">
    //               <div className="animate-spin w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-6"></div>
    //               <h4 className="text-xl font-semibold text-white mb-2">
    //                 Optimizing Routes...
    //               </h4>
    //               <p className="text-gray-400">
    //                 This may take a few moments while we calculate the best
    //                 routes.
    //               </p>
    //             </div>
    //           ) : (
    //             <form onSubmit={handleCreateOptimization} className="space-y-6">
    //               <div>
    //                 <label className="block text-sm font-medium text-gray-300 mb-2">
    //                   Optimization Name
    //                 </label>
    //                 <input
    //                   type="text"
    //                   required
    //                   value={newOptimization.name}
    //                   onChange={(e) =>
    //                     setNewOptimization({
    //                       ...newOptimization,
    //                       name: e.target.value,
    //                     })
    //                   }
    //                   className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    //                   placeholder="e.g., Monday Morning Routes"
    //                 />
    //               </div>

    //               <div>
    //                 <label className="block text-sm font-medium text-gray-300 mb-2">
    //                   Select Vehicles
    //                 </label>
    //                 <div className="space-y-2 max-h-32 overflow-y-auto">
    //                   {availableVehicles.map((vehicle) => (
    //                     <label
    //                       key={vehicle.id}
    //                       className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/30"
    //                     >
    //                       <input
    //                         type="checkbox"
    //                         checked={newOptimization.vehicles.includes(
    //                           vehicle.id
    //                         )}
    //                         onChange={(e) => {
    //                           if (e.target.checked) {
    //                             setNewOptimization({
    //                               ...newOptimization,
    //                               vehicles: [
    //                                 ...newOptimization.vehicles,
    //                                 vehicle.id,
    //                               ],
    //                             });
    //                           } else {
    //                             setNewOptimization({
    //                               ...newOptimization,
    //                               vehicles: newOptimization.vehicles.filter(
    //                                 (id) => id !== vehicle.id
    //                               ),
    //                             });
    //                           }
    //                         }}
    //                         className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
    //                       />
    //                       <span className="text-white">
    //                         {vehicle.name} ({vehicle.capacity}kg)
    //                       </span>
    //                     </label>
    //                   ))}
    //                 </div>
    //               </div>

    //               <div>
    //                 <label className="block text-sm font-medium text-gray-300 mb-2">
    //                   Select Locations
    //                 </label>
    //                 <div className="space-y-2 max-h-32 overflow-y-auto">
    //                   {availableLocations.map((location) => (
    //                     <label
    //                       key={location.id}
    //                       className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/30"
    //                     >
    //                       <input
    //                         type="checkbox"
    //                         checked={newOptimization.locations.includes(
    //                           location.id
    //                         )}
    //                         onChange={(e) => {
    //                           if (e.target.checked) {
    //                             setNewOptimization({
    //                               ...newOptimization,
    //                               locations: [
    //                                 ...newOptimization.locations,
    //                                 location.id,
    //                               ],
    //                             });
    //                           } else {
    //                             setNewOptimization({
    //                               ...newOptimization,
    //                               locations: newOptimization.locations.filter(
    //                                 (id) => id !== location.id
    //                               ),
    //                             });
    //                           }
    //                         }}
    //                         className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
    //                       />
    //                       <span className="text-white">
    //                         {location.name} ({location.type})
    //                       </span>
    //                     </label>
    //                   ))}
    //                 </div>
    //               </div>

    //               <div>
    //                 <label className="block text-sm font-medium text-gray-300 mb-2">
    //                   Optimization Priority
    //                 </label>
    //                 <select
    //                   value={newOptimization.preferences.priority}
    //                   onChange={(e) =>
    //                     setNewOptimization({
    //                       ...newOptimization,
    //                       preferences: {
    //                         ...newOptimization.preferences,
    //                         priority: e.target.value,
    //                       },
    //                     })
    //                   }
    //                   className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
    //                 >
    //                   <option value="distance">Minimize Distance</option>
    //                   <option value="time">Minimize Time</option>
    //                   <option value="fuel">Minimize Fuel Usage</option>
    //                   <option value="balanced">Balanced Approach</option>
    //                 </select>
    //               </div>

    //               <div className="space-y-3">
    //                 <label className="flex items-center space-x-3">
    //                   <input
    //                     type="checkbox"
    //                     checked={newOptimization.preferences.avoidTolls}
    //                     onChange={(e) =>
    //                       setNewOptimization({
    //                         ...newOptimization,
    //                         preferences: {
    //                           ...newOptimization.preferences,
    //                           avoidTolls: e.target.checked,
    //                         },
    //                       })
    //                     }
    //                     className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
    //                   />
    //                   <span className="text-white">Avoid toll roads</span>
    //                 </label>
    //                 <label className="flex items-center space-x-3">
    //                   <input
    //                     type="checkbox"
    //                     checked={newOptimization.preferences.avoidHighways}
    //                     onChange={(e) =>
    //                       setNewOptimization({
    //                         ...newOptimization,
    //                         preferences: {
    //                           ...newOptimization.preferences,
    //                           avoidHighways: e.target.checked,
    //                         },
    //                       })
    //                     }
    //                     className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
    //                   />
    //                   <span className="text-white">Avoid highways</span>
    //                 </label>
    //               </div>

    //               <div className="flex space-x-4 pt-4">
    //                 <button
    //                   type="submit"
    //                   disabled={
    //                     newOptimization.vehicles.length === 0 ||
    //                     newOptimization.locations.length === 0
    //                   }
    //                   className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed"
    //                 >
    //                   Start Optimization
    //                 </button>
    //                 <button
    //                   type="button"
    //                   onClick={() => setShowCreateForm(false)}
    //                   className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
    //                 >
    //                   Cancel
    //                 </button>
    //               </div>
    //             </form>
    //           )}
    //         </div>
    //       </div>
    //     )}

    //     {/* Optimizations List */}
    //     <div className="space-y-6">
    //       {optimizations.map((optimization) => (
    //         <div
    //           key={optimization.id}
    //           className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300"
    //         >
    //           <div className="flex items-center justify-between mb-4">
    //             <div className="flex items-center space-x-4">
    //               <div
    //                 className={`w-3 h-3 bg-gradient-to-br ${getStatusBgColor(
    //                   optimization.status
    //                 )} rounded-full`}
    //               ></div>
    //               <h3 className="text-xl font-semibold text-white">
    //                 {optimization.name}
    //               </h3>
    //               <span
    //                 className={`text-sm capitalize ${getStatusColor(
    //                   optimization.status
    //                 )} bg-gray-800/50 px-3 py-1 rounded-full`}
    //               >
    //                 {optimization.status}
    //               </span>
    //             </div>
    //             <div className="flex items-center space-x-2">
    //               <button className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/10 transition-all duration-200">
    //                 <svg
    //                   className="w-5 h-5"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //                   />
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    //                   />
    //                 </svg>
    //               </button>
    //               <button
    //                 onClick={() => handleDeleteOptimization(optimization.id)}
    //                 className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200"
    //               >
    //                 <svg
    //                   className="w-5 h-5"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    //                   />
    //                 </svg>
    //               </button>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
    //             <div>
    //               <span className="text-gray-400">Created:</span>
    //               <p className="text-white font-medium">
    //                 {formatDate(optimization.createdAt)}
    //               </p>
    //             </div>
    //             <div>
    //               <span className="text-gray-400">Distance:</span>
    //               <p className="text-white font-medium">
    //                 {optimization.totalDistance}
    //               </p>
    //             </div>
    //             <div>
    //               <span className="text-gray-400">Time:</span>
    //               <p className="text-white font-medium">
    //                 {optimization.estimatedTime}
    //               </p>
    //             </div>
    //             <div>
    //               <span className="text-gray-400">Savings:</span>
    //               <p className="text-green-400 font-medium">
    //                 {optimization.fuelSavings}
    //               </p>
    //             </div>
    //             <div>
    //               <span className="text-gray-400">Vehicles:</span>
    //               <p className="text-white font-medium">
    //                 {optimization.vehiclesCount}
    //               </p>
    //             </div>
    //             <div>
    //               <span className="text-gray-400">Locations:</span>
    //               <p className="text-white font-medium">
    //                 {optimization.locationsCount}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     {optimizations.length === 0 && (
    //       <div className="text-center py-12">
    //         <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
    //           <svg
    //             className="w-12 h-12 text-gray-400"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M13 10V3L4 14h7v7l9-11h-7z"
    //             />
    //           </svg>
    //         </div>
    //         <h3 className="text-xl font-semibold text-white mb-2">
    //           No optimizations found
    //         </h3>
    //         <p className="text-gray-400 mb-6">
    //           Get started by creating your first route optimization.
    //         </p>
    //         <button
    //           onClick={() => setShowCreateForm(true)}
    //           className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
    //         >
    //           Create First Optimization
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div>Optimization</div>
  );
}

export default Optimizations;
