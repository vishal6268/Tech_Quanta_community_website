import React, { useState, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaBug } from "react-icons/fa";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";

const rotatingImages = [
  "/SearchIMg1.gif",
  "/SearchIMG2.gif",
  "/SearchIMG3.gif",
];

export default function LeaderBoard() {
  const { userStats: leaderboardData, loading, error } = useGitHubLeaderboardData();
  const [searchTerm, setSearchTerm] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const searchResultRef = useRef(null);

  // Rotate search icon every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Search for exact username match
  const searchedUser = useMemo(() => {
    if (!searchTerm.trim()) return null;
    return leaderboardData.find(
      (user) => user.username.toLowerCase() === searchTerm.toLowerCase()
    );
  }, [searchTerm, leaderboardData]);

  // Handle sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!searchResultRef.current) return;
      const rect = searchResultRef.current.getBoundingClientRect();
      setIsSticky(rect.top <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchTerm]);
function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-64 w-full"
      style={{ minHeight: "16rem" }}
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-12 w-12 text-green-500 dark:text-green-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading spinner"
        role="img"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p
        className="mt-4 font-semibold text-lg select-none"
        style={{
          color: "var(--color-accent, #2ECC71)",
          userSelect: "none",
        }}
      >
        Loading leaderboard...
      </p>
    </motion.div>
  );
}

  if (loading) return <div className="text-black p-4 justify-center items-center"><Loading/></div>;
  if (error) return <div className="text-red-500 p-4 justify-center items-center">{error}</div>;

  return (
    <div className="relative pt-[100px] min-h-screen w-full bg-transparent text-white p-8">
      {/* Heading and Search */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-wider select-none font-['Rajdhani'] text-[#2ECC71]">
          Community Leaderboard
        </h1>

        <div className="w-full max-w-md">
          <div className="flex items-center gap-8 bg-white/10 backdrop-blur-lg px-4 py-3 rounded-full border border-white/10 shadow-lg">
            <img
              src={rotatingImages[imageIndex]}
              alt="Search icon"
              className="w-7 h-7 rounded-full object-contain"
            />
            <input
              type="text"
              placeholder="Search username (exact)..."
              className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none text-base font-semibold font-['Exo 2']"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Search Result Display */}
      <motion.div
        ref={searchResultRef}
        layout
        initial={false}
        animate={{
          position: isSticky ? "fixed" : "relative",
          top: isSticky ? 0 : "auto",
          left: isSticky ? 0 : "auto",
          right: isSticky ? 0 : "auto",
          margin: isSticky ? "0 auto" : "0",
          padding: isSticky ? "6px 20px" : "24px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: isSticky
            ? "0 4px 10px rgba(46, 204, 113, 0.4)"
            : "0 8px 30px rgba(255,255,255,0.15)",
          borderRadius: isSticky ? "0 0 1rem 1rem" : "1.5rem",
          zIndex: 999,
          width: isSticky ? "100%" : "auto",
          maxWidth: isSticky ? "100vw" : "auto",
          display: "flex",
          alignItems: "center",
          gap: isSticky ? "1rem" : "0",
          flexDirection: isSticky ? "row" : "column",
          // subtle tilt effect on sticky for viewpoint change
          rotateX: isSticky ? 5 : 0,
          transition: "all 0.4s ease-in-out",
        }}
        className="shadow-lg text-center mb-10"
      >
        {searchedUser ? (
          <>
            <motion.img
              src={searchedUser.avatar}
              alt={searchedUser.username}
              layout
              animate={{ width: isSticky ? 48 : 96, height: isSticky ? 48 : 96 }}
              className={`rounded-full shadow-lg object-cover`}
            />
            <div
              className={`${
                isSticky ? "text-left" : "text-center"
              } flex flex-col justify-center flex-1`}
            >
              <motion.h2
                layout
                animate={{ fontSize: isSticky ? "1.25rem" : "2rem" }}
                className="font-bold text-[#2ECC71]"
              >
                {searchedUser.username}
              </motion.h2>
              <motion.p
                layout
                animate={{ fontSize: isSticky ? "0.8rem" : "1rem" }}
                className="text-gray-300"
              >
                Score: <span className="font-semibold">{searchedUser.score}</span>
              </motion.p>
            </div>

            <motion.div
              layout
              animate={{ fontSize: isSticky ? "0.9rem" : "1.1rem" }}
              className="flex gap-6 text-white"
            >
              <span title="Commits" className="flex items-center gap-1">
                <FaCodeBranch /> {searchedUser.commits}
              </span>
              <span title="Pull Requests" className="flex items-center gap-1">
                <FaGithub /> {searchedUser.pullRequests}
              </span>
              <span title="Issues" className="flex items-center gap-1">
                <FaBug /> {searchedUser.issues}
              </span>
            </motion.div>
          </>
        ) : (
          <p
            className={`text-gray-400 font-light ${
              isSticky ? "text-left pl-4" : "text-center"
            }`}
            style={{ fontSize: isSticky ? "0.9rem" : "1.125rem" }}
          >
            {searchTerm
              ? "No user found with that exact username."
              : "Search by exact GitHub username to view details here."}
          </p>
        )}
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto rounded-2xl border border-white/20 shadow-lg bg-white/10 backdrop-blur-md"
        style={{ paddingTop: isSticky ? "130px" : "0" }} // add padding-top to avoid content hidden behind sticky bar
      >
        <table className="w-full text-white text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-white/30 bg-white/5">
              <th className="py-3 px-4 w-[50px] text-center">#</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Commits</th>
              <th className="py-3 px-4">Pull Requests</th>
              <th className="py-3 px-4">Issues</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {leaderboardData.map((user, index) => (
                <motion.tr
                  key={user.username}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`border-b border-white/20 cursor-pointer hover:bg-white/20 ${
                    searchedUser?.username === user.username
                      ? "bg-[#2ECC71]/30 font-semibold"
                      : ""
                  }`}
                  onClick={() => setSearchTerm(user.username)}
                >
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    {user.username}
                  </td>
                  <td className="py-2 px-4">{user.score}</td>
                  <td className="py-2 px-4">{user.commits}</td>
                  <td className="py-2 px-4">{user.pullRequests}</td>
                  <td className="py-2 px-4">{user.issues}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

