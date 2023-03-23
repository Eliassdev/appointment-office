import React from 'react';
import Logo from '../assets/Logo.png';
import NavBar from '../components/NavBar/NavBar';

const Home = () => {
  return (
    <div className="w-full h-screen bg-slate-700">
      <NavBar />
      <h1>Soy el Home</h1>
    </div>
  );
};

export default Home;
