


import React from "react";
import { Routes, Route } from "react-router-dom";

// Public routes
import Home from "./Pages/home/Home";
import Login from "./Pages/home/Login";
import Register from "./Pages/home/Register";
import About from "./Pages/home/about";
import Contact from "./Pages/home/Contact";
import Candidates from "./Pages/canditate/canditates";
import ActiveElectionsPage from "./Components/active_election";
import CandidateActiveElections from "./Pages/canditate/CandidateActiveElections";
import CandidateLogin from "./Pages/home/CandidateLogin"
// Admin routes
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminDashboard from "./Pages/admin/adminDashboard";
import AdminElections from "./Pages/admin/Elections";
import AdminCandidates from "./Pages/admin/Candidates";
import AdminVoters from "./Pages/admin/Voters";
import AdminResults from "./Pages/admin/Results";
import Messages from "./Pages/admin/Messages";
import Settings from "./Pages/admin/Settings";


// Voter routes
import VoterProfiles from "./Pages/voter/VoterProfile";
import VoterResults from "./Pages/voter/Results";
import VoterActiveElections from "./Pages/voter/VoterActiveElections";
import VoterDashboard from "./Pages/voter/voterDashboard";

// Candidate routes
import CandidateProfile from "./Pages/canditate/Profile";
import CandidateElections from "./Pages/canditate/Elections";
import CandidateResults from "./Pages/canditate/Results";
import CandidateDashboard from "./Pages/canditate/candidateDashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/active/elections" element={<ActiveElectionsPage />} />
      

      {/* Admin Routes */}
      
      <Route path="/admin/" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/elections" element={<AdminElections />} />
      <Route path="/admin/candidates" element={<AdminCandidates />} />
      <Route path="/admin/voters" element={<AdminVoters />} />
      <Route path="/admin/results" element={<AdminResults />} />
      <Route path="/admin/messages" element={<Messages />} />
      <Route path="/admin/settings" element={<Settings/>} />
      

      {/* Voter Routes */}
      <Route path="/voter/profile" element={<VoterProfiles />} />
      <Route path="/voter/results" element={<VoterResults />} />
      <Route path="/voter/Dashboard" element={<VoterDashboard />} />
      <Route
        path="/voter/VoterActiveElections"
        element={<VoterActiveElections />}
      />
      {/* Candidate Routes */}
      <Route path="/candidate/profile" element={<CandidateProfile />} />
      <Route path="/candidate/elections" element={<CandidateElections />} />
      <Route path="/candidate/results" element={<CandidateResults />} />
      <Route path="/candidate/Candidates" element={<Candidates />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/candidate/" element={<CandidateLogin />} />
      <Route
        path="/candidate/candidateActiveElections"
        element={<CandidateActiveElections />}
      />
      C{/* Fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;

