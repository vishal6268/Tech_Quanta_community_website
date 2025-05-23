import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Components
import Header from "./components/NavBar/Navigation";
// import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import CommunityWork from "./pages/CommunityWork";
import LeaderBoard from "./pages/LeaderBoard";

// Layout component wrapping header + outlet for pages
function RootLayout() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

// Define routes with children under RootLayout
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "leaderboard", element: <LeaderBoard /> },
      { path: "about", element: <About /> },
      { path: "community-work", element: <CommunityWork /> },
    ],
  },
]);

export default router;
