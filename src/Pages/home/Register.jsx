import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/home_component/Navbar";
import Footer from "../../Components/home_component/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaPhone,
  FaCalendar,
  FaUserPlus,
} from "react-icons/fa";

function Register() {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState(""); // For handling error messages

  const handleRegister = async () => {
    if (
      username &&
      email &&
      password &&
      reEnterPassword &&
      mobile &&
      nationalId &&
      dateOfBirth
    ) {
      if (password !== reEnterPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/register", {
          username,
          email,
          password,
          mobile,
          nationalId,
          dateOfBirth,
        });

        alert(response.data); // Display success message
        Navigate("/login");
      } catch (error) {
        console.error("Registration error:", error.response || error);
        // Handle error response from the backend
        setError(
          error.response?.data || "An error occurred. Please try again."
        );
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white mt-16 p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="flex items-center justify-center mb-4">
            <FaUserPlus className="text-2xl text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-blue-600">Register</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Re-enter Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Mobile Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* National ID Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                National ID
              </label>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your national ID"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-4 text-sm"
          >
            <FaUserPlus className="mr-2" />
            Register
          </button>

          <p className="text-center mt-3 text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
