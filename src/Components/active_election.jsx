import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

const ActiveElection = () => {
  const [activeElections, setActiveElections] = useState([]);
  const [candidates, setCandidates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedElection, setExpandedElection] = useState(null);
  const [votingInProgress, setVotingInProgress] = useState({});
  
  // Get userData from localStorage
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return dateString ? format(parseISO(dateString), "MMM dd, yyyy h:mm a") : "N/A";
    } catch {
      return "Invalid date";
    }
  };

  // Get election status
  const getStatusDisplay = (election) => {
    const now = new Date();
    const startDate = new Date(election.startDate);
    const endDate = new Date(election.endDate);
    
    let status = election.status;
    if (startDate > now) status = "upcoming";
    else if (endDate < now) status = "completed";
    else status = "active";

    return {
      text: status.charAt(0).toUpperCase() + status.slice(1),
      class: status === "active" ? "bg-green-100 text-green-800" :
            status === "completed" ? "bg-gray-100 text-gray-800" :
            "bg-blue-100 text-blue-800",
      isActive: status === "active"
    };
  };

  // Handle voting
  const handleVote = async (electionId, candidateId) => {
    if (!userData?._id) {
      toast.error("Please login to vote");
      return;
    }

    // Check locally first
    if (hasVotedInElection(electionId)) {
      toast.error("You've already voted in this election");
      return;
    }

    setVotingInProgress(prev => ({ ...prev, [candidateId]: true }));

    try {
      const response = await axios.post(
        `http://localhost:5000/candidates/vote/${candidateId}`,
        { 
          userId: userData._id,
          electionId
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update candidates state
        setCandidates(prev => ({
          ...prev,
          [electionId]: prev[electionId].map(c => 
            c._id === candidateId 
              ? { ...c, votes: response.data.candidate.votes } 
              : c
          )
        }));

        // Update user data
        const updatedUserData = {
          ...userData,
          votes: response.data.userVotes
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setUserData(updatedUserData);

        toast.success("Vote recorded successfully!");
      }
    } catch (error) {
      console.error("Voting error:", error);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         "Failed to submit vote";
      toast.error(errorMessage);
    } finally {
      setVotingInProgress(prev => ({ ...prev, [candidateId]: false }));
    }
  };

  // Check if user voted in election
  const hasVotedInElection = (electionId) => {
    if (!userData?.votes) return false;
    return userData.votes.some(v => 
      v.electionId && v.electionId.toString() === electionId.toString()
    );
  };

  // Fetch elections and candidates
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get active elections
      const electionsRes = await axios.get('http://localhost:5000/elections/active', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const electionsData = electionsRes.data || [];
      
      // Get candidates for each election
      const candidatesData = {};
      await Promise.all(electionsData.map(async (election) => {
        try {
          const candidatesRes = await axios.get(
            `http://localhost:5000/candidates/${election._id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
          );
          candidatesData[election._id] = candidatesRes.data.candidates || [];
        } catch (err) {
          console.error(`Error fetching candidates for election ${election._id}:`, err);
          candidatesData[election._id] = [];
        }
      }));

      setActiveElections(electionsData);
      setCandidates(candidatesData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch elections");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter elections
  const filteredElections = activeElections.filter(election => 
    election.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    election.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-8 text-red-500">
      Error: {error}
      <button 
        onClick={fetchData}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Active Elections</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search elections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-6">
        {filteredElections.map(election => {
          const statusDisplay = getStatusDisplay(election);
          const userVoted = hasVotedInElection(election._id);

          return (
            <div key={election._id} className="border rounded-lg p-6 shadow-sm bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{election.name}</h2>
                  <p className="text-gray-600 mt-1">{election.position}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {formatDate(election.startDate)} - {formatDate(election.endDate)}
                  </p>
                  <span className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${statusDisplay.class}`}>
                    {statusDisplay.text}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedElection(prev => 
                    prev === election._id ? null : election._id
                  )}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {expandedElection === election._id ? "Hide" : "View"} Candidates
                </button>
              </div>

              {expandedElection === election._id && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Candidates</h3>
                  {candidates[election._id]?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {candidates[election._id].map(candidate => (
                        <div key={candidate._id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={candidate.photo || "/default-avatar.png"} 
                              alt={candidate.name}
                              className="w-12 h-12 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                              <h4 className="font-medium">{candidate.name}</h4>
                              <p className="text-sm text-gray-600">Votes: {candidate.votes || 0}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleVote(election._id, candidate._id)}
                            disabled={!statusDisplay.isActive || userVoted || votingInProgress[candidate._id]}
                            className={`px-4 py-2 rounded-md min-w-[100px] transition-colors ${
                              !statusDisplay.isActive || userVoted
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : votingInProgress[candidate._id]
                                  ? "bg-blue-400 text-white cursor-wait"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >
                            {userVoted ? "✓ Voted" : 
                             votingInProgress[candidate._id] ? "Processing..." : 
                             "Vote"}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No candidates available for this election</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveElection;