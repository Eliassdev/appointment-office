import React from 'react';
import Button from '../../CustomComponents/Button/Button.component';
import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';
import { useNavigate } from 'react-router-dom';
const CreationNav = () => {
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
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col bg-neutral-900 px-2 pt-8">
      <img
        src="https://res.cloudinary.com/duilsmrmx/image/upload/v1676288009/x1hvcivkowplk4kmfyxn.png"
        alt="appointment_logo"
        className="mb-4 w-64"
      />
      {navButtons.map((button) => {
        if (button.name === 'log_out') {
          return (
            <Button
              id={`button-${button.name}`}
              key={button.key}
              buttonType={BUTTON_TYPES.warning}
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
              key={button.key}
              buttonType={BUTTON_TYPES.main}
              onClick={() => {
                navigate(button.path);
              }}
            >
              {button.title}
            </Button>
          );
        }
      })}
    </div>
  );
};

export default CreationNav;
