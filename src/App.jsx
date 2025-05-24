import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "./context/ThemeContext";

// Components
import Header from "./components/NavBar/Navigation";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import CommunityWork from "./pages/CommunityWork";
import LeaderBoard from "./pages/LeaderBoard";


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/">
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
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
