
// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FiUsers, FiCode, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

const About = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white pt-24 px-6 flex flex-col items-center justify-center font-[Rajdhani] text-center max-w-4xl mx-auto">
      <Helmet>
        <title>About | TechQuanta</title>
        <meta
          name="description"
          content="Discover TechQuanta — your hub for open source innovation, collaboration, and tech growth."
        />
      </Helmet>
      {/* Tagline */}
      <motion.p
        className="uppercase mb-4 font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400"
        {...fadeIn(0)}
      >
        Empowering Open Source Minds
      </motion.p>

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        {...fadeIn(0.2)}
      >
        Innovate. Collaborate. <br />
        Transform the Future of Tech.
      </motion.h1>

      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mb-8 mx-auto"
        {...fadeIn(0.4)}
      ></motion.div>

      <motion.p
        className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
        {...fadeIn(0.6)}
      >
        At <span className="text-green-400 font-semibold">TechQuanta</span>, we believe in the power of community-driven innovation. Our mission is to connect passionate developers and creators worldwide to build{" "}
        <span className="text-teal-400 font-semibold">open source</span> projects that make a real impact.
      </motion.p>
      <motion.p
        className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
        {...fadeIn(0.8)}
      >
        Whether you’re a seasoned coder or just starting your tech journey, TechQuanta offers a space to learn, share, and grow together in a supportive environment.
      </motion.p>

      {/* Icon Features */}
      <motion.div
        className="flex flex-col md:flex-row justify-center gap-10 mb-12"
        {...fadeIn(1)}
      >
        <div className="flex flex-col items-center max-w-xs text-center">
          <FiUsers className="text-green-400 text-5xl mb-3" />
          <h3 className="text-xl font-semibold mb-1">Community Driven</h3>
          <p className="text-gray-300">
            Connect with developers globally to share ideas and collaborate.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xs text-center">
          <FiCode className="text-teal-400 text-5xl mb-3" />
          <h3 className="text-xl font-semibold mb-1">Open Source Projects</h3>
          <p className="text-gray-300">
            Build and contribute to meaningful projects that power the future.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xs text-center">
          <FiGlobe className="text-green-400 text-5xl mb-3" />
          <h3 className="text-xl font-semibold mb-1">Global Impact</h3>
          <p className="text-gray-300">
            Empower developers worldwide and foster technology for good.
          </p>
        </div>
      </motion.div>

      <motion.div {...fadeIn(1.2)}>
        <Link
          to="/community"
          className="inline-block bg-gradient-to-r from-green-400 to-teal-400 hover:from-teal-400 hover:to-green-400 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300"
        >
          Join Our Community
        </Link>
      </motion.div>
    </section>
  );
};

export default About;

