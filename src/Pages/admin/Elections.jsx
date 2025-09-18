import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import axios from "axios";
import AdminSideNav from "../../Components/navigation/AdminSideNav";

const AdminElections = () => {
  const adminUser = {
    name: "Admin User",
    email: "admin@example.com",
  };

  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Existing state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newElection, setNewElection] = useState({
    name: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  // Responsive effect
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch elections from backend
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get("http://localhost:5000/elections");
        const electionsWithStatus = response.data.map((election) => ({
          ...election,
          status: election.status || "upcoming",
        }));
        setElections(electionsWithStatus);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.error("Error fetching elections:", err);
      }
    };

    fetchElections();
  }, []);

  // Search filter
  const filteredElections = elections.filter((election) => {
    if (!election) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      (election.name?.toLowerCase() || '').includes(searchLower) ||
      (election.position?.toLowerCase() || '').includes(searchLower) ||
      (election._id?.toLowerCase() || '').includes(searchLower) ||
      ((election.status || '').toLowerCase().includes(searchLower))
    );
  });

  const validateElection = () => {
    if (!newElection.name.trim()) return "Election name is required";
    if (!newElection.position.trim()) return "Position is required";
    if (!newElection.startDate) return "Start date is required";
    if (!newElection.endDate) return "End date is required";

    if (new Date(newElection.endDate) <= new Date(newElection.startDate)) {
      return "End date must be after start date";
    }

    return null;
  };

  const handleCreateElection = async () => {
    const validationError = validateElection();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setFormError("");

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/elections", {
        name: newElection.name,
        position: newElection.position,
        startDate: newElection.startDate,
        endDate: newElection.endDate,
      });

      setElections([...elections, { ...response.data, status: "upcoming" }]);
      setNewElection({
        name: "",
        position: "",
        startDate: "",
        endDate: "",
      });
      setIsModalOpen(false);
    } catch (err) {
      const serverMessage = err.response?.data?.error || err.message;
      setFormError(serverMessage);
      console.error("Error details:", {
        error: err,
        response: err.response?.data,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleElectionStatus = async (id, currentStatus) => {
    try {
      setIsLoading(true);
      let newStatus = currentStatus === "active" ? "inactive" : "active";

      await axios.put(`http://localhost:5000/elections/${id}/status`, {
        status: newStatus,
      });

      setElections(prevElections => 
        prevElections.map((election) =>
          election._id === id ? { ...election, status: newStatus } : election
        )
      );
    } catch (err) {
      console.error("Error updating election status:", err);
      alert(err.response?.data?.error || "Failed to update election status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteElection = async (id) => {
    if (!window.confirm("Are you sure you want to delete this election?")) {
      return;
    }

    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:5000/elections/${id}`);
      setElections(elections.filter((election) => election._id !== id));
    } catch (err) {
      console.error("Error deleting election:", err);
      alert(err.response?.data?.error || "Failed to delete election");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return dateString
        ? format(parseISO(dateString), "MMM dd, yyyy h:mm a")
        : "N/A";
    } catch {
      return "Invalid date";
    }
  };

  const getStatusDisplay = (status) => {
    const statusText = (status || "upcoming").charAt(0).toUpperCase() + 
                      (status || "upcoming").slice(1);

    const statusClass = 
      status === "active" ? "bg-green-100 text-green-800" :
      status === "inactive" ? "bg-red-100 text-red-800" :
      status === "completed" ? "bg-gray-100 text-gray-800" :
      "bg-blue-100 text-blue-800";

    return { text: statusText, class: statusClass };
  };

  if (isLoading && elections.length === 0) {
    return (
      <div className="flex min-h-screen  bg-gradient-to-r from-black via-blue-950 to-purple-950">
        {!isMobile && (
          <div className="hidden md:block md:w-64">
            <AdminSideNav userData={adminUser} />
          </div>
        )}
        <main className="flex-1 lg:ml-64 p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading elections...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {!isMobile && (
          <div className="hidden md:block ">
            <AdminSideNav userData={adminUser} />
          </div>
        )}
        <main className="flex-1 lg:ml-64 p-4 flex items-center justify-center">
          <div className="text-center text-red-500 max-w-md bg-white p-6 rounded-xl shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-medium mt-4">Error loading elections</h3>
            <p className="mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen  bg-gradient-to-r from-black via-blue-950 to-purple-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block ">
        <AdminSideNav userData={adminUser} />
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
            className={`fixed inset-y-0 left-0 w-64 z-30 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <AdminSideNav userData={adminUser} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <div className="md:hidden  bg-gradient-to-r from-black via-blue-950 to-purple-950 shadow-sm py-4 px-4 flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="ml-4 text-lg font-semibold">Election Management</span>
          </div>
        )}

        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          {/* Dashboard Header */}
          <div className="mb-6 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                  Election Management
                </h1>
                <div className="flex items-center mt-2 md:mt-3">
                  <span className="inline-block w-12 md:w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
                  <span className="inline-block w-4 md:w-6 h-1 bg-indigo-900 rounded-full ml-1"></span>
                  <span className="inline-block w-2 md:w-3 h-1 bg-indigo-200 rounded-full ml-1"></span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold md:text-lg">Create Election</span>
              </button>
            </div>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-white max-w-2xl">
              Manage all elections, monitor their status, and oversee the voting process.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Elections</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    {elections.length}
                  </h3>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-indigo-50 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 md:h-8 w-6 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 md:h-4 w-3 md:w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Currently managing elections</span>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Elections</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    {elections.filter((e) => e.status === "active").length}
                  </h3>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-green-50 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 md:h-8 w-6 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 md:h-4 w-3 md:w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Currently accepting votes</span>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Elections</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    {elections.filter((e) => e.status === "upcoming").length}
                  </h3>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-blue-50 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 md:h-8 w-6 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 md:h-4 w-3 md:w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Scheduled to start soon</span>
              </div>
            </div>
          </div>

          {/* Elections Table */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
            <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Election Directory</h3>
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search elections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-gray-400 absolute left-3 top-2.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {filteredElections.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Election
                      </th>
                      <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Dates
                      </th>
                      <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 md:px-6 md:py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredElections.map((election) => {
                      const status = getStatusDisplay(election.status);
                      return (
                        <tr key={election._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">
                              {election.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                                ID: {election._id?.substring(18, 24) || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {election.position}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-sm text-gray-900">
                              <div>{formatDate(election.startDate)}</div>
                              <div className="text-xs text-gray-500">to</div>
                              <div>{formatDate(election.endDate)}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${status.class}`}>
                              {status.text}
                            </span>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2 md:space-x-3">
                              <button
                                onClick={() => toggleElectionStatus(election._id, election.status)}
                                className="text-indigo-600 hover:text-indigo-900 p-1 md:p-2 rounded-full hover:bg-indigo-50 transition"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 md:h-5 w-4 md:w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteElection(election._id)}
                                className="text-red-600 hover:text-red-900 p-1 md:p-2 rounded-full hover:bg-red-50 transition"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 md:h-5 w-4 md:w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-4 py-8 md:px-6 md:py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 md:h-16 w-12 md:w-16 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-3 md:mt-4 text-base md:text-lg font-medium text-gray-900">
                    No elections found
                  </h3>
                  <p className="mt-1 text-sm md:text-base text-gray-500">
                    {searchTerm
                      ? "No matching elections found"
                      : "Get started by creating your first election"}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4 md:mt-6 inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:-translate-y-0.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 md:h-5 w-4 md:w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Create Election
                    </button>
                  )}
                </div>
              </div>
            )}

            {filteredElections.length > 0 && (
              <div className="px-4 py-3 md:px-6 md:py-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-2">
                <div className="text-xs md:text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredElections.length}</span>{" "}
                  of <span className="font-medium">{elections.length}</span> elections
                </div>
                <div className="flex space-x-2">
                  <button className="px-2 md:px-3 py-1 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-2 md:px-3 py-1 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Election Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50 transition-opacity">
          <div className="bg-white rounded-lg md:rounded-2xl shadow-2xl w-full max-w-md md:max-w-2xl overflow-hidden transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-white">Create New Election</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormError("");
                  }}
                  className="text-white hover:text-indigo-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 md:h-6 w-5 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
              <p className="mt-1 text-indigo-100 text-sm md:text-base">Fill in the election details below</p>
            </div>

            <div className="p-4 md:p-6">
              {formError && (
                <div className="mb-3 md:mb-4 p-2 md:p-3 bg-red-100 text-red-700 rounded-lg text-xs md:text-sm">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Election Name *
                  </label>
                  <input
                    type="text"
                    value={newElection.name}
                    onChange={(e) => setNewElection({ ...newElection, name: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                    placeholder="Student Council Election"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={newElection.position}
                    onChange={(e) => setNewElection({ ...newElection, position: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                    placeholder="President"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="datetime-local"
                    value={newElection.startDate}
                    onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="datetime-local"
                    value={newElection.endDate}
                    onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormError("");
                  }}
                  className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateElection}
                  disabled={isLoading}
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-medium flex items-center justify-center space-x-2 disabled:opacity-70 text-sm md:text-base"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 md:h-5 w-4 md:w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Create Election</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminElections;