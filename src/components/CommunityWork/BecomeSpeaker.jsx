// BecomeSpeakerSection.jsx

import React from "react";

const BecomeSpeakerSection = () => {
  return (
    <section className="bg-transparent text-white py-16 px-4 flex flex-col items-center gap-8">
      {/* Glowing Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text- text-green-400 animate-pulse drop-shadow-lg">
        Become The <span className="text-white">Speaker</span> 🌟
      </h2>

      {/* Banner with Glow */}
<div className="w-full max-w-7xl rounded-xl overflow-hidden shadow-2xl border-none bg-gradient-to-br from-zinc-900 to-zinc-800">
  <img
    src="BecomeSpeakerBanner.png"
    alt="Become a Speaker Banner"
    className="w-full h-64 sm:h-70 object-fit"
  />
</div>


      {/* Call to Action Button */}
      <button className="mt-6 px-6 py-3 rounded-full text-black font-semibold bg-gradient-to-r from-[#00BFFF] to-blue-400 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 shadow-md hover:scale-105">
        🎤 Do Workshop / Sessions
      </button>
    </section>
  );
};

export default BecomeSpeakerSection;
