import SideNav from "./sideNav";

const VoterSideNav = ({ userData }) => (
  <SideNav userRole="voter" userData={userData} />
);

export default VoterSideNav;
