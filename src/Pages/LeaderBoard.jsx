import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import axios from "axios"; // Make sure axios is imported
import { FaFilter } from "react-icons/fa";
import { FaGithub, FaBug } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../components/ui/loader"; // adjust path as needed

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
    { src: "/join.png", name: "Joining" },
];


export default function Leaderboard() {
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
    <div className={`min-h-screen flex justify-center items-center bg-white text-gray-900 dark:bg-[#121212] dark:text-white`}>
      <Loading />
    </div>
  );

if (error)
  return (
    <div className={`min-h-screen flex justify-center items-center text-center mt-20 font-semibold text-red-500 bg-white text-gray-900 dark:bg-[#121212] dark:text-white`}>
      {error}
    </div>
  );


  const searchedUser = filteredSortedUsers[0] || null;
  const searchTerm = debouncedSearch.trim();

  return (
    <div className="bg-gray-50 dark:bg-[#121212] min-h-screen mt-[150px]">

      {/* Header & Search Input */}
      <motion.div
  ref={searchRef}
  className={`max-w-7xl mx-auto flex flex-wrap items-center justify-center mb-6 gap-12
    ${isSticky ? "top-0 left-0 right-0 z-50 px-5 py-3  bg-opacity-90 backdrop-blur-sm" : ""}
    bg-white dark:bg-transparent`}
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 120 }}
>
  <div className="relative flex items-center justify-center w-full px-4 py-2">
    <h1
      className="text-4xl font-extrabold text-gray-500 dark:text-white flex items-center gap-2 font-mono"
      style={{ minWidth: 200 }}
    >
      The Arkenlist
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
      className="pl-12 pr-4 py-2 rounded-full bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 placeholder-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] min-w-[180px] transition"
    />
  </div>

  <div className="flex items-center gap-3 flex-wrap justify-center">
    <select
      className="px-3 py-2 rounded-full bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition"
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
      className="flex items-center gap-1 px-4 py-2 rounded-full text-white bg-black dark:bg-[#2ECC71] hover:bg-gray-800 dark:hover:bg-[#28b263] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Show All
    </button>

    <button
      disabled={loadingFilter}
      onClick={showActiveMembers}
      className="flex items-center gap-1 px-4 py-2 rounded-full text-white bg-black dark:bg-[#2ECC71] hover:bg-gray-800 dark:hover:bg-[#28b263] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaFilter />
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
    backgroundColor: isSticky ? "rgba(255,255,255,0.8)" : "transparent", // Light mode fallback
    backdropFilter: isSticky ? "blur(6px)" : "none",
    // boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
  }}
  className={`max-w-auto   mx-auto p-3 rounded-b-lg  ${
    isSticky
      ? "border-b border-gray-300 dark:border-gray-700  bg-white dark:bg-[#121212cc]"
      : ""
  }`}
>

  {searchTerm && searchedUser ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex  items-center gap-6 justify-center items-center p-2 rounded-lg bg-white dark:bg-[#1f1f1f]  dark:shadow-lg"
    >
      <img
        src={searchedUser.avatar}
        alt={`${searchedUser.username} avatar`}
        className="w-12 h-12 rounded-full border-4 border-white"
      />
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {searchedUser.username}
        </h2>
        <p className="text-sm text-gray-600 font-semibold dark:text-gray-400">
          Score: {searchedUser.score} | Repos: {searchedUser.repositories} | Commits: {searchedUser.commits} | PRs: {searchedUser.pullRequests}
        </p>
      </div>
    </motion.div>
  ) : searchTerm ? (
    <div className="text-center p-3 text-gray-600 dark:text-gray-400">
      No user found...
    </div>
  ) : null}
</motion.div>
{/* Users List */}
<div className="max-w-6xl mx-auto mt-[100px] grid gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
  {filteredSortedUsers.map((user, index) => {
    const isTop5 = index < 5;
    const isTop3 = index < 3;

    const getBadgeIndexByScore = (score) => {
      if (score >= 40000) return 0;
      if (score >= 20000) return 1;
      if (score >= 10000) return 2;
      if (score >= 5000) return 3;
      if (score >= 2500) return 4;
      return 5; // Below 60
    };

    const showHighlight = sortKey === "scoreDesc"; // Highlight top users only for default sort

    return (
      <motion.div
        key={user.username}
        className={`
          relative w-full max-w-md min-h-[130px] px-5 py-12 rounded-3xl shadow-lg group font-space-grotesk text-center backdrop-blur-xl
          bg-gradient-to-br from-[#3a1c71]/60 via-[#d76d77]/80 to-[#ffaf7b]/80
          border-2 border-pink-400/10 ring-1 ring-orange-300/20
          transition-transform duration-300 hover:scale-[1.035]
          text-white text-sm

          ${isTop3 ? "border-emerald-300/40 animate-border-glow" : ""}
          ${isTop5
            ? "ring-2 dark:ring-pink-400/30 ring-fuchsia-500/60 bg-gradient-to-br from-[#ff00cc] via-[#333399] to-[#000000] dark:from-[#1f0033] dark:via-[#660066] dark:to-[#000000]"
            : ""}
        `}
        whileHover={{ scale: 1.035 }}
      >
        {/* Glowing Animated Background */}
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
          <img
            src="/runes.png"
            alt=""
            className="w-full h-full object-cover animate-pulse"
          />
        </div>

        {/* Top 3 Shimmer Beam */}
        {isTop3 && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/25 to-transparent blur-3xl animate-zoom-glow" />
          </div>
        )}

        {/* Top 5 Badge */}
        {showHighlight && (
          <div className="absolute top-4 right-4 z-20 w-12 h-12">
            <div className="relative w-12 h-12">
              <img
                src={badges[getBadgeIndexByScore(user.score)].src}
                alt={badges[getBadgeIndexByScore(user.score)].name}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        )}

        {/* Avatar & Username */}
        <div className="flex items-center gap-4 mb-3 relative z-10">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-16 h-16 rounded-full border-4 border-emerald-200 shadow-md"
          />
          <div>
            <h3
              className={`text-xl font-bold leading-snug tracking-tight
              ${
                isTop5
                  ? "text-transparent bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400 bg-clip-text"
                  : "text-emerald-100"
              }`}
            >
              {user.username}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Score:{" "}
              <span className="text-emerald-300 font-semibold">{user.score}</span>
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center px-2 mt-1 z-10 relative text-emerald-300 text-sm">
          <div className="flex items-center gap-1">
            <a
              href={`https://github.com/${user.username}?tab=commits`}
              target="_blank"
              rel="noreferrer"
              title="Commits"
              className="hover:text-emerald-400 transition"
            >
              <FaGithub />
            </a>
            {user.commits}
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`https://github.com/pulls?q=is%3Apr+author%3A${user.username}`}
              target="_blank"
              rel="noreferrer"
              title="Pull Requests"
              className="hover:text-emerald-400 transition"
            >
              <img src="/pricon.png" alt="PR" className="w-4 h-4" />
            </a>
            {user.pullRequests}
          </div>
          <div className="flex items-center gap-1">
            <FaBug />
            {user.issues}
          </div>
        </div>

        {/* Holographic Glow Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute -inset-1 bg-gradient-to-br from-emerald-200/20 to-transparent blur-2xl group-hover:opacity-60 opacity-30 transition-all duration-500" />
          <div className="absolute top-0 left-1/2 w-32 h-32 bg-emerald-300/15 rotate-45 blur-3xl animate-holo-shimmer" />
        </div>
      </motion.div>
    );
  })}
</div>
</div>
  );
}
