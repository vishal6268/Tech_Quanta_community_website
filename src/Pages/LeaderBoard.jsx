import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaGithub,
  FaCodeBranch,
  FaBug,
  FaExternalLinkAlt
} from "react-icons/fa";

export default function LeaderBoard() {
  const leaderboardData = [
    { username: "octocat", avatar: "https://github.com/octocat.png", commits: 120, prs: 15, issues: 8, score: 250 },
    { username: "torvalds", avatar: "https://github.com/torvalds.png", commits: 110, prs: 18, issues: 6, score: 240 },
    { username: "mojombo", avatar: "https://github.com/mojombo.png", commits: 105, prs: 10, issues: 12, score: 220 },
    { username: "defunkt", avatar: "https://github.com/defunkt.png", commits: 98, prs: 8, issues: 15, score: 200 },
    { username: "pjhyett", avatar: "https://github.com/pjhyett.png", commits: 90, prs: 9, issues: 7, score: 180 },
    { username: "user6", avatar: "https://github.com/user6.png", commits: 80, prs: 7, issues: 9, score: 170 },
    { username: "user7", avatar: "https://github.com/user7.png", commits: 78, prs: 6, issues: 5, score: 160 },
    { username: "user8", avatar: "https://github.com/user8.png", commits: 70, prs: 4, issues: 11, score: 150 },
    { username: "user9", avatar: "https://github.com/user9.png", commits: 68, prs: 3, issues: 8, score: 140 },
    { username: "user10", avatar: "https://github.com/user10.png", commits: 65, prs: 5, issues: 6, score: 135 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  const rotatingImages = [
    "/SearchIMg1.gif",
    "/SearchIMG2.gif",
    "/SearchIMG3.gif",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const searchedUser = useMemo(() => {
    if (!searchTerm.trim()) return null;
    return leaderboardData.find(
      (user) => user.username.toLowerCase() === searchTerm.toLowerCase()
    );
  }, [searchTerm]);

  return (
    <div className="relative  pt-[100px] min-h-screen w-full bg-transparent text-white p-8 ">
      {/* Heading and Search */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-wider select-none font-['Rajdhani'] text-[#2ECC71]">Community Leaderboard</h1>

        <div className="w-full max-w-md ">
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
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center mb-10">
        {searchedUser ? (
          <>
            <img
              src={searchedUser.avatar}
              alt={searchedUser.username}
              className="w-24 h-24 rounded-full border-4 border-green-400 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-green-300">{searchedUser.username}</h2>
            <div className="flex justify-center gap-6 text-gray-300 mt-4 mb-6">
              <div className="flex items-center gap-2">
                <FaGithub className="text-yellow-400" />
                <span>{searchedUser.commits} Commits</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCodeBranch className="text-cyan-400" />
                <span>{searchedUser.prs} PRs</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBug className="text-pink-400" />
                <span>{searchedUser.issues} Issues</span>
              </div>
            </div>
            <a
              href={`https://github.com/${searchedUser.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#2ECC71] font-semibold hover:underline"
            >
              Visit Profile <FaExternalLinkAlt />
            </a>
          </>
        ) : searchTerm ? (
          <p className="text-gray-400 italic">No user found with username &quot;{searchTerm}&quot;.</p>
        ) : (
          <p className="text-gray-400 italic">Enter a username above to view profile.</p>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-8">
        {/* Headers */}
        <div className="hidden sm:grid grid-cols-[50px_60px_1fr_1fr_1fr_1fr] text-sm font-bold uppercase text-black px-4 py-3 border-b border-gray-600 bg-white/30 backdrop-blur-sm rounded-t-md">
          <div className="text-center">Rank</div>
          <div>Avatar</div>
          <div>Username</div>
          <div className="flex items-center justify-center gap-1"><FaGithub size={16} /> Commits</div>
          <div className="flex items-center justify-center gap-1"><FaCodeBranch size={16} /> PRs</div>
          <div className="flex items-center justify-center gap-1"><FaBug size={16} /> Issues</div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[600px]">
          <AnimatePresence>
            {leaderboardData.map((user, i) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className={`grid grid-cols-[50px_60px_1fr] sm:grid-cols-[50px_60px_1fr_1fr_1fr_1fr] items-center px-4 py-3 border-b border-gray-700 ${
                  i < 3 ? "bg-yellow-500/10 font-semibold" : "hover:bg-white/5"
                }`}
              >
                <div className="text-center text-yellow-300">{i + 1}</div>
                <div>
                  <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border border-gray-600 object-cover" />
                </div>
                <div className="truncate text-white">{user.username}</div>
                <div className="hidden sm:block text-green-200 text-center font-mono">{user.commits}</div>
                <div className="hidden sm:block text-cyan-200 text-center font-mono">{user.prs}</div>
                <div className="hidden sm:block text-pink-200 text-center font-mono">{user.issues}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
