// src/components/Layout/Layout.jsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";


import Header from "../components/NavBar/Navigation";
import Footer from "../components/Footer/Footer";
import Notification from "../components/ui/notification";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* Notification with default message */}
      <Notification message="🙏 Grateful for your visit! Welcome!" />
    </>
  );
};

export default Layout;
