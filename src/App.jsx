import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/NavBar/Navigation';
import Home from './Pages/Home';
import CommunityWork from "./Pages/CommunityWork";
import About from "./Pages/About";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<CommunityWork />} />
            <Route path='/about' element={<About />} />
            {/* <Route path='*' element={<PageNotFound />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
