// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

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
      {/* Tagline */}
      <p className="text-[#2ECC71] font-semibold tracking-wide text-sm md:text-base uppercase mb-2">

        ## Temporary Template do need to change okay testing because of Navbar
        Empowering Open Source Minds
      </p>


    </section>
  );
};

export default About;
