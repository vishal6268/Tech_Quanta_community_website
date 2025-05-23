import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./context/ThemeContext";

// Components
import Header from "./components/NavBar/Navigation";
// import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import CommunityWork from "./pages/CommunityWork";
import LeaderBoard from "./pages/LeaderBoard";

// Layout component to wrap the pages with Header and Outlet for nested routes
const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    {/* <Footer /> */}
  </>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Use a layout route to wrap your pages */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="about" element={<About />} />
            <Route path="community-work" element={<CommunityWork />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
          theme="colored"
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
