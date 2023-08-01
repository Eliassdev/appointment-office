import { useEffect, useState } from 'react';

// Router Dom
import { useNavigate } from 'react-router-dom';

// Custom Components
import Button from '../../CustomComponents/Button/Button.component';
import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';

export const CreationNav = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const [ButtonAnimation, setButtonAnimation] = useState(false);

  // Router Dom
  const navigate = useNavigate();

  useEffect(() => {
    if (!ButtonAnimation) {
      setTimeout(() => {
        setButtonAnimation(true);
      }, 1000);
    }
  }, [ButtonAnimation]);

  // Navigation Buttons content and path
  const navButtons = [
    {
      name: 'general',
      title: 'Vista General',
      key: '1',
      path: '/dashboard/',
    },
    {
      name: 'organizations',
      title: 'Empresa',
      key: '2',
      path: '/dashboard/organizations',
    },
    {
      name: 'branches',
      title: 'Sucursales',
      key: '3',
      path: '/dashboard/branches',
    },
    {
      name: 'stylists',
      title: 'Estilistas',
      key: '4',
      path: '/dashboard/stylists',
    },
    {
      name: 'services',
      title: 'Servicios',
      key: '5',
      path: '/dashboard/services',
    },
    {
      name: 'log_out',
      title: 'Log Out',
      key: '6',
      path: '/',
    },
  ];

  // Set rig style to selected button
  const handleSelectedButton = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="z-10 flex h-screen flex-col bg-neutral-900 px-2 pt-8 animate-in slide-in-from-left duration-1000">
      <img
        src="https://res.cloudinary.com/duilsmrmx/image/upload/v1676288009/x1hvcivkowplk4kmfyxn.png"
        alt="appointment_logo"
        className="mb-4 w-64"
      />
      <div
        className={` ${
          ButtonAnimation
            ? 'flex flex-col animate-in slide-in-from-bottom duration-1000'
            : 'hidden'
        }`}
      >
        {navButtons.map((button) => {
          if (button.name === 'log_out') {
            return (
              <Button
                id={`button-${button.name}`}
                key={button.key}
                buttonType={BUTTON_TYPES.warning}
                selectedButton={selectedButton}
                onClick={() => {
                  localStorage.clear();
                  navigate(button.path);
                }}
              >
                {button.title}
              </Button>
            );
          } else {
            return (
              <Button
                id={`button-${button.name}`}
                name={button.name}
                key={button.key}
                selectedButton={selectedButton}
                buttonType={BUTTON_TYPES.main}
                onClick={() => {
                  handleSelectedButton(button.name);
                  navigate(button.path);
                }}
              >
                {button.title}
              </Button>
            );
          }
        })}
      </div>
    </div>
  );
};
