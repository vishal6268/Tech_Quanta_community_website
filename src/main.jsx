import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const memojiList = [
  "/memoji1.webp",
  "/memoji2.webp",
  "/memoji3.webp",
  "/memoji4.webp",
  "/memoji5.webp",
  "/memoji6.webp",
  "/memoji7.webp",
];

function Main() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentMemojiIndex, setCurrentMemojiIndex] = useState(0);
  // const [theme, setTheme] = useState("dark");

  // useEffect(() => {
  //   const memojiInterval = setInterval(() => {
  //     setCurrentMemojiIndex((prev) => (prev + 1) % memojiList.length);
  //   }, 100);

  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //     clearInterval(memojiInterval);
  //   }, 2000);

  //   return () => {
  //     clearInterval(memojiInterval);
  //     clearTimeout(timer);
  //   };
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div
  //       className={`fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-[9999] font-rajdhani text-center p-4
  //         ${
  //           theme === "dark"
  //             ? "bg-[#121212] text-[#d1d5db]"
  //             : "bg-white text-[#111827]"
  //         }`}
  //     >
  //       <div className="absolute inset-0 bg-[#00bfff0f] blur-[80px] -z-10" aria-hidden="true" />
  //       <div className="absolute w-40 h-40 rounded-full bg-[#00bfff30] -z-20" aria-hidden="true" />
  //       <img
  //         src={memojiList[currentMemojiIndex]}
  //         alt="Loading Memoji"
  //         className="w-24 h-24 object-contain rounded-full"
  //       />
  //       <h1 className="mt-4 text-2xl font-semibold z-10 text-inherit">Tech Quanta</h1>
  //       <p className="mt-1 text-base text-inherit z-10 leading-relaxed">
  //         Empowering Open Source Minds
  //         <br />
  //         Code the Future. Sustain the Planet.
  //       </p>
  //       <div className="w-2.5 h-2.5 bg-[#2ECC71] rounded-full mt-4 animate-pulseGlow z-10" />
  //     </div>
  //   );
  // }

  return (
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider>
            <App />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
