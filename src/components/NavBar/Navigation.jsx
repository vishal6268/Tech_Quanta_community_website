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
import { useState } from "react";

function Header() {
  const navItems = [
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
<<<<<<< HEAD
    <nav
      style={{ fontFamily: '"Fira Code", monospace' }}
      className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md text-white shadow-none p-2"
    >
      <div className="max-w-full bg-transparent sm:px-6 lg:px-8  flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 bg-none">
          <img
            src="/logo.jpg"
            alt="Community Logo"
            className="h-19 w-[10rem] rounded-full border-none border-[#00BFFF] bg-none p-1"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center bg-transparent">
          <Link
            to="/leaderboard"
            className="text-white hover:text-[#2ECC71] transition"
          >
            LeaderBoard
          </Link>
          <Link
            to="/CommunityWork"
            className="text-white hover:text-[#2ECC71] transition"
          >
            Community Work
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-[#2ECC71] transition"
          >
            About
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00BFFF] hover:text-white hover:bg-[#2ECC71] text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out shadow-lg"
            style={{ boxShadow: "0 0 10px #2ECC71" }}
          >
            Join
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Mini Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-16 right-5 w-[58%] z-50 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/20 shadow-xl px-5 py-5 space-y-4 text-sm animate-fade-in-fast">
          {/* Community Logo */}
          <div className="flex flex-col items-center bg-transparent">
            <img
              src="opensource.png" // Replace with your actual logo path
              alt="Community Logo"
              className="w-12 h-12 bg-transparent rounded-full border-none shadow-md object-cover"
            />
          </div>

          <hr className="border-white/20" />

          {/* Menu Links with Icon Images */}
          <Link
            to="/leaderboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-white bg-transparent hover:text-[#2ECC71] transition duration-200 font-medium"
          >
            
            📊LeaderBoard
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-white bg-transparent hover:text-[#2ECC71] transition duration-200 font-medium"
          >
            <img
              src="about.png"
              alt="About"
              className="w-5 h-5 bg-transparent"
            />
            About
          </Link>
          <Link
            to="/CommunityWork"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-white bg-transparent hover:text-[#2ECC71] transition duration-200 font-medium"
          >
            <img
              src="communitywork.png"
              alt="Community Work"
              className="w-6 h-7 bg-transparent rounded-md"
            />
            Community Work
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00BFFF] hover:bg-[#2ECC71] hover:text-white text-white font-semibold px-5 py-1 rounded-full transition duration-300 shadow-lg"
            style={{ boxShadow: "0 0 10px #2ECC71" }}
            onClick={() => setIsOpen(false)}
          >
            Join
          </a>
        </div>
      )}
    </nav>
=======
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
           <a
            href="#"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black">
            <img
                src="https://assets.aceternity.com/logo-dark.png"
                alt="logo"
                width={30}
                height={30} />
            <span className="font-medium text-black dark:text-white">TechQuanta</span>
        </a>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
>>>>>>> 376adc2ebf89de719f9e9dd8d7074aee50572c8a
  );
}

export default Header;
