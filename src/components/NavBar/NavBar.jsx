import { useState } from 'react';

// Router Dom
import { useNavigate } from 'react-router-dom';

// Assets
import Logo from '../../assets/Logo.png';

// Components
import Button from '../../CustomComponents/Button/Button.component';

// Button Styles
import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';

const NavBar = () => {
  const [selectedButton, setSelectedButton] = useState({});
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    if (e.target.id === 'home') {
      navigate('/');
    } else {
      navigate('/' + e.target.id);
    }
  };

  return (
    <nav className="flex h-24 w-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-900  pb-1">
      <div className="flex h-full w-full justify-between bg-gray-800 px-24">
        <div className="container space-x-5 py-6">
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
        <img className="mt-4 h-16" alt="logo" src={Logo} />
      </div>
    </nav>
  );
};

export default NavBar;
