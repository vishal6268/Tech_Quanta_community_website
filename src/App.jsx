import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/NavBar/Navigation';
import Home from './pages/Home';
import CommunityWork from "./pages/CommunityWork";
import LeaderBoard from "./pages/LeaderBoard";
import About from "./pages/About";
import "./App.css";
import "./Layout.css";

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
            <Route path='/leaderboard' element={<LeaderBoard/>}/>
            <Route path='/about' element={<About />} />
            {/* <Route path='*' element={<PageNotFound />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
