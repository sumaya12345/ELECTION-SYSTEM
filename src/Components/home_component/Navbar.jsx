


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showRegisterOptions, setShowRegisterOptions] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", name: "Home"},
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? " bg-gradient-to-t from-black via-blue-950 to-purple-950 shadow-xl" : "bg-gradient-to-t from-black via-white-950 to-purple-500 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center font-bold space-x-2 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white tracking-tighter">
              <span className="block leading-tight">ELECTION SYSTEM</span>
              <span className="text-xs font-normal opacity-80 block leading-tight">
              
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-1 px-2 text-white/90 hover:text-white transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "font-semibold text-white"
                    : ""
                }`}
              >
                <span className="block text-center">{item.name}</span>
                <span className="block text-xs text-white/70 text-center">
                  {item.so}
                </span>
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/80 rounded-full"></div>
                )}
              </Link>
            ))}

            {/* Login Dropdown */}
            <div className="relative">
              <button
                className={`relative py-1 px-2 text-white/90 hover:text-white transition-colors duration-300 ${
                  location.pathname === "/login" ||
                  location.pathname === "/candidate/"
                    ? "font-semibold text-white"
                    : ""
                }`}
                onClick={() => setShowLoginOptions(!showLoginOptions)}
              >
                <span className="block text-center">Login</span>
               
                {(location.pathname === "/login" ||
                  location.pathname === "/candidate/") && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/80 rounded-full"></div>
                )}
              </button>
              {showLoginOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setShowLoginOptions(false)}
                    >
                      Voter Login
                    </Link>
                    <Link
                      to="/candidate/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setShowLoginOptions(false)}
                    >
                      Candidate Login
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Register Dropdown */}
            <div className="relative ml-4">
              <button
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setShowRegisterOptions(!showRegisterOptions)}
              >
                Get Started
              </button>
              {showRegisterOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setShowRegisterOptions(false)}
                    >
                      Voter Login
                    </Link>
                    <Link
                      to="/candidate/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setShowRegisterOptions(false)}
                    >
                      Candidate Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-gradient-to-b from-blue-700 to-blue-800 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-300 ${
                location.pathname === item.path ? "bg-white/10 font-medium" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="block">{item.name}</span>
              <span className="text-sm text-white/70">{item.so}</span>
            </Link>
          ))}
          <div className="px-4 py-3">
            <div className="text-white font-medium mb-2">Login Options:</div>
            <Link
              to="/login"
              className="block px-4 py-2 bg-white/10 rounded-lg mb-2 hover:bg-white/20 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Voter Login
            </Link>
            <Link
              to="/candidate/"
              className="block px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Candidate Login
            </Link>
          </div>
          <div className="px-4 py-3">
            <div className="text-white font-medium mb-2">Register Options:</div>
            <Link
              to="/login"
              className="block px-4 py-2 bg-white/10 rounded-lg mb-2 hover:bg-white/20 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Voter Register
            </Link>
            <Link
              to="/candidate/"
              className="block px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Candidate Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


