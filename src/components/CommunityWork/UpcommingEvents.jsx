import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

// Digit Component
const Digit = ({ value }) => {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlip(false);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <span className="relative w-6 h-8 text-tech-green dark:text-green-400 font-mono">
      <span className={`absolute inset-0 flex items-center justify-center ${flip ? 'animate-flipOut' : ''}`}>
        {prev.toString().padStart(2, '0')}
      </span>
      <span className={`absolute inset-0 flex items-center justify-center ${flip ? 'animate-flipIn' : ''}`}>
        {value.toString().padStart(2, '0')}
      </span>
    </span>
  );
};

// Countdown Timer
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setTimeLeft(null);
      setTimeLeft({
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff / 36e5) % 24),
        minutes: Math.floor((diff / 6e4) % 60),
        seconds: Math.floor((diff / 1e3) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!timeLeft) return null;
  return (
    <div className="mt-6 flex gap-1 text-tech-green dark:text-green-400 font-mono text-lg tracking-widest select-none">
      <span>Event starts in:</span>
      <Digit value={timeLeft.days} /><span className="opacity-70">d :</span>
      <Digit value={timeLeft.hours} /><span className="opacity-70">h :</span>
      <Digit value={timeLeft.minutes} /><span className="opacity-70">m :</span>
      <Digit value={timeLeft.seconds} /><span className="opacity-70">s</span>
    </div>
  );
};

// Main SliderShowcase
export default function SliderShowcase() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const timeoutRef = useRef(null);
  const delay = 7000;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_GOOGLE_MACRO_API);
        const events = res.data?.events || [];
        const data = events.map(e => ({
          image: e.post_link || '',
          title: e.event_heading || 'Untitled Event',
          description: e.event_description || '',
          link: e.event_registration_link || '',
          date: e.event_date || '2025-12-31T23:59:59Z',
        }));
        setSlides(data);
        sessionStorage.setItem('slides', JSON.stringify(data));
      } catch (err) {
        console.error('Slide fetch failed', err);
      }
    })();
  }, []);

  const changeSlide = useCallback((i) => {
    if (animating || slides.length === 0) return;
    setAnimating(true);
    setFadeIn(false);
    setTimeout(() => {
      setIndex(i);
      setFadeIn(true);
      setAnimating(false);
    }, 400);
  }, [animating, slides.length]);

  const next = useCallback(() => changeSlide((index + 1) % slides.length), [index, slides.length, changeSlide]);
  const prev = useCallback(() => changeSlide((index - 1 + slides.length) % slides.length), [index, slides.length, changeSlide]);

  useEffect(() => {
    if (!slides.length) return;
    setFadeIn(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [index, slides, next]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  if (!slides.length) {
    return <div className="text-primary p-10 text-center select-none">Loading events...</div>;
  }

  const { image, title, description, link, date } = slides[index];

  return (
    <section className="relative w-screen xl:w-full min-h-[60vh] font-space-grotesk overflow-hidden select-none" aria-label="Image slider">
      <div className="absolute inset-0 bg-cover bg-center scale-110 animate-pulseBackground" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent dark:from-secondary/80 dark:via-secondary/70" />
      <div className="relative z-10 flex items-center justify-start h-full px-6 sm:px-10 lg:px-20 py-24">
        <article className={`rounded-xl p-8 max-w-2xl bg-white/20 backdrop-blur-md dark:bg-secondary/70 dark:backdrop-blur-lg transition-all duration-700 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-exo2 font-extrabold text-white drop-shadow-md">{title}</h1>
          <p className="mt-6 text-md text-gray-300 dark:text-gray-300 leading-relaxed">{description}</p>
          <CountdownTimer targetDate={date} />
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 px-6 py-3 bg-tech-green hover:bg-primary text-white rounded-md hover:text-white shadow-lg transition focus:ring-2 focus:ring-offset-2 focus:ring-tech-green dark:bg-[#27ae60] dark:hover:bg-[#1DA1F2]">
              Register Now
            </a>
          )}
        </article>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        disabled={animating}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white text-4xl bg-white/20 hover:bg-primary/60 py-8 px-2 rounded-full shadow-xl backdrop-blur-md transition duration-300 dark:bg-secondary dark:hover:bg-primary"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        disabled={animating}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white text-4xl bg-white/20 hover:bg-primary/60 py-8 px-2 rounded-full shadow-xl backdrop-blur-md transition duration-300 dark:bg-secondary dark:hover:bg-primary"
        aria-label="Next Slide"
      >
        ›
      </button>
    </section>
  );
}
