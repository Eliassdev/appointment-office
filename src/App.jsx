import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Local Imports
import './index.css';
import { AboutUs } from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Login } from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
