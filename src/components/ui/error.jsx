// src/components/Maintenance/Maintenance.jsx
import React, { useState, useEffect } from "react";

const Maintenance = ({
  imageSrc,
  altText = "Maintenance",
  heading = "We'll be back soon!",
  message = "Our site is currently undergoing scheduled maintenance. Thank you for your patience!",
  backgroundColor = "#ffffff",
}) => {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [isXTurn, setIsXTurn] = useState(true); // User is always X, computer is O
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const winningCombinations = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Simple AI to pick next move for O:
  // 1. Win if possible
  // 2. Block X if possible
  // 3. Otherwise pick first empty cell
  const findBestMove = (board) => {
    // Try winning move for O
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const copy = board.slice();
        copy[i] = "O";
        if (checkWinner(copy) === "O") return i;
      }
    }
    // Try blocking X
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const copy = board.slice();
        copy[i] = "X";
        if (checkWinner(copy) === "X") return i;
      }
    }
    // Else pick first empty
    return board.findIndex((cell) => cell === null);
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isXTurn) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    } else if (newBoard.every((cell) => cell !== null)) {
      setIsDraw(true);
      return;
    }

    setIsXTurn(false); // Switch to computer turn
  };

  useEffect(() => {
    if (!isXTurn && !winner && !isDraw) {
      // Computer's turn after short delay for UX
      const timer = setTimeout(() => {
        const move = findBestMove(board);
        if (move !== -1) {
          const newBoard = board.slice();
          newBoard[move] = "O";
          setBoard(newBoard);

          const win = checkWinner(newBoard);
          if (win) {
            setWinner(win);
          } else if (newBoard.every((cell) => cell !== null)) {
            setIsDraw(true);
          } else {
            setIsXTurn(true);
          }
        }
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isXTurn, board, winner, isDraw]);

  const resetGame = () => {
    setBoard(emptyBoard);
    setIsXTurn(true);
    setWinner(null);
    setIsDraw(false);
  };

  const cellStyle = {
    width: 60,
    height: 60,
    border: "2px solid #444",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 32,
    cursor: winner || isDraw ? "default" : "pointer",
    userSelect: "none",
    color: "#222",
    fontWeight: "bold",
    backgroundColor: "#fff",
    transition: "background-color 0.3s ease",
  };

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 60px)",
    gridTemplateRows: "repeat(3, 60px)",
    gap: 8,
    marginTop: 20,
    marginBottom: 12,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        textAlign: "center",
        color: "#222",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={altText}
          style={{
            maxWidth: "280px",
            maxHeight: "280px",
            marginBottom: 24,
            objectFit: "contain",
            userSelect: "none",
          }}
          draggable={false}
        />
      )}
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>{heading}</h1>
      <p style={{ fontSize: 16, maxWidth: 360, marginBottom: 24, lineHeight: 1.5 }}>
        {message}
      </p>

      <p
        style={{
          fontSize: 14,
          color: "#666",
          maxWidth: 360,
          marginBottom: 12,
        }}
      >
        Meanwhile, feel free to play our mini game below to pass the time!
      </p>

      <div>
        {/* Status message */}
        <div style={{ minHeight: 24, fontWeight: "600", color: "#444" }}>
          {winner
            ? `🎉 Player ${winner} wins!`
            : isDraw
            ? "😐 It's a draw!"
            : `Next turn: Player ${isXTurn ? "X (You)" : "O (Computer)"}`}
        </div>

        {/* Board */}
        <div style={boardStyle}>
          {board.map((cell, index) => (
            <div
              key={index}
              style={cellStyle}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleClick(index);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Cell ${index + 1} - ${cell ? cell : "empty"}`}
            >
              {cell}
            </div>
          ))}
        </div>

        {/* Restart Button */}
        {(winner || isDraw) && (
          <button
            onClick={resetGame}
            style={{
              padding: "8px 16px",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 6,
              border: "none",
              backgroundColor: "#222",
              color: "#fff",
              userSelect: "none",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#555")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#222")}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
