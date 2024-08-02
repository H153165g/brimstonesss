import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Brim from './Brim';
import Map from './Map';
import Skill from './Skill'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Brim />} />
        <Route path="/map" element={<Map />} />
        <Route path="/map/skill" element={<Skill />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
