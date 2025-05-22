import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Adjust the path if needed

const Loading = ({ message = "Loading..." }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-64 w-full"
    >
      <svg
        className="animate-spin h-12 w-12"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={isDark ? "#2ECC71" : "#00BFFF"}
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill={isDark ? "#00BFFF" : "#2ECC71"}
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p className={`mt-4 text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} font-rajdhani`}>
        {message}
      </p>
    </motion.div>
  );
};

export default Loading;


