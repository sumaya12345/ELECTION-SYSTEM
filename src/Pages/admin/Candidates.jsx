import { useState, useEffect } from "react";
import AdminSideNav from "../../Components/navigation/AdminSideNav";
import axios from "axios";

const AdminCandidates = () => {
  const adminUser = {
    name: "Admin User",
    email: "admin@example.com",
  };

  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [candidates, setCandidates] = useState(() => {
    const savedCandidates = localStorage.getItem("candidates");
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    bio: "",
    photo: null,
    email: "",
    password: "",
    confirmPassword: "",
    electionId: "",
  });

  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get("http://localhost:5000/elections");
        const activeElections = response.data.filter(
          (election) => election.status === "active"
        );
        setElections(activeElections);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElections();
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate._id.toLowerCase().includes(searchLower) ||
      (elections.find((e) => e._id === candidate.electionId)?.name || "")
        .toLowerCase()
        .includes(searchLower)
    );
  });

  const handleAddCandidate = async () => {
    if (newCandidate.password !== newCandidate.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newCandidate.name);
      formData.append("bio", newCandidate.bio);
      formData.append("email", newCandidate.email);
      formData.append("password", newCandidate.password);
      formData.append("confirmPassword", newCandidate.confirmPassword);
      formData.append("electionId", newCandidate.electionId);
      formData.append("photo", newCandidate.photo);

      const response = await axios.post(
        "http://localhost:5000/candidates/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCandidates([...candidates, response.data.candidate]);
      localStorage.setItem(
        "candidates",
        JSON.stringify([...candidates, response.data.candidate])
      );
      setNewCandidate({
        name: "",
        bio: "",
        photo: null,
        email: "",
        password: "",
        confirmPassword: "",
        electionId: "",
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCandidate = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this candidate?"
    );
    if (!confirmation) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/candidates/${id}`
      );
      if (response.status === 200) {
        const updatedCandidates = candidates.filter(
          (candidate) => candidate._id !== id
        );
        setCandidates(updatedCandidates);
        localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
      } else {
        console.error("Error deleting candidate:", response);
        alert("Failed to delete candidate!");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Failed to delete candidate!");
    }
  };

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
      <div className="flex-1 flex flex-col  overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <div className="md:hidden bg-white shadow-sm py-4 px-4 flex items-center">
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
            <span className="ml-4 text-lg font-semibold">Candidate Management</span>
          </div>
        )}

        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          {/* Dashboard Header */}
          <div className="mb-6 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                  Candidate Management
                </h1>
                <div className="flex items-center mt-2 md:mt-3">
                  <span className="inline-block w-12 md:w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
                  <span className="inline-block w-4 md:w-6 h-1 bg-indigo-300 rounded-full ml-1"></span>
                  <span className="inline-block w-2 md:w-3 h-1 bg-indigo-200 rounded-full ml-1"></span>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(true)}
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
                <span className="font-semibold md:text-lg">Add New Candidate</span>
              </button>
            </div>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-white max-w-2xl">
              Manage all candidate profiles, monitor their details, and oversee
              their participation in elections.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Candidates
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    {candidates.length}
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
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
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Active in {elections.length} elections</span>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Elections
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    {elections.length}
                  </h3>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-purple-50 text-purple-600">
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
                <span>Currently accepting candidates</span>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Recent Activity
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                    {candidates.length > 0 ? "Active" : "None"}
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
                <span>Updated just now</span>
              </div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
            <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Candidate Directory
              </h3>
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 md:h-5 w-4 md:w-5 text-gray-400 absolute left-3 top-2.5"
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Election
                    </th>
                    <th className="px-4 py-3 md:px-6 md:py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate) => (
                      <tr
                        key={candidate._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 md:h-14 md:w-14 rounded-lg overflow-hidden border-2 border-white shadow-md">
                              {candidate.photo ? (
                                <img
                                  src={candidate.photo}
                                  alt={candidate.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/default-user.png";
                                  }}
                                />
                              ) : (
                                <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-lg md:text-xl">
                                  {candidate.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="ml-3 md:ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                {candidate.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                                  ID: {candidate._id.substring(18, 24)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {candidate.email}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 md:h-4 w-3 md:w-4 inline-block mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            Verified
                          </div>
                        </td>
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm font-medium text-gray-900">
                            {elections.find((e) => e._id === candidate.electionId)
                              ?.name || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <svg
                                className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              Active
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2 md:space-x-3">
                            <button className="text-indigo-600 hover:text-indigo-900 p-1 md:p-2 rounded-full hover:bg-indigo-50 transition">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 md:h-5 w-4 md:w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteCandidate(candidate._id)}
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-8 md:px-6 md:py-12 text-center">
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
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          <h3 className="mt-3 md:mt-4 text-base md:text-lg font-medium text-gray-900">
                            No candidates found
                          </h3>
                          <p className="mt-1 text-sm md:text-base text-gray-500">
                            Get started by adding your first candidate
                          </p>
                          <button
                            onClick={() => setIsFormOpen(true)}
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
                            Add Candidate
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {filteredCandidates.length > 0 && (
              <div className="px-4 py-3 md:px-6 md:py-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-2">
                <div className="text-xs md:text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredCandidates.length}</span>{" "}
                  of <span className="font-medium">{candidates.length}</span>{" "}
                  candidates
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

          {/* Candidate Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50 transition-opacity">
              <div className="bg-white rounded-lg md:rounded-2xl shadow-2xl w-full max-w-md md:max-w-2xl overflow-hidden transform transition-all max-h-[90vh] overflow-y-auto">
                <div className="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      Register New Candidate
                    </h2>
                    <button
                      onClick={() => setIsFormOpen(false)}
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
                  <p className="mt-1 text-indigo-100 text-sm md:text-base">
                    Fill in the candidate details below
                  </p>
                </div>

                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={newCandidate.name}
                        onChange={(e) =>
                          setNewCandidate({
                            ...newCandidate,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={newCandidate.email}
                        onChange={(e) =>
                          setNewCandidate({
                            ...newCandidate,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        value={newCandidate.password}
                        onChange={(e) =>
                          setNewCandidate({
                            ...newCandidate,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        value={newCandidate.confirmPassword}
                        onChange={(e) =>
                          setNewCandidate({
                            ...newCandidate,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Election *
                      </label>
                      <select
                        value={newCandidate.electionId}
                        onChange={(e) =>
                          setNewCandidate({
                            ...newCandidate,
                            electionId: e.target.value,
                          })
                        }
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none bg-white text-sm md:text-base"
                      >
                        <option value="">Select Election</option>
                        {elections.map((election) => (
                          <option key={election._id} value={election._id}>
                            {election.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Candidate Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        <label className="cursor-pointer">
                          <span className="inline-block px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition text-sm md:text-base">
                            Choose File
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setNewCandidate({
                                ...newCandidate,
                                photo: e.target.files[0],
                              })
                            }
                            className="hidden"
                          />
                        </label>
                        <span className="ml-3 text-xs md:text-sm text-gray-500">
                          {newCandidate.photo
                            ? newCandidate.photo.name
                            : "No file chosen"}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        value={newCandidate.bio}
                        onChange={(e) =>
                          setNewCandidate({
                            ...newCandidate,
                            bio: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm md:text-base"
                        placeholder="Brief description about the candidate..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-8 pt-4 md:pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm md:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCandidate}
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
                          <span>Processing...</span>
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
                          <span>Register Candidate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCandidates;