import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Check token on mount and whenever location changes
    checkAuthStatus();
  }, [location]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleOptimizations = () => {
    navigate("/optimizations");
  };

  const handleLocations = () => {
    navigate("/locations");
  };

  const handleVehicles = () => {
    navigate("/vehicles");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
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
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              RouteMaster
            </h1>
          </div>

          {/* Desktop Navigation - Only show when logged in */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={handleDashboard}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={handleVehicles}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                Vehicles
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={handleLocations}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                Locations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={handleOptimizations}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                Optimizations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          )}

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 cursor-pointer"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          {/* <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div> */}
        </div>

        {/* Mobile Menu */}
        {/* {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 rounded-b-2xl mt-2">
            <div className="px-4 py-6 space-y-4">
              {isLoggedIn && (
                <>
                  <button
                    onClick={() => {
                      handleDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white py-2 font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                  <a
                    href="#vehicles"
                    className="block text-gray-300 hover:text-white py-2 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Vehicles
                  </a>
                  <a
                    href="#locations"
                    className="block text-gray-300 hover:text-white py-2 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Locations
                  </a>
                  <a
                    href="#optimizations"
                    className="block text-gray-300 hover:text-white py-2 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Optimizations
                  </a>
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-200"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
}

export default Navbar;
