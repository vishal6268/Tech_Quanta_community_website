// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import AboutInfo from "../components/About/AboutInfo";
import Contact from "../components/About/Contact";
import Loading from "../components/ui/loader"; // Adjust path if different

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleContentReady = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(handleContentReady);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 mt-[100px] bg-white text-black dark:bg-transparent dark:text-white">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
          <Loading message="Running Quantum Scripts..." />
        </div>
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
