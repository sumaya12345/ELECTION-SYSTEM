import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiPieChart,
  FiSettings,
  FiMessageSquare,
  FiUser,
  FiAward,
  FiClock,
  FiLogOut,
} from "react-icons/fi";

const NavItem = ({ to, icon, label, badgeCount, onClick }) =>
  to ? (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-blue-700 text-white font-medium shadow-md"
            : "text-blue-100 hover:bg-blue-600 hover:text-white"
        }
      `}
      end
    >
      <div className="flex items-center">
        <span className={`mr-3 text-lg ${icon.props.className || ""}`}>
          {icon}
        </span>
        {label}
      </div>
      {badgeCount > 0 && (
        <span
          className={`${
            isActive ? "bg-black text-blue-700" : "bg-blue-500 text-white"
          } text-xs font-medium px-2 py-0.5 rounded-full`}
        >
          {badgeCount}
        </span>
      )}
    </NavLink>
  ) : (
    <div
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-200 cursor-pointer text-blue-100 hover:bg-blue-600 hover:text-white"
    >
      <div className="flex items-center">
        <span className="mr-3 text-lg">{icon}</span>
        {label}
      </div>
      {badgeCount > 0 && (
        <span className="bg-black text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {badgeCount}
        </span>
      )}
    </div>
  );

const SideNav = ({ userRole = "voter", userData = {}, electionStats = {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const navConfig = {
    admin: {
      items: [
        {
          to: "/admin/dashboard",
          icon: <FiHome className="text-blue-100" />,
          label: "Dashboard",
        },
        {
          to: "/admin/elections",
          icon: <FiCalendar className="text-blue-100" />,
          label: "Elections",
          badgeCount: electionStats.pendingElections || 0,
        },
        {
          to: "/admin/candidates",
          icon: <FiUsers className="text-blue-100" />,
          label: "Candidates",
        },
        {
          to: "/admin/voters",
          icon: <FiUsers className="text-blue-100" />,
          label: "Voters",
        },
        {
          to: "/admin/results",
          icon: <FiPieChart className="text-blue-100" />,
          label: "Results",
        },
        {
          to: "/admin/messages",
          icon: <FiMessageSquare className="text-blue-100" />,
          label: "Messages",
        },
        {
          to: "/admin/settings",
          icon: <FiSettings className="text-blue-100" />,
          label: "Settings",
        },
        {
          icon: <FiLogOut className="text-blue-100" />,
          label: "Logout",
          onClick: handleLogout,
        },
      ],
      brandName: "Admin Portal",
      brandIcon: "A",
    },
    candidate: {
      items: [
        {
          to: "/candidate/dashboard",
          icon: <FiHome className="text-blue-100" />,
          label: "Dashboard",
        },
        {
          to: "/candidate/candidateActiveElections",
          icon: <FiClock className="text-blue-100" />,
          label: "Active Elections",
          badgeCount: electionStats.activeElections || 0,
        },
        {
          to: "/candidate/profile",
          icon: <FiUser className="text-blue-100" />,
          label: "My Profile",
        },
        {
          to: "/candidate/results",
          icon: <FiPieChart className="text-blue-100" />,
          label: "Results",
        },
        {
          icon: <FiLogOut className="text-blue-100" />,
          label: "Logout",
          onClick: handleLogout,
        },
      ],
      brandName: "Candidate Portal",
      brandIcon: "C",
    },
    voter: {
      items: [
        {
          to: "/voter/dashboard",
          icon: <FiHome className="text-blue-100" />,
          label: "Dashboard",
        },
        {
          to: "/voter/VoterActiveElections",
          icon: <FiCalendar className="text-blue-100" />,
          label: "Active Elections",
          badgeCount: electionStats.activeElections || 0,
        },
        {
          to: "/voter/profile",
          icon: <FiUser className="text-blue-100" />,
          label: "Profile",
        },
        {
          to: "/voter/results",
          icon: <FiPieChart className="text-blue-100" />,
          label: "View Results",
        },
        {
          icon: <FiLogOut className="text-blue-100" />,
          label: "Logout",
          onClick: handleLogout,
        },
      ],
      brandName: "Voter Portal",
      brandIcon: "V",
    },
  };

  const { items, brandName, brandIcon } =
    navConfig[userRole] || navConfig.voter;

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64  bg-gradient-to-r from-black via-blue-950 to-purple-950 shadow-xl border-r border-blue-700 flex flex-col z-50">
      {/* Logo/Branding */}
      <div className="p-5 border-b border-blue-700 bg-blue-900">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-md">
            <span className="text-blue-800 font-bold text-lg">{brandIcon}</span>
          </div>
          <span className="text-xl font-semibold text-white">{brandName}</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {items.map((item, index) => (
          <NavItem
            key={item.to || `logout-${index}`}
            to={item.to}
            icon={item.icon}
            label={item.label}
            badgeCount={item.badgeCount || 0}
            onClick={item.onClick}
          />
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-700 bg-blue-900">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center shadow-inner border border-blue-600">
            <span className="text-white font-medium">
              {userData?.name?.substring(0, 2).toUpperCase() || "US"}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {userData?.name || "User"}
            </p>
            <p className="text-xs text-blue-200 capitalize">
              {userRole || "user"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
