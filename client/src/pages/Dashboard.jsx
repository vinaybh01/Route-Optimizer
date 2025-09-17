import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    totalRoutes: 0,
    activeVehicles: 0,
    totalLocations: 0,
    optimizationsSaved: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Simulate loading dashboard stats
    setTimeout(() => {
      setStats({
        totalRoutes: 156,
        activeVehicles: 24,
        totalLocations: 89,
        optimizationsSaved: 342,
      });
    }, 1000);
  }, [navigate]);

  return (
    // <div className="min-h-screen bg-black text-white">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     {/* Header */}
    //     <div className="mb-8">
    //       <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
    //         Dashboard
    //       </h1>
    //       <p className="text-gray-400">
    //         Welcome back! Here's an overview of your route optimization system.
    //       </p>
    //     </div>

    //     {/* Stats Cards */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    //       <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-gray-400 text-sm">Total Routes</p>
    //             <p className="text-3xl font-bold text-white">
    //               {stats.totalRoutes}
    //             </p>
    //           </div>
    //           <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
    //             <svg
    //               className="w-6 h-6 text-white"
    //               fill="none"
    //               stroke="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-gray-400 text-sm">Active Vehicles</p>
    //             <p className="text-3xl font-bold text-white">
    //               {stats.activeVehicles}
    //             </p>
    //           </div>
    //           <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
    //             <svg
    //               className="w-6 h-6 text-white"
    //               fill="none"
    //               stroke="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-gray-400 text-sm">Total Locations</p>
    //             <p className="text-3xl font-bold text-white">
    //               {stats.totalLocations}
    //             </p>
    //           </div>
    //           <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center">
    //             <svg
    //               className="w-6 h-6 text-white"
    //               fill="none"
    //               stroke="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    //               />
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-gray-400 text-sm">Optimizations</p>
    //             <p className="text-3xl font-bold text-white">
    //               {stats.optimizationsSaved}
    //             </p>
    //           </div>
    //           <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-600 rounded-xl flex items-center justify-center">
    //             <svg
    //               className="w-6 h-6 text-white"
    //               fill="none"
    //               stroke="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M13 10V3L4 14h7v7l9-11h-7z"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Quick Actions */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    //         <h3 className="text-xl font-semibold text-white mb-4">
    //           Quick Actions
    //         </h3>
    //         <div className="space-y-3">
    //           <button
    //             onClick={() => navigate("/optimizations")}
    //             className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
    //           >
    //             Start New Optimization
    //           </button>
    //           <button
    //             onClick={() => navigate("/vehicles")}
    //             className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
    //           >
    //             Manage Vehicles
    //           </button>
    //           <button
    //             onClick={() => navigate("/locations")}
    //             className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
    //           >
    //             Add Location
    //           </button>
    //         </div>
    //       </div>

    //       <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    //         <h3 className="text-xl font-semibold text-white mb-4">
    //           Recent Activity
    //         </h3>
    //         <div className="space-y-3">
    //           <div className="flex items-center space-x-3">
    //             <div className="w-2 h-2 bg-green-400 rounded-full"></div>
    //             <p className="text-gray-300 text-sm">
    //               Route optimization completed
    //             </p>
    //           </div>
    //           <div className="flex items-center space-x-3">
    //             <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
    //             <p className="text-gray-300 text-sm">New vehicle added</p>
    //           </div>
    //           <div className="flex items-center space-x-3">
    //             <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
    //             <p className="text-gray-300 text-sm">Location updated</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
    //         <h3 className="text-xl font-semibold text-white mb-4">
    //           Performance
    //         </h3>
    //         <div className="space-y-3">
    //           <div className="flex justify-between items-center">
    //             <span className="text-gray-300">Cost Savings</span>
    //             <span className="text-green-400 font-semibold">+32%</span>
    //           </div>
    //           <div className="flex justify-between items-center">
    //             <span className="text-gray-300">Time Efficiency</span>
    //             <span className="text-blue-400 font-semibold">+28%</span>
    //           </div>
    //           <div className="flex justify-between items-center">
    //             <span className="text-gray-300">Fuel Usage</span>
    //             <span className="text-purple-400 font-semibold">-15%</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>Dashboard</div>
  );
}

export default Dashboard;
