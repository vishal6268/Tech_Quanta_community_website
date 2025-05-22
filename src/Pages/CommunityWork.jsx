import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function SliderShowcase() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef(null);
  const delay = 7000;

  const fetchSlides = async () => {
    try {
      const response = await axios.get(
        'https://script.google.com/macros/s/AKfycbwVRv4cREwQw1NR0RzZbhOcUQ3MKzvOV4H1Gdv6TkYwbTdYKMBxRauVfu_hA6ACFBkaTw/exec'
      );
      if (Array.isArray(response.data)) {
        setSlides(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch slide data:', error);
    }
  };

  const nextSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setAnimate(true);
    }, 300);
  };

  const prevSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimate(true);
    }, 300);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    setAnimate(true);
    timeoutRef.current = setTimeout(nextSlide, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, slides]);

  if (slides.length === 0) {
    return <div className="text-white p-10">Loading slides...</div>;
  }

  const current = slides[currentIndex];

  return (
    <div className="relative w-screen xl:w-full min-h-[70vh] font-[Rajdhani] overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out scale-110 will-change-transform`}
        style={{ backgroundImage: `url(${current.image})`, zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Caption Container */}
      <div className="relative z-10 flex items-center justify-start h-full px-6 sm:px-10 lg:px-20 py-24">
        <div
          className={`bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-2xl transition-all duration-1000 ease-in-out ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-md leading-tight">
            {current.title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200 leading-relaxed drop-shadow">
            {current.description}
          </p>
          {current.link && (
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md shadow-lg transition"
            >
              Register Now
            </a>
          )}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white text-4xl bg-white/10 hover:bg-cyan-500/50 p-2 rounded-full shadow-md backdrop-blur-md"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white text-4xl bg-white/10 hover:bg-cyan-500/50 p-2 rounded-full shadow-md backdrop-blur-md"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full cursor-pointer transition duration-300 ${
              currentIndex === index ? 'bg-cyan-400 scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
