// src/routes/AppRoutes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import CommunityWork from "../pages/CommunityWork";
import LeaderBoard from "../pages/LeaderBoard";
// import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // your layout component with e.g. Header, Footer
    children: [
      { index: true, element: <Home /> },                 // "/"
      { path: "leaderboard", element: <LeaderBoard /> }, // "/leaderboard"
      { path: "about", element: <About /> },             // "/about"
      { path: "community-work", element: <CommunityWork /> }, // "/communitywork"
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFound />,  // fallback 404 page
  // },
]);

export default router;
