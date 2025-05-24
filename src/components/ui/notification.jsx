// src/components/Layout/Notification.jsx
import React, { useState } from "react";

const Notification = ({
  heading = "Notification",
  description = "Thank you for visiting our website! We appreciate your support.",
  moreLink = "#",
  theme = "light", // "light" or "dark"
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  // Define theme colors using CSS variables for easy theming
  const lightTheme = {
    bg: "#f9f9f9",
    border: "#ddd",
    textPrimary: "#222",
    textSecondary: "#555",
    link: "#0077ff",
    closeBtn: "#555",
  };

  const darkTheme = {
    bg: "#1a1a1a",
    border: "#333",
    textPrimary: "#eee",
    textSecondary: "#bbb",
    link: "#3399ff",
    closeBtn: "#ccc",
  };

  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        maxWidth: 320,
        backgroundColor: colors.bg,
        border: `1.5px solid ${colors.border}`,
        borderRadius: 10,
        padding: "20px 25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        color: colors.textPrimary,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        zIndex: 10000,
        opacity: 0.98,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minWidth: 280,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <h4
          style={{
            margin: 0,
            fontWeight: "700",
            fontSize: 18,
            color: colors.textPrimary,
          }}
        >
          {heading}
        </h4>
        <button
          onClick={() => setVisible(false)}
          aria-label="Close notification"
          style={{
            border: "none",
            background: "transparent",
            color: colors.closeBtn,
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
            padding: 0,
            userSelect: "none",
          }}
          title="Close"
        >
          &times;
        </button>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: colors.textSecondary,
          lineHeight: 1.4,
        }}
      >
        {description}
      </p>
      {moreLink && (
        <a
          href={moreLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 8,
            fontSize: 14,
            color: colors.link,
            textDecoration: "underline",
            fontWeight: "600",
            alignSelf: "flex-start",
            cursor: "pointer",
          }}
        >
          More &rarr;
        </a>
      )}
    </div>
  );
};

export default Notification;
