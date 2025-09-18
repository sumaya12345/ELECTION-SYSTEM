import React, { useEffect, useState } from 'react';
import { FiCalendar, FiUsers, FiBarChart2, FiSettings } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

function GlopalDashboard({ userType = 'admin' }) {
  const [dashboardStats, setDashboardStats] = useState({
    activeElections: 0,
    registeredCandidates: 0,
    totalUsers: 0,
    votedUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeElections, setActiveElections] = useState([]);

  const userData = {
    admin: {
      name: "Admin User",
      email: "admin@example.com",
    },
    candidate: {
      name: "Candidate User",
      email: "candidate@example.com",
    },
    voter: {
      name: "Voter User",
      email: "voter@example.com",
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch data based on user type
        const endpoints = {
          admin: [
            'http://localhost:5000/api/dashboard/stats',
            'http://localhost:5000/api/dashboard/active-elections',
            'http://localhost:5000/api/dashboard/voting-progress'
          ],
          candidate: [
            'http://localhost:5000/api/candidate/stats',
            'http://localhost:5000/api/candidate/active-elections'
          ],
          voter: [
            'http://localhost:5000/api/voter/stats',
            'http://localhost:5000/api/voter/active-elections'
          ]
        };

        const responses = await Promise.all(
          endpoints[userType].map(url => axios.get(url))
        );

        // Process responses based on user type
        if (userType === 'admin') {
          setDashboardStats({
            activeElections: responses[0].data.stats.activeElections,
            registeredCandidates: responses[0].data.stats.registeredCandidates,
            totalUsers: responses[2].data.stats.totalUsers,
            votedUsers: responses[2].data.stats.votedUsers
          });
          setActiveElections(responses[1].data.elections || []);
        } else {
          setDashboardStats({
            activeElections: responses[0].data.stats.activeElections,
            registeredCandidates: responses[0].data.stats.registeredCandidates || 0,
            totalUsers: responses[0].data.stats.totalUsers || 0,
            votedUsers: responses[0].data.stats.votedUsers || 0
          });
          setActiveElections(responses[1].data.elections || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userType]);

  // Format numbers with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  // Calculate changes for stats cards
  const calculateChanges = () => {
    return {
      electionsChange: "+2 this week",
      candidatesChange: "+5 today"
    };
  };

  const changes = calculateChanges();

  return (
    <div className="min-h-screen  bg-gradient-to-r from-black via-blue-950 to-purple-950">
      {/* Main Content Area */}
      <main className="min-h-screen p-8 overflow-y-auto">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-300 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
 Dashboard
              </h1>
              <div className="flex items-center mt-3">
                <span className="inline-block w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
                <span className="inline-block w-6 h-1.5 bg-indigo-300 rounded-full ml-1"></span>
                <span className="inline-block w-3 h-1.5 bg-indigo-200 rounded-full ml-1"></span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-white">
            Welcome back, <span className="font-medium"></span>.
            Here's what's happening today.
          </p>
        </header>

        {/* Stats Grid - Adjusted based on user type */}
        <div className={`grid gap-6 mb-10 ${userType === 'admin' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          <StatCard
            title="Active Elections"
            value={loading ? "..." : dashboardStats.activeElections}
            icon={<FiCalendar className="text-indigo-600" size={24} />}
            change={changes.electionsChange}
            changeType="positive"
            loading={loading}
          />
          {userType === 'admin' && (
            <StatCard
              title="Registered Candidates"
              value={loading ? "..." : dashboardStats.registeredCandidates}
              icon={<FiUsers className="text-green-600" size={24} />}
              change={changes.candidatesChange}
              changeType="positive"
              loading={loading}
            />
          )}
        </div>

        {/* Active Elections Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md mb-10">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">
              Active Elections
            </h3>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : activeElections && activeElections.length > 0 ? (
              <div className="space-y-4">
                {activeElections.map((election) => (
                  <div key={election._id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-800">{election.name}</h4>
                        <p className="text-sm text-gray-500">{election.position}</p>
                      </div>
                      {userType === 'admin' && (
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {election.candidateCount} candidates
                          </p>
                        </div>
                      )}
                    </div>
                    {userType === 'admin' && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ 
                              width: `${election.totalVotes > 0 && dashboardStats.totalUsers > 0 ? 
                                Math.min(100, (election.totalVotes / dashboardStats.totalUsers) * 100) : 0}%` 
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                          <span>
                            {Math.round(
                              election.totalVotes > 0 && dashboardStats.totalUsers > 0 ? 
                              (election.totalVotes / dashboardStats.totalUsers) * 100 : 0
                            )}% participation
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 text-gray-400">
                <FiCalendar size={48} className="mr-4" />
                <p>No active elections currently</p>
              </div>
            )}
          </div>
        </div>

        {/* Voting Progress Section - Only for admin */}
        {userType === 'admin' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                Voting Progress
              </h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Total Voters: {formatNumber(dashboardStats.totalUsers)}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        Voted: {formatNumber(dashboardStats.votedUsers)} ({Math.round((dashboardStats.votedUsers / dashboardStats.totalUsers) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-green-500 h-4 rounded-full" 
                        style={{ width: `${(dashboardStats.votedUsers / dashboardStats.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// StatCard Component
const StatCard = ({ title, value, icon, change, changeType, loading }) => {
  const changeColor = changeType === "positive" ? "text-green-600" : "text-red-600";
  const changeIcon = changeType === "positive" ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? (
                <span className="inline-block h-8 w-16 bg-gray-200 rounded animate-pulse"></span>
              ) : (
                value
              )}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          {!loading && (
            <div className={`${changeColor} text-sm font-medium inline-flex items-center`}>
              {changeIcon}
              <span className="ml-1">{change}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlopalDashboard;