import { FiUser, FiEdit2, FiTrash2 } from "react-icons/fi";

const CandidateCard = ({ candidate, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {/* Candidate Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 flex items-center gap-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-lg font-medium">
          {candidate.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{candidate.name}</h3>
          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mt-1">
            {candidate.position}
          </span>
        </div>
      </div>

      {/* Candidate Details */}
      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Biography</h4>
          <p className="text-gray-700 line-clamp-3">
            {candidate.bio || "No biography provided"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
          <button
            onClick={() => onEdit(candidate)}
            className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FiEdit2 size={16} />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={() => onDelete(candidate.id)}
            className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <FiTrash2 size={16} />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
