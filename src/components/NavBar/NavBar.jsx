import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    if (e.target.id === 'home') {
      navigate('/');
    } else {
      navigate('/' + e.target.id);
    }
  };

  return (
    <nav className="w-full h-24 flex bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-900  pb-1">
      <div className="w-full h-full flex px-24 bg-gray-800 justify-between">
        <div className="container py-6 space-x-5">
          <button
            id="home"
            className="px-4 py-2 text-purple-500 hover:text-purple-400"
            onClick={(e) => {
              handleNavigate(e);
            }}
          >
            Home
          </button>
          <button
            id="register"
            className="px-4 py-2 text-purple-500 hover:text-purple-400"
            onClick={(e) => {
              handleNavigate(e);
            }}
          >
            Registrate
          </button>
          <button
            id="login"
            className="px-4 py-2 text-purple-500 hover:text-purple-400"
            onClick={(e) => {
              handleNavigate(e);
            }}
          >
            Ingresa
          </button>
          <button
            id="about-us"
            className="px-4 py-2 text-purple-500 hover:text-purple-400"
            onClick={(e) => {
              handleNavigate(e);
            }}
          >
            Sobre Nosotros
          </button>
        </div>
        <img className="h-16 mt-4" alt="logo" src={Logo} />
      </div>
    </nav>
  );
};

export default NavBar;
