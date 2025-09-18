import SideNav from "./sideNav";

const AdminSideNav = ({ userData }) => (
  <SideNav userRole="admin" userData={userData} />
);

export default AdminSideNav;
