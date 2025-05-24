import React from "react";

const BecomeSpeakerSection = () => {
  return (
    <section
      className="
        w-full 
        bg-transparent
        dark:from-[#14171A] dark:to-[#1a1a1a] 
        text-gray-900 dark:text-white 
        py-20 px-4 
        transition-colors duration-500
        font-rajdhani
      "
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <h2
          className="
            text-left 
            text-4xl sm:text-5xl md:text-6xl 
            font-space-grotesk font-bold tracking-tight leading-tight
            bg-clip-text text-transparent 
            bg-gradient-to-r from-primary to-tech-green
          "
        >
          Become a Speaker
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed  font-space-grotesk">
          Share your expertise and passion with a vibrant community by hosting
          workshops, sessions, or talks. Whether you're an industry professional,
          educator, or enthusiast, this is your opportunity to inspire others,
          expand your network, and showcase your unique insights. Join us to
          empower minds and drive meaningful conversations that spark innovation
          and growth.
        </p>

        {/* Banner Container */}
        <div
          className="
            relative 
            w-full 
            overflow-hidden 
            dark:shadow-[0_10px_40px_rgba(0,0,0,0.7)]
            transition-shadow duration-500
          "
        >
          {/* Banner Image */}
          <img
            src="/BecomeSpeakerBanner.png"
            alt="Become a Speaker Banner"
            className="w-full h-auto object-cover max-h-auto"
          />

          {/* Desktop Overlay CTA */}
          <div className="hidden md:flex absolute inset-0 justify-end items-center  sp-6 md:p-10 bg-gradient-to-b from-black/0 to-black/0 backdrop-blur-[1px]">
            <button
              className="
                px-6 py-3
                bg-gradient-to-r from-primary to-tech-green
                hover:from-tech-black hover:to-primary
                text-white font-semibold tracking-wide
                rounded-md
                border-none
                transition-all duration-300 ease-in-out
                transform hover:scale-105 animate-pulseGlow
                focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-60
              "
              aria-label="Host a Workshop or Session"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSevjGT1Nh8mNyc8MBovZn3EX1X_9P85OmozpJTe6edUkRpPDw/viewform?usp=header",
                  "_blank"
                )
              }
            >
              🎤 Host a Workshop or Session
            </button>
          </div>
        </div>

        {/* Mobile CTA (appears below image) */}
        <div className="flex md:hidden justify-center mt-6">
          <button
  className="
    w-full max-w-md
    px-6 py-4

    bg-gradient-to-r from-primary to-tech-green
    hover:from-tech-green hover:to-primary
    text-white font-semibold text-lg tracking-wide
    rounded-full
    shadow-[0_0_20px_#2ECC71]
    dark:shadow-[0_0_25px_#00bfff]
    transition-all duration-300 ease-in-out
    transform hover:scale-105
    animate-pulseGlow
    focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-60
  "
  aria-label="Host a Workshop or Session"
  onClick={() =>
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSevjGT1Nh8mNyc8MBovZn3EX1X_9P85OmozpJTe6edUkRpPDw/viewform?usp=header",
      "_blank"
    )
  }
>
  🎤 Host a Workshop or Session
</button>

        </div>
      </div>
    </section>
  );
};

export default BecomeSpeakerSection;
