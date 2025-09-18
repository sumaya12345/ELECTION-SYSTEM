import React from "react";
import Navbar from "./Components/home_component/Navbar";
import Footer from "./Components/home_component/Footer";
import AppRoutes from "./routes"; // Assuming you have a routes.jsx file

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <AppRoutes />
      {/* / /    <Footer /> */}
    </div>
  );
}

export default App;
