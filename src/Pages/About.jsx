// src/pages/About.jsx
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import AboutInfo from "../components/About/AboutInfo";
import Contact from "../components/About/Contact";
import { ThemeContext } from "../context/ThemeContext"; // Make sure this path is correct

const About = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 mt-[100px] ${
        isDark ? "bg-transpare text-white" : "bg-white text-black"
      }`}
    >

      <AboutInfo />
      <Contact />
    </div>
  );
};

export default About;



