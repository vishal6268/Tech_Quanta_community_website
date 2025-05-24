import React, { useEffect, useState } from "react";
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
        <section className="min-h-screen w-full px-4 sm:px-8 lg:px-16 py-12 flex flex-col items-center justify-center text-white text-center font-[Poppins]">
          <div className="flex flex-wrap justify-center gap-4 my-6">
            {/* 3D Tilt Feature Buttons with different rotation per button */}

            {/* Hero Section */}
            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl text-black  dark:text-white  font-sans-serif sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Online Sessions & Workshops <span className="inline-block">For</span>
                <div className="relative inline-block overflow-hidden h-[1.2em] ml-2">
                  <span
                    className={`relative z-10 px-2 inline-block transition-all duration-500 ${isAnimating
                      ? 'translate-y-full -translate-x-4 opacity-0'
                      : 'translate-y-0 translate-x-0 opacity-100'
                      }`}
                  >
                    {words[currentWord]}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-8 md:h-10 bg-[#2ECC71] dark:bg-purple-400 z-0 transition-all duration-500 transform -rotate-2 ${isAnimating
                      ? 'translate-y-full -translate-x-8'
                      : 'translate-y-0 translate-x-0'
                      }`}
                    style={{ borderRadius: '8px', transformOrigin: 'center' }}
                  ></span>
                </div>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-6 mb-10 max-w-3xl mx-auto">
                WeMakeDevs is an inclusive global community for anyone passionate about
                technology. We foster collaboration and innovation through global events.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto font-exo2"
                  as="button"
                  className="dark:bg-black bg-transparent flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full"
                  onClick={() => window.open("/community-work")}
                >
                  <span>Upcomming Events !</span>
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto"
                  as="button"
                  className="bg-gradient-to-r from-blue-600 font-exo2 to-blue-500 text-white flex items-center justify-center space-x-2 px-6 py-3 text-sm backdrop-blur-md cursor-pointer w-full"
                  onClick={() => window.location.href = "/community-work"}
                >
                  <span>Explore</span>
                </HoverBorderGradient>
              </div>
            </div>
          </div>
        </section>
      </HeroHighlight>

      {/* Core Team Section */}
       <section className="h-full dark:bg-[#121212] text-white px-6 flex flex-col items-center justify-center font-[Poppins] text-center pt-36 overflow-hidden">
         <div className="flex justify-center items-center h-full w-full px-4 py-5 pt-0">
        <CoreTeam />
      </div>
       <div className="flex justify-center items-center h-full w-screen py-5 pt-0">
        <Volunteers />
      </div>
       <div className="flex justify-center flex-col items-center h-full w-full px-4 py-5 pt-0">
      <HeroHighlight>
          <span className="text-black dark:text-white  font-mono text-7xl text-center mb-5">Community Partners</span>
       <AnimatedTestimonials testimonials={testimonials} />
      </HeroHighlight>
      </div>
    </section>
    </>
  );
};

export default Home;
