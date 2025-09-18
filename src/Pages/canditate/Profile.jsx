import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CandidateSideNav from '../../Components/navigation/CandidateSideNav';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaUser, 
  FaEnvelope, 
  FaVoteYea,
  FaEdit,
  FaCalendarAlt,
  FaPoll,
  FaExclamationTriangle,
  FaSpinner,
  FaBars
} from 'react-icons/fa';

function Profile() {
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const candidateId = localStorage.getItem('candidateId');
        if (!candidateId) {
          navigate('/candidate/login');
          return;
        }

        const response = await axios.get(`http://localhost:5000/profile/candidate/${candidateId}`);
        
        if (response.data.success) {
          const profileData = response.data.candidate || response.data.profile || {};
          
          const candidateData = {
            name: profileData.name || 'Not specified',
            email: profileData.email || 'Not specified',
            photo: profileData.photo || null,
            votes: profileData.votes || 0,
            votesCast: profileData.votesCast || profileData.votesCast || [],
            createdAt: profileData.createdAt 
              ? new Date(profileData.createdAt).toLocaleDateString() 
              : 'Not available',
            electionName: (profileData.electionId && profileData.electionId.name) 
              ? profileData.electionId.name 
              : (profileData.electionName || 'Not specified')
          };
          
          setProfile(candidateData);
        } else {
          throw new Error(response.data.message || 'Failed to load profile data');
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        const errorMsg = error.response?.data?.message || error.message || 'Failed to load profile';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className='flex h-screen bg-blue-50'>
        {/* Desktop Sidebar */}
        <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
          <CandidateSideNav />
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
              <CandidateSideNav />
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
                <FaBars className="w-6 h-6" />
              </button>
              <span className="ml-4 text-lg font-semibold">Loading...</span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center">
              <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4 mx-auto" />
              <p className="text-blue-600">Loading profile data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-screen bg-blue-50'>
        {/* Desktop Sidebar */}
        <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
          <CandidateSideNav />
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
              <CandidateSideNav />
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
                <FaBars className="w-6 h-6" />
              </button>
              <span className="ml-4 text-lg font-semibold">Error</span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md w-full">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <FaExclamationTriangle className="text-blue-600 text-3xl" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 mb-4">Error Loading Profile</h2>
              <p className="text-blue-600 mb-4">{error}</p>
              <p className="text-blue-600 mb-6">
                Please check your connection and try again.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition shadow-sm"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className='flex h-screen bg-blue-50'>
        {/* Desktop Sidebar */}
        <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
          <CandidateSideNav />
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
              <CandidateSideNav />
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
                <FaBars className="w-6 h-6" />
              </button>
              <span className="ml-4 text-lg font-semibold">Profile Not Found</span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md w-full">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Profile Not Found</h2>
              <p className="text-blue-600 mb-6">
                We couldn't find your profile information. Please log in again.
              </p>
              <button 
                onClick={() => navigate('/candidate/login')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
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
    <div className='flex h-screen bg-blue-50'>
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className={`hidden md:block md:w-64 bg-white shadow-md`}>
        <CandidateSideNav />
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
            <CandidateSideNav />
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
              <FaBars className="w-6 h-6" />
            </button>
            <span className="ml-4 text-lg font-semibold">Profile</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-blue-100">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center">
                  {profile.photo ? (
                    <img 
                      src={profile.photo} 
                      alt="Candidate" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white"
                    />
                  ) : (
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                      <FaUser className="text-2xl" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-blue-100">{profile.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Profile Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Candidate Information */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6 h-full border border-blue-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-blue-800 flex items-center">
                      <FaUser className="mr-2 text-blue-600" />
                      Candidate Information
                    </h2>
                    <button 
                      onClick={() => navigate('/candidate/edit-profile')}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-50 p-2 rounded-lg mr-4">
                        <FaEnvelope className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">Email</p>
                        <p className="font-medium text-blue-800">{profile.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-50 p-2 rounded-lg mr-4">
                        <FaPoll className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">Running in Election</p>
                        <p className="font-medium text-blue-800">{profile.electionName}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-50 p-2 rounded-lg mr-4">
                        <FaCalendarAlt className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600">Member Since</p>
                        <p className="font-medium text-blue-800">{profile.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voting Stats */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 h-full border border-blue-100">
                  <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
                    <FaVoteYea className="mr-2 text-blue-600" />
                    Campaign Stats
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FaVoteYea className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-800">Total Votes</h3>
                          <p className="text-2xl font-bold text-blue-600">
                            {profile.votes || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    {profile.votesCast && profile.votesCast.length > 0 && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <FaVoteYea className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-blue-800">Votes Cast</h3>
                            <p className="text-sm text-blue-600">
                              Participated in {profile.votesCast.length} elections
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-80">Total Votes</p>
                    <h3 className="text-2xl font-bold">{profile.votes || 0}</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <FaVoteYea className="text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-700 rounded-xl shadow-md p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-80">Election</p>
                    <h3 className="text-2xl font-bold">
                      {profile.electionName.split(' ').map(word => word[0]).join('').toUpperCase()}
                    </h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <FaPoll className="text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-800 rounded-xl shadow-md p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-80">Account Status</p>
                    <h3 className="text-2xl font-bold">Active</h3>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <FaUser className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;