import { useState } from "react";
import { format } from "date-fns";
import { FiCalendar, FiAward, FiUsers } from "react-icons/fi";
import CandidateSideNav from "../../Components/navigation/CandidateSideNav";

const Elections = () => {
  // State management - now only showing elections relevant to candidate
  const [elections] = useState([
    {
      id: "elec-1",
      name: "Student Council",
      positions: ["President", "Secretary"],
      deadline: "2023-12-31T23:59",
      isActive: true,
    },
    {
      id: "elec-2",
      name: "Class Representative",
      positions: ["Class Rep"],
      deadline: "2023-11-15T23:59",
      isActive: false,
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Side Navigation */}
      <div className="fixed left-0 top-0 bottom-0 w-64 z-10">
        <CandidateSideNav />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen p-6 md:p-8 overflow-y-auto">
        {/* Header Section - Updated for candidate view */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            My Elections
          </h1>
          <p className="text-gray-600 mt-1">View your current elections</p>
        </header>

        {/* Elections Grid */}
        {elections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

// Simplified ElectionCard without management controls
const ElectionCard = ({ election }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
    {/* Election Header */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{election.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            election.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {election.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>

    {/* Election Details */}
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
          <FiCalendar className="mr-2" /> Deadline
        </h4>
        <p className="text-gray-700">
          {format(new Date(election.deadline), "MMM dd, yyyy hh:mm a")}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
          <FiUsers className="mr-2" /> Positions
        </h4>
        <div className="flex flex-wrap gap-2">
          {election.positions.map((position, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {position}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Simplified EmptyState without create option
const EmptyState = () => (
  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
    <div className="mx-auto w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
      <FiAward size={28} />
    </div>
    <h3 className="text-xl font-medium text-gray-800 mb-2">
      No elections available
    </h3>
    <p className="text-gray-500 mb-6">
      There are currently no elections assigned to you
    </p>
  </div>
);

export default Elections;
