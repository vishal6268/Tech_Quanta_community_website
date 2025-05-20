import React, { useState, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaBug } from "react-icons/fa";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";

const rotatingImages = ["/SearchIMg1.gif", "/SearchIMG2.gif", "/SearchIMG3.gif"];

export default function LeaderBoard() {
  const { userStats: leaderboardData = [], loading, error } = useGitHubLeaderboardData();
  const [searchTerm, setSearchTerm] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const searchResultRef = useRef(null);

  // Rotate icon
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Sticky search scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!searchResultRef.current) return;
      const rect = searchResultRef.current.getBoundingClientRect();
      setIsSticky(rect.top <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchTerm]);

  // Exact search
  const searchedUser = useMemo(() => {
    if (!searchTerm.trim()) return null;
    return leaderboardData.find(
      (user) => user.username.toLowerCase() === searchTerm.toLowerCase()
    );
  }, [searchTerm, leaderboardData]);

  const Loading = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-64 w-full "
    >
      <svg
        className="animate-spin h-12 w-12 text-green-500 dark:text-green-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="mt-4 font-semibold text-lg select-none text-[#2ECC71]">Loading leaderboard...</p>
    </motion.div>
  );

  if (loading) return <div className="p-4 text-center"><Loading /></div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="relative pt-[100px] min-h-screen w-full bg-transparent text-white p-4 sm:p-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 items-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider select-none font-['Rajdhani'] text-[#2ECC71]">
          Community Leaderboard
        </h1>
        <div className="w-full max-w-md">
          <div className="flex items-center gap-4 sm:gap-8 bg-white/10 backdrop-blur-lg px-4 py-3 rounded-full border border-white/10 shadow-lg">
            <img
              src={rotatingImages[imageIndex]}
              alt="Search icon"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-contain"
            />
            <input
              type="text"
              placeholder="Search username (exact)..."
              className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none text-sm sm:text-base font-semibold font-['Exo 2']"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

       {/* Sticky Search Result Display */}
      <motion.div
        ref={searchResultRef}
        layout
        animate={{
          position: isSticky ? "fixed" : "relative",
          top: isSticky ? 0 : "auto",
          left: isSticky ? 0 : "auto",
          right: isSticky ? 0 : "auto",
          margin: isSticky ? "0 auto" : "0",
          padding: isSticky ? "8px 20px" : "24px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: isSticky
            ? "0 -4px 10px rgba(46, 204, 112, 0.64)"
            : "0 8px 30px rgba(255,255,255,0.15)",
          borderRadius: isSticky ? "1rem 1rem 0 0" : "1.5rem",
          zIndex: 999,
          width: "100%",
          maxWidth: "100vw",
          display: "flex",
          alignItems: "center",
          gap: isSticky ? "1rem" : "0",
          flexDirection: isSticky ? "row" : "column",
          rotateX: isSticky ? 5 : 0,
        }}
        className="shadow-lg text-center mt-10"
      >
        {searchedUser ? (
          <>
            <motion.img
              src={searchedUser.avatar}
              alt={searchedUser.username}
              animate={{ width: isSticky ? 48 : 96, height: isSticky ? 48 : 96 }}
              className="rounded-full shadow-lg object-cover"
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
              className="hidden md:flex gap-6 text-white"
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
              ? " "
              : " "}
          </p>
        )}
      </motion.div>


      {/* Responsive Leaderboard */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10"
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/20 shadow-lg bg-white/10 backdrop-blur-md">
          <table className="w-full text-white text-left min-w-[700px]">
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
                    className={`border-b border-white/20 hover:bg-white/20 ${
                      searchedUser?.username === user.username ? "bg-[#2ecc7140]" : ""
                    }`}
                  >
                    <td className="py-2 px-4 text-center">{index + 1}</td>
                    <td className="py-2 px-4 flex items-center gap-3">
                      <img src={user.avatar} alt={user.username} className="w-9 h-9 rounded-full object-cover" />
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
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {leaderboardData.map((user, index) => (
            <motion.div
              key={user.username}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className={`bg-white/10 border border-white/20 backdrop-blur-md p-4 rounded-xl shadow-md ${
                searchedUser?.username === user.username ? "border-[#2ECC71]" : ""
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-[#2ECC71]">{user.username}</h3>
                  <p className="text-sm text-gray-300">Score: {user.score}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-white">
                <span><FaCodeBranch className="inline" /> {user.commits}</span>
                <span><FaGithub className="inline" /> {user.pullRequests}</span>
                <span><FaBug className="inline" /> {user.issues}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
