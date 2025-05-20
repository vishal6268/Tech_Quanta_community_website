import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/NavBar/Navigation';
import Home from './pages/Home';
import CommunityWork from "./pages/CommunityWork";
import LeaderBoard from "./pages/LeaderBoard";
import About from "./pages/About";
import "./App.css";

const memojiList = [
  "/memoji1.png",
  "/memoji2.png",
  "/memoji3.png",
  "/memoji4.png",
  "/memoji5.png",
  "memoji6.png",
  "/memoji7.png"
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMemojiIndex, setCurrentMemojiIndex] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Set theme based on system preference or allow for manual override
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");

    // Memoji cycling
    const memojiInterval = setInterval(() => {
      setCurrentMemojiIndex((prevIndex) => (prevIndex + 1) % memojiList.length);
    }, 100);

    // Stop loading after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(memojiInterval);
    }, 3000);

    return () => {
      clearInterval(memojiInterval);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={`astro-loader theme-${theme}`}>
        <div className="bg-blur" />
        <div className="shine-ring" />

        <img
          src={memojiList[currentMemojiIndex]}
          alt="Loading Memoji"
          className="memoji-animate"
        />

        <h1 className="astro-title">Tech Quanta</h1>
        <p className="astro-tagline">
          Empowering Open Source Minds<br />
          Code the Future. Sustain the Planet.
        </p>
        <div className="glow-pulse" />

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap');

          :root {
            --bg-dark: radial-gradient(circle at center, #121212 0%, #1E1E1E 100%);
            --bg-light: radial-gradient(circle at center, #e9f3ff 0%, #f5f5f5 100%);
            --text-dark: #F8F8FF;
            --text-light: #1e1e1e;
            --tagline-dark: #B0BEC5;
            --tagline-light: #37474F;
          }

          .theme-dark {
            --bg: var(--bg-dark);
            --text: var(--text-dark);
            --tagline: var(--tagline-dark);
          }

          .theme-light {
            --bg: var(--bg-light);
            --text: var(--text-light);
            --tagline: var(--tagline-light);
          }

          .astro-loader {
            position: fixed;
            inset: 0;
            background: var(--bg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 9999;
            color: var(--text);
            font-family: 'Space Grotesk', sans-serif;
            text-align: center;
            padding: 2rem;
          }

          .bg-blur {
            position: absolute;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle, rgba(0, 191, 255, 0.1), transparent);
            filter: blur(120px);
            animation: floatGlow 6s ease-in-out infinite;
            z-index: 0;
          }

          .shine-ring {
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: conic-gradient(from 90deg, #00BFFF, #8E44AD, #00BFFF);
            animation: spin 10s linear infinite;
            opacity: 0.15;
            z-index: 1;
          }

          .memoji-animate {
            width: clamp(90px, 20vw, 140px);
            height: clamp(90px, 20vw, 140px);
            object-fit: contain;
            z-index: 2;
            animation: riseUp 0.6s ease-out forwards, floatY 3s ease-in-out infinite;
          }

          .astro-title {
            font-size: clamp(2rem, 6vw, 4rem);
            font-weight: bold;
            background: linear-gradient(90deg, #00BFFF, #8E44AD);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
            z-index: 2;
            margin-top: 1.2rem;
          }

          .astro-tagline {
            font-size: clamp(1rem, 2.5vw, 1.4rem);
            color: var(--tagline);
            margin-top: 1rem;
            z-index: 2;
          }

          .glow-pulse {
            width: 14px;
            height: 14px;
            background: #2ECC71;
            border-radius: 50%;
            margin-top: 2rem;
            animation: pulse 1.2s ease-in-out infinite;
            z-index: 2;
          }

          @keyframes floatGlow {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-30px) scale(1.05); }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.3); opacity: 1; }
          }

          @keyframes riseUp {
            from {
              transform: translateY(60px) scale(0.6);
              opacity: 0;
            }
            to {
              transform: translateY(0px) scale(1);
              opacity: 1;
            }
          }

          @keyframes floatY {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div data-theme={theme}>
        <Header />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/communitywork' element={<CommunityWork />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
