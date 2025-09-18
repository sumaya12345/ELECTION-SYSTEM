import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaVoteYea, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AdminSideNav from '../../Components/navigation/AdminSideNav';
import 'react-toastify/dist/ReactToastify.css';

function Voters() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/admin/users');
        
        if (response.data.success) {
          const votedUsers = response.data.users.filter(user => 
            user.hasVoted || user.votes.length > 0
          );
          setVoters(votedUsers);
        } else {
          throw new Error(response.data.message || 'Failed to fetch voters');
        }
      } catch (error) {
        console.error('Error fetching voters:', error);
        toast.error(error.response?.data?.message || 'Error loading voter data');
      } finally {
        setLoading(false);
      }
    };

    fetchVoters();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredVoters = voters.filter(voter => {
    return (
      voter.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.nationalId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen  bg-gradient-to-r from-black via-blue-950 to-purple-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-64 bg-white shadow-md">
        <AdminSideNav />
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
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <AdminSideNav />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
            <span className="ml-4 text-lg font-semibold">Voters</span>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Voters Who Have Voted</h1>
          
          {/* Search Control */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search voters by name, email or ID..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Voters Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Voter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      National ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votes Cast
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVoters.length > 0 ? (
                    filteredVoters.map((voter) => (
                      <tr key={voter.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUser className="text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {voter.username || 'No username'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FaEnvelope className="mr-2 text-gray-400" />
                            {voter.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FaIdCard className="mr-2 text-gray-400" />
                            {voter.nationalId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaVoteYea className="mr-2 text-green-500" />
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {voter.votes.length} {voter.votes.length === 1 ? 'vote' : 'votes'}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {voter.votes.map((vote, index) => (
                              <div key={index}>
                                Voted for {vote.candidateName} as {vote.position}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No voters found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Voters Who Have Voted</h3>
            <p className="text-2xl font-bold">{voters.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voters;