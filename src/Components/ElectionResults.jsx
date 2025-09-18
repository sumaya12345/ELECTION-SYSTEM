import React from "react";
import { FiBarChart2, FiDownload, FiUser } from "react-icons/fi";

const ElectionResults = ({
  election,
  onPublishToggle,
  onExport,
  showControls = false,
  showDetails = true,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with publish toggle (only shown if showControls=true) */}
      {showControls && (
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {election.name} Results
            </h1>
            <p className="text-gray-600">
              Total Votes: {election.totalVotes.toLocaleString()} • Turnout:{" "}
              {election.turnout}%
            </p>
          </div>
          <button
            onClick={onPublishToggle}
            className={`flex items-center px-4 py-2 rounded-md ${
              election.isPublished
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {election.isPublished ? (
              <>
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Published
              </>
            ) : (
              <>
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                Unpublished
              </>
            )}
          </button>
        </div>
      )}

      {/* Results by Position */}
      <div className="space-y-8">
        {election.positions.map((position) => (
          <div
            key={position.name}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{position.name}</h2>

              {/* Chart + Numbers */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Pie Chart */}
                <div className="w-full md:w-1/3">
                  <div className="relative h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {position.candidates[0].percentage}%
                        </p>
                        <p className="text-sm text-gray-500">
                          Leading Candidate
                        </p>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {position.candidates.map((candidate, idx) => {
                        const startAngle =
                          idx === 0
                            ? 0
                            : position.candidates
                                .slice(0, idx)
                                .reduce((sum, c) => sum + c.percentage, 0) *
                              3.6;
                        const endAngle =
                          startAngle + candidate.percentage * 3.6;

                        return (
                          <path
                            key={candidate.id}
                            d={`M 50,50 L ${
                              50 +
                              Math.cos(((startAngle - 90) * Math.PI) / 180) * 50
                            },${
                              50 +
                              Math.sin(((startAngle - 90) * Math.PI) / 180) * 50
                            } A 50,50 0 ${
                              candidate.percentage > 50 ? 1 : 0
                            },1 ${
                              50 +
                              Math.cos(((endAngle - 90) * Math.PI) / 180) * 50
                            },${
                              50 +
                              Math.sin(((endAngle - 90) * Math.PI) / 180) * 50
                            } Z`}
                            fill={candidate.color}
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Candidate Breakdown */}
                <div className="w-full md:w-2/3">
                  <div className="space-y-4">
                    {position.candidates.map((candidate) => (
                      <div key={candidate.id} className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
                          {candidate.photo ? (
                            <img
                              src={candidate.photo}
                              alt={candidate.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FiUser className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">
                              {candidate.name}
                            </span>
                            {showDetails ? (
                              <span>
                                {candidate.votes.toLocaleString()} votes (
                                {candidate.percentage}%)
                              </span>
                            ) : (
                              <span>{candidate.percentage}%</span>
                            )}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${candidate.percentage}%`,
                                backgroundColor: candidate.color,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export Options (only shown if showControls=true) */}
      {showControls && (
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={() => onExport("pdf")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <FiDownload /> Export as PDF
          </button>
          <button
            onClick={() => onExport("csv")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <FiDownload /> Export as CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default ElectionResults;
