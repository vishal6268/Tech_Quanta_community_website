// src/routes/AppRoutes.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import CommunityWork from "../pages/CommunityWork"; // Optional 404 Page

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // { path: "projects", element: <Projects /> },
      { path: "about", element: <About /> },
      { path: "CommunityWork", element: <CommunityWork /> },
    ],
  },
  {
    path: "*",
    // element: <NotFound />, // Optional fallback page
  },
]);

export default router;
