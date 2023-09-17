import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../src/pages/Home'
import AdminPanel from '../src/pages/AdminPanel'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/adminPanel" element={<AdminPanel/>} />
      </Routes>
    </Router>
  );
}


export default App;
