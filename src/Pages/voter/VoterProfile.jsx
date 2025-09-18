import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import VoterSideNav from "../../Components/navigation/VoterSideNav";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCalendarAlt,
  FaVoteYea,
  FaEdit,
  FaHistory,
  FaExclamationTriangle,
  FaBars,
} from "react-icons/fa";

function VoterProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) setSidebarOpen(false);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = localStorage.getItem("userId");
        if (!userId) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/profile/${userId}`
        );

        if (response.data.success) {
          const userData = {
            ...response.data.user,
            dateOfBirth: response.data.user.dateOfBirth
              ? new Date(response.data.user.dateOfBirth).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )
              : "Not specified",
            createdAt: response.data.user.createdAt || new Date().toISOString(),
            votes: response.data.user.votes || [],
          };
          setProfile(userData);
        } else {
          throw new Error(
            response.data.message || "Failed to load profile data"
          );
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load profile"
        );
        toast.error(
          error.response?.data?.message || "Failed to load profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return "Not specified";
    }
    if (typeof value === "object") {
      return value._id || value.name || value.id || JSON.stringify(value);
    }
    return value;
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-black to-gray-100">
        {/* Desktop Sidebar */}
        <div className={`hidden md:block md:w-64 bg-white shadow-lg`}>
          <VoterSideNav />
        </div>

        {/* Mobile Sidebar */}
        {isMobile && (
          <>
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={toggleSidebar}
              />
            )}
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <VoterSideNav />
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          {isMobile && (
            <div className="md:hidden bg-white shadow-sm py-4 px-6 flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaBars className="w-6 h-6" />
              </button>
              <span className="ml-4 text-lg font-semibold text-gray-800">
                Loading...
              </span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 font-medium">
                Loading your profile...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Desktop Sidebar */}
        <div className={`hidden md:block md:w-64 bg-white shadow-lg`}>
          <VoterSideNav />
        </div>

        {/* Mobile Sidebar */}
        {isMobile && (
          <>
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={toggleSidebar}
              />
            )}
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <VoterSideNav />
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          {isMobile && (
            <div className="md:hidden bg-white shadow-sm py-4 px-6 flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaBars className="w-6 h-6" />
              </button>
              <span className="ml-4 text-lg font-semibold text-gray-800">
                Error
              </span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="bg-red-100 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-4">
                <FaExclamationTriangle className="text-red-500 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Error Loading Profile
              </h2>
              <p className="text-red-500 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Desktop Sidebar */}
        <div className={`hidden md:block md:w-64 bg-white shadow-lg`}>
          <VoterSideNav />
        </div>

        {/* Mobile Sidebar */}
        {isMobile && (
          <>
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={toggleSidebar}
              />
            )}
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <VoterSideNav />
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          {isMobile && (
            <div className="md:hidden bg-white shadow-sm py-4 px-6 flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaBars className="w-6 h-6" />
              </button>
              <span className="ml-4 text-lg font-semibold text-gray-800">
                Profile Not Found
              </span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-4">
                <FaUser className="text-gray-600 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Profile Not Found
              </h2>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className={`hidden md:block md:w-64 bg-white shadow-lg`}>
        <VoterSideNav />
      </div>

      {/* Mobile Sidebar - Only appears when toggled */}
      {isMobile && (
        <>
          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={toggleSidebar}
            />
          )}
          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <VoterSideNav />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Toggle Button */}
        {isMobile && (
          <div className="md:hidden bg-white shadow-sm py-4 px-6 flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <span className="ml-4 text-lg font-semibold text-gray-800">
              Profile
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-8 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <FaUser className="text-3xl text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 border-2 border-white"></div>
                    </div>
                    <div className="ml-6">
                      <h1 className="text-2xl md:text-3xl font-bold">
                        {renderValue(profile.username)}
                      </h1>
                      <p className="text-indigo-100 mt-1">
                        {renderValue(profile.email)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="flex items-center px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition duration-200 backdrop-blur-sm shadow-sm"
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Main Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information Card */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <FaUser className="text-indigo-600" />
                      </div>
                      Personal Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileInfoItem
                      icon={<FaEnvelope className="text-indigo-500" />}
                      label="Email Address"
                      value={renderValue(profile.email)}
                    />
                    <ProfileInfoItem
                      icon={<FaPhone className="text-indigo-500" />}
                      label="Mobile Number"
                      value={renderValue(profile.mobile)}
                    />
                    <ProfileInfoItem
                      icon={<FaIdCard className="text-indigo-500" />}
                      label="National ID"
                      value={renderValue(profile.nationalId)}
                    />
                    <ProfileInfoItem
                      icon={<FaCalendarAlt className="text-indigo-500" />}
                      label="Date of Birth"
                      value={renderValue(profile.dateOfBirth)}
                    />
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="Elections Participated"
                    value={profile.votes?.length || 0}
                    icon={<FaVoteYea className="text-white" />}
                    color="bg-gradient-to-br from-indigo-600 to-indigo-500"
                  />
                  <StatCard
                    title="Account Since"
                    value={new Date(profile.createdAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric" }
                    )}
                    icon={<FaCalendarAlt className="text-white" />}
                    color="bg-gradient-to-br from-blue-600 to-blue-500"
                  />
                  <StatCard
                    title="Verified"
                    value={profile.verified ? "Verified" : "Pending"}
                    icon={<FaIdCard className="text-white" />}
                    color={
                      profile.verified
                        ? "bg-gradient-to-br from-green-600 to-green-500"
                        : "bg-gradient-to-br from-yellow-600 to-yellow-500"
                    }
                  />
                </div>
              </div>

              {/* Voting History Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <FaVoteYea className="text-purple-600" />
                      </div>
                      Voting History
                    </h2>
                  </div>

                  {profile.votes && profile.votes.length > 0 ? (
                    <div className="space-y-4">
                      {profile.votes.map((vote, index) => (
                        <div
                          key={index}
                          className="bg-purple-50 rounded-xl p-4 border border-purple-100 hover:bg-purple-100 transition duration-150"
                        >
                          <div className="flex items-start">
                            <div className="bg-purple-100 p-2 rounded-lg mr-3">
                              <FaHistory className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800">
                                Election: {renderValue(vote.electionId)}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                Voted for: {renderValue(vote.candidateId)}
                              </p>
                              {vote.votedAt && (
                                <p className="text-xs text-gray-500 mt-2">
                                  On: {new Date(vote.votedAt).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-indigo-50 inline-flex p-4 rounded-full mb-4">
                        <FaVoteYea className="text-indigo-400 text-2xl" />
                      </div>
                      <h3 className="text-gray-700 font-medium">
                        No voting history yet
                      </h3>
                      <p className="text-gray-500 text-sm mt-2">
                        Your voting activity will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Profile Info Component
function ProfileInfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start">
      <div className="bg-indigo-50 p-3 rounded-lg mr-4">{icon}</div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="font-medium text-gray-800 mt-1">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, icon, color }) {
  return (
    <div className={`${color} rounded-xl shadow-lg p-5 text-white`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs opacity-90 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-white/20 p-3 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}

export default VoterProfile;
