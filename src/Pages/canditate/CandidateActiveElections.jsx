import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaVoteYea, 
  FaCheckCircle, 
  FaTimesCircle,
  FaSpinner,
  FaCalendarAlt,
  FaUsers,
  FaUserTie
} from 'react-icons/fa';
import CandidateSideNav from '../../Components/navigation/CandidateSideNav';

function CandidateActiveElections() {
  const [elections, setElections] = useState({
    election: null,
    candidates: [],
    hasVoted: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const fetchActiveElections = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const candidateId = localStorage.getItem('candidateId');
        if (!candidateId) {
          navigate('/candidate/login');
          return;
        }

        const candidateResponse = await axios.get(
          `http://localhost:5000/profile/candidate/${candidateId}`
        );
        
        const electionId = candidateResponse.data.candidate?.electionId?._id;
        if (!electionId) {
          throw new Error("You are not registered in any election");
        }

        const electionResponse = await axios.get(
          `http://localhost:5000/elections/${electionId}`
        );

        const candidatesResponse = await axios.get(
          `http://localhost:5000/candidates/${electionId}`
        );

        const hasVoted = candidateResponse.data.candidate?.votesCast?.some(
          vote => vote.electionId.toString() === electionId
        ) || false;

        setElections({
          election: electionResponse.data,
          candidates: candidatesResponse.data.candidates,
          hasVoted
        });
      } catch (error) {
        console.error('Error fetching active elections:', error);
        setError(error.response?.data?.message || error.message || 'Failed to load elections');
        toast.error(error.response?.data?.message || 'Failed to load elections');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveElections();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleVote = async () => {
    if (!selectedCandidate) {
      toast.warning('Please select a candidate to vote for');
      return;
    }

    try {
      setIsSubmitting(true);
      const candidateId = localStorage.getItem('candidateId');

      const response = await axios.post(
        `http://localhost:5000/api/candidates/vote`,
        {
          voterId: candidateId,
          candidateId: selectedCandidate,
          electionId: elections.election._id
        }
      );

      if (response.data.success) {
        toast.success('Vote recorded successfully!');
        
        setElections(prev => ({
          ...prev,
          hasVoted: true,
          candidates: prev.candidates.map(candidate => 
            candidate._id === selectedCandidate
              ? { ...candidate, votes: (candidate.votes || 0) + 1 }
              : candidate
          )
        }));
      }
    } catch (error) {
      console.error('Voting error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit vote');
    } finally {
      setIsSubmitting(false);
      setSelectedCandidate(null);
    }
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
              <span className="ml-4 text-lg font-semibold">Loading...</span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md w-full">
              <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4 mx-auto" />
              <h2 className="text-xl font-bold text-blue-800 mb-2">Loading Election Data</h2>
              <p className="text-blue-600">Please wait while we load the election information...</p>
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
              <span className="ml-4 text-lg font-semibold">Error</span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md w-full">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <FaTimesCircle className="text-blue-600 text-3xl" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 mb-2">Error Loading Elections</h2>
              <p className="text-blue-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!elections.election) {
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
              <span className="ml-4 text-lg font-semibold">No Elections</span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md w-full">
              <h2 className="text-xl font-bold text-blue-800 mb-2">No Active Elections</h2>
              <p className="text-blue-600">There are currently no active elections available.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (elections.hasVoted) {
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
              <span className="ml-4 text-lg font-semibold">Thank You</span>
            </div>
          )}

          <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center w-full">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-6">
                <FaCheckCircle className="text-blue-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Thank You for Voting!</h2>
              <p className="text-blue-600 mb-6">
                You have already cast your vote in the <span className="font-semibold">{elections.election.name}</span> election.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate('/candidate/profile')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition shadow-sm"
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
            <span className="ml-4 text-lg font-semibold">{elections.election.name}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-blue-100">
              <div className="bg-blue-600 p-6 text-white">
                <h1 className="text-2xl font-bold">{elections.election.name}</h1>
                <div className="flex items-center mt-2 text-blue-100">
                  <FaCalendarAlt className="mr-2" />
                  <span>
                    {new Date(elections.election.startDate).toLocaleDateString()} - {' '}
                    {new Date(elections.election.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
                <FaVoteYea className="mr-2 text-blue-600" />
                Cast Your Vote
              </h2>
              <p className="text-blue-600 mb-6">
                Please select one of the candidates below to vote for them in the {elections.election.name} election.
              </p>

              <div className="space-y-4 mb-8">
                {elections.candidates.map(candidate => (
                  <div 
                    key={candidate._id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCandidate === candidate._id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-blue-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedCandidate(candidate._id)}
                  >
                    <div className="flex items-center">
                      {candidate.photo ? (
                        <img 
                          src={candidate.photo} 
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-200"
                        />
                      ) : (
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 border-2 border-blue-200">
                          <FaUserTie className="text-blue-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-blue-800">{candidate.name}</h3>
                        <p className="text-blue-600 text-sm">{candidate.email}</p>
                        <p className="text-blue-500 text-sm mt-1 font-medium">
                          Current Votes: {candidate.votes || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleVote}
                  disabled={!selectedCandidate || isSubmitting}
                  className={`px-6 py-3 rounded-lg text-white font-medium ${
                    !selectedCandidate || isSubmitting
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                  } transition flex items-center`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaVoteYea className="mr-2" />
                      Submit Vote
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateActiveElections;