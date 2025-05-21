import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Adjust path if needed
import axios from "axios"; // Make sure axios is imported
import { FiFilter } from "react-icons/fi";
import { FaGithub, FaBug } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery"; // Custom hook, make sure path is correct

const sortFunctions = {
  scoreDesc: (a, b) => b.score - a.score,
  scoreAsc: (a, b) => a.score - b.score,
  alphaAZ: (a, b) => a.username.localeCompare(b.username),
  alphaZA: (a, b) => b.username.localeCompare(a.username),
};

const rotatingImages = [
  "/SearchIMg1.gif",
  "/SearchIMG2.gif",
  "/SearchIMG3.gif",
];
 const badges = [
    { src: "/communitychampion.png", name: "Community Champion" },
    { src: "/conversationalist.png", name: "Conversation List" },
    { src: "/initiator.png", name: "Initiator" },
    { src: "/superstar.png", name: "Superstar" },
    { src: "/supporter.png", name: "Supporter" },
  ];

// Loading Spinner Component
const Loading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center h-64 w-full font-['Rajdhani']"
  >
    <svg
      className="animate-spin h-12 w-12 text-green-500 dark:text-green-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <p className="mt-4 font-semibold text-lg select-none text-white">
      Loading leaderboard...
    </p>
  </motion.div>
);

export default function Leaderboard() {
  const { theme } = useContext(ThemeContext);
  const {
    userStats,
    loading,
    error,
    filterActive,
    loadingFilter,
    showActiveMembers,
    showAllMembers,
  } = useGitHubLeaderboardData();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("scoreDesc");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const searchRef = useRef(null);
  const searchResultRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Rotate search images/gifs every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Sticky header on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!searchRef.current) return;
      const top = searchRef.current.getBoundingClientRect().top;
      setIsSticky(top <= 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [debouncedSearch]);

  const isDark = theme === "dark";

  const themeClasses = {
    bg: isDark ? "bg-[#121212]" : "bg-white",
    text: isDark ? "text-white" : "text-gray-900",
    secondaryText: isDark ? "text-gray-400" : "text-gray-600",
    inputBg: isDark ? "bg-[#2a2a2a]" : "bg-gray-200",
    inputText: isDark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-600",
    buttonBg: "bg-[#2ECC71]",
    buttonHoverBg: "hover:bg-[#28b263]",
    cardBg: isDark ? "bg-[#1e1e1e]" : "bg-white",
    cardText: isDark ? "text-white" : "text-gray-900",
    shadow: isDark
      ? "shadow-[0_0_10px_rgba(46,204,113,0.3)]"
      : "shadow-[0_2px_10px_rgba(0,0,0,0.1)]",
  };

  const filteredSortedUsers = useMemo(() => {
    if (!userStats || !Array.isArray(userStats)) return [];

    let users = userStats;

    if (debouncedSearch.trim()) {
      users = users.filter((user) =>
        user.username.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
      );
    }

    return users.sort(sortFunctions[sortKey]);
  }, [userStats, debouncedSearch, sortKey]);

  if (loading)
    return (
      <div className={`${themeClasses.bg} min-h-screen flex justify-center items-center`}>
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 font-semibold text-red-500">{error}</div>
    );

  const searchedUser = filteredSortedUsers[0] || null;
  const searchTerm = debouncedSearch.trim();

  return (
    <div className={`${themeClasses.bg} min-h-screen mt-[150px]`}>
      {/* Header & Search Input */}
      <motion.div
        ref={searchRef}
        className={`max-w-7xl mx-auto flex flex-wrap items-center justify-center mb-6 gap-12
          ${isSticky ? "top-0 left-0 right-0 z-50 px-5 py-3 shadow-lg bg-opacity-90 backdrop-blur-sm" : ""}
          ${themeClasses.bg}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="relative flex items-center justify-between w-full px-4 py-2">
          <h1
            className={`text-3xl font-extrabold ${themeClasses.text} flex items-center gap-2 font-['Rajdhani']`}
            style={{ minWidth: 200 }}
          >
            Community Leaderboard
          </h1>
        </div>

        <div className="relative text-gray-400 focus-within:text-[#2ECC71]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={imageIndex}
              src={rotatingImages[imageIndex]}
              alt="Rotating search"
              className="absolute left-3 top-2 -translate-y-1/2 pointer-events-none w-6 h-6 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`pl-12 pr-4 py-2 rounded-full ${themeClasses.inputBg} ${themeClasses.inputText} focus:outline-none focus:ring-2 focus:ring-[#2ECC71] min-w-[180px] transition`}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <select
            className={`px-3 py-2 rounded-full ${themeClasses.inputBg} ${themeClasses.inputText} focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition`}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="scoreDesc">Filter</option>
            <option value="scoreAsc">Score: Low → High</option>
            <option value="alphaAZ">A → Z</option>
            <option value="alphaZA">Z → A</option>
          </select>

          <button
            disabled={!filterActive}
            onClick={showAllMembers}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-white ${themeClasses.buttonBg} ${themeClasses.buttonHoverBg} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Show All
          </button>

          <button
            disabled={loadingFilter}
            onClick={showActiveMembers}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-white ${themeClasses.buttonBg} ${themeClasses.buttonHoverBg} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <FiFilter />
          </button>
        </div>
      </motion.div>

      {/* Search Result Sticky Card */}
      <motion.div
        ref={searchResultRef}
        layout
        animate={{
          position: isSticky ? "fixed" : "static",
          bottom: isSticky ? 0 : "auto",
          left: isSticky ? 0 : "auto",
          right: isSticky ? 0 : "auto",
          margin: isSticky ? "0 auto" : "initial",
          zIndex: isSticky ? 999 : "auto",
          width: isSticky ? "100%" : "auto",
          backgroundColor: isSticky
            ? isDark
              ? "#121212cc"
              : "#ffffffcc"
            : "transparent",
          backdropFilter: isSticky ? "blur(6px)" : "none",
          boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
        }}
        className={`max-w-5xl mx-auto p-3 rounded-b-lg ${
          isSticky ? "border-b border-gray-300 dark:border-gray-700" : ""
        }`}
      >
        {searchTerm && searchedUser ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-4 p-2 rounded-lg ${themeClasses.cardBg} ${themeClasses.shadow}`}
          >
            <img
              src={searchedUser.avatar}
              alt={`${searchedUser.username} avatar`}
              className="w-12 h-12 rounded-full border-4 border-white"
            />
            <div>
              <h2 className={`text-lg font-bold ${themeClasses.cardText}`}>
                {searchedUser.username}
              </h2>
              <p className={`text-sm ${themeClasses.secondaryText}`}>
                Score: {searchedUser.score} | Repos: {searchedUser.repositories} | Commits: {searchedUser.commits} | PRs: {searchedUser.pullRequests}
              </p>
            </div>
          </motion.div>
        ) : searchTerm ? (
          <div className={`text-center p-3 ${themeClasses.secondaryText}`}>
            No user found...
          </div>
        ) : null}
      </motion.div>

      {/* Users List */}
      <div className="max-w-6xl mx-auto mt-[100px] grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredSortedUsers.map((user, index) => {
          const isTop5 = index < 5;
          const isTop3 = index < 3;

          const showHighlight = sortKey === "scoreDesc"; // Highlight top users only for default sort

          return (
            <motion.div
              key={user.username}
              className={`
                relative p-4 rounded-xl transition-transform hover:scale-105
                ${themeClasses.cardBg} ${themeClasses.shadow}
                ${showHighlight && isTop5 ? "border-4 border-[#2ECC71] bg-gradient-to-r from-green-100/30 to-green-200/30" : ""}
                ${!isTop5 ? "hover:shadow-lg" : ""}
              `}
              whileHover={{ scale: 1.05 }}
              animate={
                showHighlight && isTop3
                  ? {
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        "0 0 10px rgba(46, 204, 112, 0.7)",
                        "0 0 20px rgb(255, 255, 255)",
                        "0 0 10px rgb(204, 191, 46)",
                      ],
                    }
                  : {}
              }
              transition={
                showHighlight && isTop3
                  ? { duration: 2, repeat: Infinity, repeatType: "mirror" }
                  : {}
              }
            >
              {/* Rank Badge */}
              {showHighlight && isTop5 && (
  <div className="absolute -top-3 -right-3 w-8 h-8 cursor-pointer select-none z-10">
    <img
      src={badges[index].src}
      alt={badges[index].name}
      title={badges[index].name} // native tooltip on hover
      className="w-8 h-8 rounded-full shadow-lg"
    />
  </div>
)}

              <div className="flex items-center gap-4 mb-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className={`rounded-full border-2 border-white transition-all ${
                    showHighlight && isTop5 ? "w-16 h-16" : "w-14 h-14"
                  }`}
                />
                <div>
                  <h3
                    className={`text-xl font-extrabold transition-colors ${
                      showHighlight && isTop5
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600"
                        : themeClasses.cardText
                    }`}
                  >
                    {user.username}
                  </h3>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>
                    Score: {user.score}
                  </p>
                </div>
              </div>

              <div className="flex justify-around mt-2 text-[#2ECC71]">
                <div className="flex items-center gap-1 text-sm">
                  <a
                    href={`https://github.com/${user.username}?tab=commits`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#2ECC71]"
                    aria-label="Commits"
                    title="Commits"
                  >
                    <FaGithub />
                  </a>
                  {user.commits}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <a
                    href={`https://github.com/pulls?q=is%3Apr+author%3A${user.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#2ECC71]"
                    aria-label="Pull Requests"
                    title="Pull Requests"
                  >
                    <img
                      src="pricon.png"
                      alt="GitHub Pull Request"
                      style={{ width: "14px", height: "14px" }}
                    />
                  </a>
                  {user.pullRequests}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <FaBug /> {user.issues}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
