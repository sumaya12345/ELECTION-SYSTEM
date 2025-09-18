import React, { useState, useEffect } from 'react';
import VoterSideNav from '../../Components/navigation/VoterSideNav';
import ActiveElection from '../../Components/active_election';

const ActiveElectionPage = ({ userData, electionStats = {} }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) setSidebarOpen(false);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen  bg-gradient-to-r from-black via-blue-950 to-purple-950">
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className={`hidden md:block md:w-64 fixed h-full`}>
        <VoterSideNav userData={userData} electionStats={electionStats} />
      </div>

      {/* Mobile Sidebar - Only appears when toggled */}
      {isMobile && (
        <>
          {/* Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 "
              onClick={toggleSidebar}
            />
          )}
          {/* Sidebar */}
          <div 
            className={`fixed inset-y-0 left-0 w-64 z-30 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <VoterSideNav userData={userData} electionStats={electionStats} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        sidebarOpen && isMobile ? 'ml-64' : 'ml-0 md:ml-64'
      }`}>
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
            <span className="ml-4 text-lg font-semibold">Active Elections</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <ActiveElection userData={userData} electionStats={electionStats} />
        </div>
      </div>
    </div>
  );
};

export default ActiveElectionPage;