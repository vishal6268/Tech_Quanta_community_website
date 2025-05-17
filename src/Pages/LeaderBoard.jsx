import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  FaGithub, 
  FaCodeBranch, 
  FaBug, 
  FaSearch, 
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

  const top50Users = leaderboardData.slice(0, 50);

  const searchedUser = useMemo(() => {
    if (!searchTerm.trim()) return null;
    return leaderboardData.find(
      (user) => user.username.toLowerCase() === searchTerm.toLowerCase()
    );
  }, [searchTerm]);

  const rotatingImages = [
    "/public/SearchIMg1.gif",
    "/public/SearchIMG2.gif",
    "/public/SearchIMG3.gif",
  ];

  useEffect(() => {
    
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent text-gray-100   p-8">
      {/* Top row: left heading + right search + profile below search */}
      <div className="max-w-full mx-auto mb-8">
        <div className="flex flex-col md:flex-row  md:justify-between gap-6">
          {/* Left heading */}
          <h1 className="text-4xl font-extrabold tracking-wide select-none font-Exo 2">
            Community Leaderboard
          </h1>

          {/* Right search + profile */}
          <div className="w-full max-w-md">
            <div className="flex items-center gap-3 mt-6 md:mt-0 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg w-full md:w-[340px]">
              <img
                src={rotatingImages[imageIndex]}
                alt="Error"
                className="w-7 h-7 rounded-full object-contain"
              />
              <input
                type="text"
                placeholder="Search username (exact)..."
                className="w-full pl-12 pr-4 py-4 rounded-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition text-lg font-semibold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.trim())}
              />
            </div>
          </div>
        </div>
      </div>
       <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 m-6 min-h-[200px] flex flex-col items-center justify-center text-center">
              {searchedUser ? (
                <>
                  <img
                    src={searchedUser.avatar}
                    alt={searchedUser.username}
                    className="w-24 h-24 rounded-full border-4 border-[#2ECC71] mb-4 object-cover"
                  />
                  <h3 className="text-2xl font-bold text-green-400 mb-1">
                    {searchedUser.username}
                  </h3>
                  <div className="flex gap-6 text-gray-300 mb-6 justify-center">
                    <div className="flex items-center gap-2">
                      <FaGithub size={24} className="text-yellow-400" />
                      <span className="text-lg font-mono">{searchedUser.commits} Commits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCodeBranch size={24} className="text-cyan-400" />
                      <span className="text-lg font-mono">{searchedUser.prs} PRs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBug size={24} className="text-pink-400" />
                      <span className="text-lg font-mono">{searchedUser.issues} Issues</span>
                    </div>
                  </div>
                  <a
                    href={`https://github.com/${searchedUser.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#2ECC71] font-semibold hover:underline justify-center items-center"
                    title="Visit GitHub Profile"
                  >
                    Visit Profile <FaExternalLinkAlt size={20} />
                  </a>
                </>
              ) : searchTerm.length > 0 ? (
                <p className="text-gray-400 text-lg italic select-none">
                  No user found with username &quot;{searchTerm}&quot;.
                </p>
              ) : (
                <p className="text-gray-400 text-lg italic select-none">
                  Enter a username above to view profile details here.
                </p>
              )}
            </div>
            <br/>

    <section className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-8">
  {/* Mobile Header (visible below sm) */}
  <div className="grid grid-cols-[50px_60px_1fr] gap-4 text-xs font-semibold uppercase text-black px-4 py-3 border-b border-gray-600 select-none sticky top-0 bg-white backdrop-blur-sm z-10 sm:hidden">
    <div className="text-center">Rank</div>
    <div>Avatar</div>
    <div>Username</div>
  </div>

  {/* Full Header (visible from sm and up) */}
  <div className="hidden sm:grid grid-cols-[50px_60px_1fr_1fr_1fr_1fr] gap-4 text-sm font-semibold uppercase text-black px-4 py-3 border-b border-gray-600 select-none sticky top-0 bg-white backdrop-blur-sm z-10">
    <div className="text-center">Rank</div>
    <div>Avatar</div>
    <div>Username</div>
    <div className="flex items-center gap-1 justify-center">
      <FaGithub size={16} />
      Commits
    </div>
    <div className="flex items-center gap-1 justify-center">
      <FaCodeBranch size={16} />
      PRs
    </div>
    <div className="flex items-center gap-1 justify-center">
      <FaBug size={16} />
      Issues
    </div>
  </div>

  {/* Leaderboard Body */}
  <div className="overflow-y-auto max-h-[600px] mt-1 rounded-lg border border-gray-700 shadow-inner">
    <AnimatePresence>
      {top50Users.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 text-center text-gray-400 select-none"
        >
          No contributors found.
        </motion.div>
      )}

      {top50Users.map((user, i) => (
        <motion.div
          key={user.username}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, delay: i * 0.02 }}
          className={`grid gap-4 items-center px-4 py-3 hover:bg-white/10 cursor-pointer ${
            i < 3
              ? "bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 shadow-md"
              : ""
          } grid-cols-[50px_60px_1fr] sm:grid-cols-[50px_60px_1fr_1fr_1fr_1fr]`}
        >
          <div className="text-center font-bold text-lg text-yellow-400 select-none">
            {i + 1}
          </div>
          <div>
            <img
              src={user.avatar}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover border border-gray-700"
            />
          </div>
          <div className="font-semibold text-lg text-gray-100 truncate select-text">
            {user.username}
          </div>

          {/* Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 justify-center text-green-300 font-mono font-semibold">
            <FaGithub />
            {user.commits}
          </div>
          <div className="hidden sm:flex items-center gap-2 justify-center text-cyan-300 font-mono font-semibold">
            <FaCodeBranch />
            {user.prs}
          </div>
          <div className="hidden sm:flex items-center gap-2 justify-center text-pink-300 font-mono font-semibold">
            <FaBug />
            {user.issues}
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
</section>


    </div>
  );
}
    