import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/NavBar/Navigation';
import Home from './pages/Home';
import CommunityWork from "./pages/CommunityWork";
import LeaderBoard from "./pages/LeaderBoard";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/communitywork' element={<CommunityWork />} />
            <Route path='/leaderboard' element={<LeaderBoard/>}/>
            <Route path='/about' element={<About />} />
            {/* <Route path='*' element={<PageNotFound />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
