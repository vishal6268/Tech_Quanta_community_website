// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const CommunityWork = () => {
  return (
    <section className="min-h-screen bg-[#121212] text-white pt-24 px-6 flex flex-col items-center justify-center font-[Poppins] text-center">
      <Helmet>
        <title>Services | TechQuanta</title>
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

export default CommunityWork;
