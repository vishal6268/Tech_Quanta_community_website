// src/pages/About.jsx
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AboutInfo from "../components/About/AboutInfo";
import Contact from "../components/About/Contact";
import Loading from "../components/ui/loader"; // Adjust path if different

const About = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading (replace this with real checks if needed)
    const handleContentReady = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulates loading time

    return () => clearTimeout(handleContentReady);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 mt-[100px] ${
        isDark ? "bg-transpare text-white" : "bg-white text-black"
      }`}
    >
      {isLoading ? (
        <Loading message="Running Quantum Scripts..." />
      ) : (
        <>
          <AboutInfo />
          <Contact />
        </>
      )}
    </div>
  );
};

export default About;
