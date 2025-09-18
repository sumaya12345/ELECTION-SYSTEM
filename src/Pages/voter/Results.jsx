import React, { useState, useEffect } from 'react';
import VoterSideNav from "../../Components/navigation/VoterSideNav";
import ResultsCom from '../../Components/ResultsCom';

function Results() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className='flex h-screen bg-gray-950'>
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
        <VoterSideNav activeItem="Results" />
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
            <VoterSideNav activeItem="Results" />
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
            <span className="ml-4 text-lg font-semibold">Results</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 -ml-72 overflow-auto p-4 md:p-6">
          <ResultsCom />
        </div>
      </div>
    </div>
  );
}

export default Results;