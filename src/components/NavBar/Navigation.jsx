// src/components/Header.jsx

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../ui/resizable-navbar";
import { useState,useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect system color scheme preference
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(matchMedia.matches);

    // Listen for changes
    const handler = (e) => setIsDark(e.matches);
    matchMedia.addEventListener("change", handler);

    // Cleanup
    return () => matchMedia.removeEventListener("change", handler);
  }, []);
  const navItems = [
    { name: "Community Work", link: "community-work" },
    { name: "LeaderBoard", link: "leaderboard" },
    { name: "About", link: "about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full   text-white font-rajdhani shadow-blue-900/30">
      <Navbar className="max-w-7xl mx-auto px-4 text-[#2ECC71]">
        {/* Desktop Nav */}
        <NavBody>
       
          <NavLink
            to="/"
            className="z-20 flex items-center space-x-2 px-2 py-1 text-lg font-semibold"
          >
            <NavbarLogo/>
            <span className="text-sm text-black dark:text-white select-none">
              Tech<span className="text-[1rem]">Quanta</span>
            </span>
          </NavLink>

          <NavItems
            items={navItems.map((item) => ({
              ...item,
              isActive: location.pathname === `/${item.link}`,
              className:
                item.name === "Community Work" || item.name === "LeaderBoard"
                  ? "text-bold"
                  : "",
            }))}
          />

          <div className="flex items-center gap-4">
            <NavbarButton
              variant="primary"
              className="bg-[#00BFFF] hover:bg-[#8E44AD] text-white hover:text-white font-['Exo 2'] px-4 py-1 rounded-full transition-all"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header",
                  "_blank"
                )
              }
            >
              Join
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo>
              <NavLink to="/" className="flex items-center space-x-2">
                <img
                  src="/lightlogo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="inline-block rounded-full dark:block"
                />
                <img
                  src="/darklogo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="inline-block rounded-full dark:hidden"
                />
              </NavLink>
            </NavbarLogo>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 text-base font-medium rounded transition-colors font-rajdhani ${
                  location.pathname === `/${item.link}`
                    ? "text-[#2ECC71]"
                    : "text-neutral-300 hover:text-white"
                } ${
                  item.name === "Community Work" || item.name === "LeaderBoard"
                    ? "font-bold"
                    : ""
                }`}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="mt-6 flex flex-col gap-3 px-4">
              <NavbarButton
                variant="primary"
                className="bg-[#00BFFF] hover:bg-[#8E44AD] text-white hover:text-white font-semibold px-4 py-1 rounded-full transition-all"
                style={{ boxShadow: "0 0 10px #2ECC71" }}
              >
                Join
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}

export default Header;