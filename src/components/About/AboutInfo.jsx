import React from "react";
import { motion } from "framer-motion";

const AboutInfo = () => {
  return (
    <section className="bg-[#121212] text-white py-20 px-6 md:px-12 lg:px-24 font-[rajdhani]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-start"
        >
          <img
            src="/public/About.jpg"
            alt="Online Onword Logo"
            className="w-[300px] h-auto rounded-xl shadow-2xl border border-[#2ECC71]"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-4xl font-bold text-[#2ECC71] mb-4">
            About 
          </h2>
          <h3 className="text-gray-400 text-lg mb-6">
            A community initiative empowering people to explore open source, stay motivated, and grow together.
          </h3>
          <p className="text-gray-200 leading-relaxed mb-4">
            Online Onword is a passionate online community that inspires and connects individuals to dive into the world of open source. Whether you're just starting out or already building, we provide the support and motivation to keep you moving forward.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm mb-4">
            Alongside open-source awareness, we offer valuable services including graphic designing, website development, online courses, events, and seminars—all delivered remotely to ensure accessibility for everyone.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            Join us to learn, build, and thrive in a space where innovation meets opportunity—completely online.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutInfo;
