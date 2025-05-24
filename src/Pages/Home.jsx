// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HoverBorderGradient } from './../components/ui/hover-border-gradient';
import CoreTeam from "../components/LandingPage/CoreTeam";
import Volunteers from "../components/LandingPage/Volunteer";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

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

   const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
  <>
     <HeroHighlight>
       <section className="h-full bg-transparent text-white px-6 flex flex-col items-center justify-center font-[Poppins] text-center pt-36">


      <div className="min-h-screen bg-gray-50 bg-transparent font-['Inter',_system-ui,_sans-serif]">
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
                className={`${button.color} ${button.border} border-4 rounded-full px-4 py-1 font-bold text-lg text-gray-50 transform transition-transform hover:scale-105 cursor-pointer`}
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
                  className={`relative text-gray-200 z-10 px-2 inline-block transition-all duration-500 ${isAnimating ? 'translate-y-full -translate-x-4 opacity-0' : 'translate-y-0 translate-x-0 opacity-100'
                    }`}
                >
                  {words[currentWord]}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-8 md:h-10 bg-orange-400 z-0 transition-all duration-500 transform -rotate-2 ${isAnimating ? 'translate-y-full -translate-x-8' : 'translate-y-0 translate-x-0'
                    }`}
                  style={{
                    borderRadius: '8px',
                    transformOrigin: 'center'
                  }}
                ></span>
              </div>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto my-8">
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
           {/* <div className="w-full h-[127px] bg-[#121212] absolute bottom-0 left-0"></div> */}

    </section>
     </HeroHighlight>
       <section className="h-full dark:bg-[#121212] text-white px-6 flex flex-col items-center justify-center font-[Poppins] text-center pt-36">
         <div className="flex justify-center items-center h-full w-full px-4 py-5 pt-0">
        <CoreTeam />
      </div>
       <div className="flex justify-center items-center h-full w-full px-4 py-5 pt-0">
        <Volunteers />
      </div>
       <div className="flex justify-center flex-col items-center h-full w-full px-4 py-5 pt-0">
      <HeroHighlight>
          <span className="text-white text-7xl text-center mb-5">Community Founders</span>
       <AnimatedTestimonials testimonials={testimonials} />
      </HeroHighlight>
      </div>
    </section>
  </>
  );
};

export default Home;
