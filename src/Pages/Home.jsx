// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HoverBorderGradient } from './../components/ui/hover-border-gradient';
import CoreTeam from "../components/LandingPage/CoreTeam";

const words = ['Developers', 'Students', 'Professionals', 'Engineers', 'Creators'];

const Home = () => {

    const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (

    <section className="h-full dark:bg-[#121212] text-white px-6 flex flex-col items-center justify-center font-[Poppins] text-center pt-36">


        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] font-['Inter',_system-ui,_sans-serif]">
      <main className="container mx-auto px-4 py-5 md:py-5">
        {/* Feature Buttons */}
        <div className="flex flex-wrap justify-center gap-4 my-2 pb-2">
          {[
            { label: 'Code', color: 'bg-orange-300', border: 'border-orange-400' },
            { label: 'Create', color: 'bg-green-300', border: 'border-green-400' },
            { label: 'Connect', color: 'bg-purple-300', border: 'border-purple-400' }
          ].map((button) => (
            <div 
              key={button.label}
              className={`${button.color} ${button.border} border-4 rounded-full px-4 py-1 font-bold text-lg transform transition-transform hover:scale-105 cursor-pointer`}
            >
              {button.label}
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <div className="text-center px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6">
            Hackathons & Meetups <span className="inline-block whitespace-nowrap">For</span>
            <div className="relative inline-block overflow-hidden h-[1.2em] ml-2">
              <span 
                className={`relative text-gray-200 z-10 px-2 inline-block transition-all duration-500 ${
                  isAnimating ? 'translate-y-full -translate-x-4 opacity-0' : 'translate-y-0 translate-x-0 opacity-100'
                }`}
              >
                {words[currentWord]}
              </span>
              <span 
                className={`absolute -bottom-1 left-0 right-0 h-8 md:h-10 bg-orange-400 z-0 transition-all duration-500 transform -rotate-2 ${
                  isAnimating ? 'translate-y-full -translate-x-8' : 'translate-y-0 translate-x-0'
                }`}
                style={{
                  borderRadius: '8px',
                  transformOrigin: 'center'
                }}
              ></span>
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto my-8">
            WeMakeDevs is an inclusive global community for anyone passionate about 
            technology. We foster collaboration and innovation through global events.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-12 mb-16">
          <HoverBorderGradient
                                    containerClassName="rounded-full w-full sm:w-auto"
                                    as="button"
                                    className="dark:bg-black bg-transparent flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full"
                                >
                                    <span>Join Our Community</span>
                                </HoverBorderGradient>
            <HoverBorderGradient
                                    containerClassName="rounded-full w-full sm:w-auto"
                                    as="button"
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center space-x-2 px-6 py-3 text-sm backdrop-blur-md cursor-pointer w-full"
                                >
                                    <span>Events</span>
                                </HoverBorderGradient>
        </div>
      </main>
    </div>

   {/* <div className="flex justify-center items-center h-full w-full px-4 py-5">
     <CoreTeam />
   </div> */}


      {/* Tagline */}
      <p className="text-[#2ECC71] font-semibold tracking-wide text-sm md:text-base uppercase mb-2">

        ## Temporary Template do need to change okay testing because of Navbar
        Empowering Open Source Minds
      </p>


    </section>
  );
};

export default Home;
