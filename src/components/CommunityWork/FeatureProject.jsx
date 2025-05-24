import React from 'react';

const FeaturingProject = () => {
  return (
    <>
    
      <style>
        {`
          .glow {
            box-shadow: 0 0 25px 4px rgba(34, 197, 94, 0.5);
            transition: box-shadow 0.3s ease;
          }
          .glow:hover {
            box-shadow: 0 0 25px 4px rgba(59, 130, 246, 0.6); /* blue-500 */
          }
        `}
      </style>

      <div className="bg-[#121212] text-white px-6 py-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-green-400 mb-10">Featuring Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Card */}
            <div className="bg-white text-black p-8 rounded-2xl shadow-md flex flex-col justify-between h-full aspect-[4/3]">
              <div>
                <h3 className="text-3xl font-bold mb-4">Project Title</h3>
                <p className="text-sm font-semibold mb-6">Project Description</p>
              </div>
              <div className="flex gap-4 mt-auto">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md">
                  Get Project
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md">
                  Get Project
                </button>
              </div>
            </div>

            {/* Right Image Card with glow */}
            <div className="rounded-2xl overflow-hidden border border-green-500 glow h-full aspect-[4/3]">
              <img
                src="../../../public/featureProject.jpg" 
                alt="Project"
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
