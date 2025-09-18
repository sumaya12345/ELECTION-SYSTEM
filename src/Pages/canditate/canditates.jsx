import { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import CandidateCard from "../../Components/CandidateCard";
import CandidateSideNav from "../../Components/navigation/CandidateSideNav";

const Candidates = () => {
  const [candidates] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "President",
      bio: "2nd year Computer Science student with leadership experience",
      photo: null,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Secretary",
      bio: "3rd year Political Science major with event planning background",
      photo: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Navigation */}
      <div className="fixed left-0 top-0 bottom-0 w-64 z-10">
        <CandidateSideNav />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen p-6 md:p-8 overflow-y-auto">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Candidates</h1>
            <p className="text-gray-600">View election candidates</p>
          </div>

          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              {searchTerm
                ? "No matching candidates"
                : "No candidates available"}
            </h3>
            <p className="text-gray-500 mt-1">
              {searchTerm
                ? "Try a different search term"
                : "Check back later for candidate information"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Candidates;
