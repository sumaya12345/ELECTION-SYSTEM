import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideNav from '../../Components/navigation/AdminSideNav';

function Messages() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) setSidebarOpen(false);
    };

    handleResize(); // Initialize on first render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  // Fetch complaints from your API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/complaints');
        setComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load complaints. Please try again later.');
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints based on search term
  const filteredComplaints = complaints.filter(complaint => 
    complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.complaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) return (
    <div className='flex h-screen bg-gray-100'>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
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
            <span className="ml-4 text-lg font-semibold">Messages</span>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4 md:p-6">
          Loading messages...
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className='flex h-screen bg-gray-100'>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
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
            <span className="ml-4 text-lg font-semibold">Messages</span>
          </div>
        )}

        <div className="flex-1 overflow-auto p-4 md:p-6 text-red-500">
          {error}
        </div>
      </div>
    </div>
  );

  return (
    <div className='flex h-screen  bg-gradient-to-r from-black via-blue-950 to-purple-950'>
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
        <AdminSideNav />
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
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <AdminSideNav />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Toggle Button */}
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
            <span className="ml-4 text-lg  font-semibold">User Complaints</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold" style={{ color: '#fff' }}>User Complaints</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search complaints..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredComplaints.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                {searchTerm ? 'No matching complaints found' : 'No complaints available'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaint
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {complaint.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-600">
                          <a href={`mailto:${complaint.email}`}>{complaint.email}</a>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="line-clamp-2">{complaint.complaint}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(complaint.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;