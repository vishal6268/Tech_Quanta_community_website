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
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-transpare text-white" : "bg-white text-black"
      }`}
    >
      <Helmet>
        <title>About | TechQuanta</title>
        <meta
          name="description"
          content="Learn more about TechQuanta and our mission to empower open source minds."
        />
      </Helmet>

      <AboutInfo />
      <Contact />
    </div>
  );
};

export default About;



