// src/routes/AppRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import CommunityWork from "../pages/CommunityWork";
import LeaderBoard from "../pages/LeaderBoard";
import NotFound from "../pages/NotFound"; // Optional 404 Page

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <LeaderBoard /> },
      { path: "about", element: <About /> },
      { path: "community-work", element: <CommunityWork /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Optional fallback page
  },
]);

export default router;
