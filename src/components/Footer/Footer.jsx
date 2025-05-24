import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  FaTelegramPlane,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { SiGmail, SiDocker } from "react-icons/si"; 
import { PiGlobeSimple } from "react-icons/pi";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const linkUrls = {
    About: "/about",
    FAQs: "/faqs",
    Join: "/join",
    Hackathons: "/hackathons",
    Meetups: "/meetups",
    Linkedin: "https://www.linkedin.com/in/techquanta-community",
    Contact: " ",
  };

  const sections = [
    {
      title: "Organization",
      links: ["About", "FAQs", "Join"],
    },
    {
      title: "Community",
      links: ["Discord"],
    },
    {
      title: "Events",
      links: ["Meetups"],
    },
    {
      title: "Socials",
      links: ["Linkedin"],
    },
    {
      title: "Contact",
      links: ["Contact"],
    },
  ];

  const socialIcons = [
    { icon: <FaLinkedin />, href: linkUrls.Linkedin },
    {
      icon: <PiGlobeSimple />,
      href: "https://scholar.google.com/citations?user=Vu7GkHwAAAAJ&hl=en&authuser=4",
    },
    { icon: <FaGithub />, href: "https://github.com/TechQuanta" },
    { icon: <SiDocker />, href: "https://hub.docker.com/u/techquanta" },
    { icon: <SiGmail />, href: "" },
  ];

  return (
    <footer
      className={`font-space-grotesk px-6 md:px-16 pt-2 pb-8 ${
        isDark ? "bg-tranparent text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm mb-12 justify-center items-center ">
        {sections.map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-semibold mb-3 border-b border-blue-400 inline-block dark:text-[#00BFFF]">
              {title}
            </h4>
            <ul>
              {links.map((link) => (
                <li key={link} className="mb-2 ">
                  <a
  href={linkUrls[link]}
  target={link === "Contact" ? "_self" : "_blank"}
  rel={link === "Contact" ? undefined : "noopener noreferrer"}
  className="underline-slide dark:text-white"
>
  {link}
</a>

                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Logo + Social Icons */}
      <div className="border-t border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-blue-500">&lt;/&gt;</span>
          <span className="text-sm text-black dark:text-white select-none">
              Tech<span className="text-[1rem]">Quanta</span>
            </span>
        </div>
         <div className="text-center text-xs mt-6 text-gray-500">
        © 2025 Tech Quanta. All rights reserved.
      </div>
        <div className="flex gap-4 text-xl">
          {socialIcons.map(({ icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 text-black dark:text-white"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;