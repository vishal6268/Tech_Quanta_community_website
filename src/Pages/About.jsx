// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet";
import AboutInfo from "../components/About/AboutInfo"; 
import Contact from "../components/About/Contact";

const About = () => {
  return (
    <section className="min-h-screen text-white pt-24 px-6 flex flex-col items-center justify-center font-[Poppins] text-center">
      <Helmet>
        <title>About | TechQuanta</title>
        <meta
          name="description"
          content="Engage in ......"
        />
      </Helmet>
      <AboutInfo />
      <Contact />
      {/* Tagline */}
    </section>
  );
};

export default About;
