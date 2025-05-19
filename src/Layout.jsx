// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar/Navigation";
// import Footer from "./components/Footer/Footer";
// import "./Layout.css"; // Import your CSS file for styling


const Layout = () => {
  return (
    <div>
      <Navbar />
      <main >
        <Outlet /> {/* This renders the route's child */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
