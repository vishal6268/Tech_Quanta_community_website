import React from 'react';

const FeaturingProject = () => {
  return (
    <>

      <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white px-6 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-16">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk tracking-tight bg-white bg-clip-text text-transparent">
            Featuring Projects
          </h2>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full ">
            {/* Project Details Card */}
            <div className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-l-3xl shadow-2xl border border-white/10 flex h-full text-left justify-center">
              <div className="flex flex-col justify-center items-start gap-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold">Quantum App</h3>
                  <p className="text-base font-medium text-gray-300 leading-relaxed">
                    A futuristic web-based application that leverages quantum-inspired design, real-time interactivity, and smooth animations across all devices. Built with elegance and performance in mind.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition font-semibold tracking-wide">
                    GitHub
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md transition font-semibold tracking-wide">
                    Live Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project Video using iframe with glow */}
            <div className="rounded-r-3xl overflow-hidden border-t-2 border-r-2 border-b-2 border-green-400 aspect-[4/3] w-full max-w-xl mx-auto glow-custom">
              <iframe
                src="https://www.youtube.com/embed/ly36kn0ug4k?si=NwPEdeAGsRT8rcTv"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturingProject;
