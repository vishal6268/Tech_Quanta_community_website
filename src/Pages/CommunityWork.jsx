// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import UpcomingEvents from "../components/CommunityWork/UpcommingEvents";
import Loading from "../components/ui/loader"; // Adjust path if different

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading (replace with real checks if needed)
    const handleContentReady = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulates loading time

    return () => clearTimeout(handleContentReady);
  }, []);

  return (
    <div
      className="min-h-screen transition-colors duration-300 mt-[100px] bg-white text-black dark:bg-transparent dark:text-white"
    >
      {isLoading ? (
        <Loading message="Running Quantum Scripts..." />
      ) : (
        <UpcomingEvents />
      )}
    </div>
  );
};

export default About;
