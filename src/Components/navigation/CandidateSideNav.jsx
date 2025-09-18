import SideNav from "./sideNav";

const CandidateSideNav = ({ userData, electionStats = {} }) => (
  <SideNav
    userRole="candidate"
    userData={userData}
    electionStats={{
      activeElections: electionStats.activeElections || 0,
      pendingElections: electionStats.pendingElections || 0,
      pendingApplications: electionStats.pendingApplications || 0,
    }}
  />
);

export default CandidateSideNav;
