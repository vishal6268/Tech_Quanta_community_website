import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{ fontFamily: '"Fira Code", monospace' }}
      className="fixed top-0 left-0 w-full z-50 bg-transparent  text-white shadow-none p-5"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center rounded-2xl">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            // src="/logo.png"
            alt="Community Logo"
            className="h-auto w-auto rounded-full border-none border-[#00BFFF] bg-transparent p-1"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/about" className="text-white hover:text-[#2ECC71] transition">
            About
          </Link>
          <Link to="/CommunityWork" className="text-white hover:text-[#2ECC71] transition">
            Community Work
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
              className="bg-[#00BFFF] hover:text-white hover:bg-[#2ECC71] text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
  style={{
    boxShadow: '0px 0px 10px #2ECC71'
  }}
          >
            Join
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
<div className="md:hidden flex items-center ">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="text-white p-1 rounded-md backdrop-blur-md bg-white/10 hover:bg-white/20 transition"
  >
    {isOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
  </button>
</div>
</div>

{/* Mobile Dropdown Mini Menu */}
{isOpen && (
  <div className="md:hidden fixed top-16 right-5 w-[58%] z-50 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl px-5 py-5 space-y-4 text-sm animate-fade-in-fast ">

    {/* Community Logo */}
    <div className="flex flex-col items-center bg-transparent">
      <img
        src="opensource.png" // 🔁 Replace with your actual logo path
        alt="Community Logo"
        className="w-12 h-12 bg-transparent rounded-full border-none shadow-md object-cover"
      />
      {/* <span className="mt-2 text-white text-base font-semibold tracking-wide"></span> */}
    </div>

    <hr className="border-white/10" />

    {/* Menu Links with Icon Images */}
    <Link
      to="/about"
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 text-white bg-transparent hover:text-[#2ECC71] transition duration-200 font-medium"
    >
      <img src="about.png" alt="About" className="w-5 h-5 bg-transparent" /> {/* 👈 Replace with your icon */}
      About
    </Link>
    <Link
      to="/CommunityWork"
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 text-white bg-transparent hover:text-[#2ECC71] transition duration-200 font-medium"
    >
      <img src="communitywork.png" alt="Community Work" className="w-6 h-7 bg-transparent rounded-md" />
      Community Work
    </Link>
    <Link
      href="https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00BFFF] hover:bg-[#2ECC71] hover:text-white text-white font-semibold px-5 py-1 rounded-full transition duration-300 shadow-lg"
  style={{
    boxShadow: '0px 0px 10px #2ECC71'
  }}
      onClick={() => setIsOpen(false)}
    >
      Join
    </Link>
  </div>
)}


    </nav>
  );
};

export default Navbar;
