// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import UpcomingEvents from "../components/CommunityWork/UpcommingEvents";
import FeaturingRepos from "../components/CommunityWork/FeaturingRepos";
import FeaturingProject from "../components/CommunityWork/FeatureProject";
import Loading from "../components/ui/loader"; // Adjust path if different
import BecomeSpeakerSection from "../components/CommunityWork/BecomeSpeaker";

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
  <div className="min-h-screen transition-colors duration-300 mt-[100px] bg-white text-black dark:bg-transparent dark:text-white pb-20">
    {isLoading ? (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Loading message="Running Quantum Scripts..." />
      </div>
    ) : (
      <>
        <UpcomingEvents />
        <BecomeSpeakerSection />
        <FeaturingProject />
        <FeaturingRepos />
      </>
    )}
  </div>
);

};

export default About;
