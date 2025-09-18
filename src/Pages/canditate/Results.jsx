import React, { useState, useEffect } from 'react';
import CandidateSideNav from "../../Components/navigation/CandidateSideNav";
import ResultsCom from '../../Components/ResultsCom';

function Results() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed position with proper z-index */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}>
        <CandidateSideNav activeItem="Results" />
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content - Adjusted to remove all white space */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        sidebarOpen && isMobile ? '-ml-40' : '-ml-64 md:-ml-64'
      }`}>
        {/* Mobile Header */}
        <div className="md:hidden ml-64 bg-white text-black p-4 flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-black focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Results</h1>
        </div>

        {/* Content Area - Seamless with sidebar */}
        <div className="flex-1 overflow-auto bg-gray-100 p-0">
          <ResultsCom />
        </div>
      </div>
    </div>
  );
}

export default Results;