import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Inject loader
const loader = document.createElement('div');
loader.id = 'quantum-loader';
loader.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=Fira+Code&display=swap');

    #quantum-loader {
      position: fixed;
      inset: 0;
      background: linear-gradient(145deg, #121212, #1E1E1E);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-family: 'Fira Code', monospace;
      overflow: hidden;
      transition: opacity 1s ease;
    }

    .stars {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      overflow: hidden;
    }

    .star {
      position: absolute;
      background: #fff;
      border-radius: 50%;
      width: 2px;
      height: 2px;
      opacity: 0.6;
      animation: flicker 3s infinite ease-in-out;
    }

    @keyframes flicker {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.4); }
    }

    .title {
      z-index: 2;
      font-size: 3rem;
      background: linear-gradient(to right, #00BFFF, #8E44AD);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: glow 2s infinite ease-in-out;
      text-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
    }

    @keyframes glow {
      0%, 100% {
        text-shadow: 0 0 10px #00BFFF, 0 0 20px #8E44AD;
      }
      50% {
        text-shadow: 0 0 20px #8E44AD, 0 0 40px #00BFFF;
      }
    }

    .subtext {
      z-index: 2;
      margin-top: 10px;
      color: #2ECC71;
      font-size: 1rem;
      letter-spacing: 0.1em;
      border-right: 2px solid #2ECC71;
      white-space: nowrap;
      overflow: hidden;
      width: 0;
      animation: typing 3s steps(40, end) forwards, blink 0.75s step-end infinite;
    }

    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }

    @keyframes blink {
      50% { border-color: transparent; }
    }

    .loader-ring {
      z-index: 2;
      margin-top: 2rem;
      width: 50px;
      height: 50px;
      border: 4px solid transparent;
      border-top: 4px solid #00BFFF;
      border-radius: 50%;
      animation: spin 1.4s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>

  <div class="stars">
    ${Array.from({ length: 80 }).map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      return `<div class="star" style="top:${y}%;left:${x}%;animation-delay:${delay}s;"></div>`;
    }).join('')}
  </div>

  <div class="title">Tech Quanta</div>
  <div class="subtext">Booting Quantum Core...</div>
  <div class="loader-ring"></div>
`;

document.body.appendChild(loader);

// Simulate loading, then remove loader
setTimeout(() => {
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 1000);

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}, 3000); // Adjust duration if needed
