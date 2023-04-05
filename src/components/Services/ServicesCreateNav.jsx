import React from 'react';

// React Router Dom
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../CustomComponents/Button/Button.component';

//Button Styles
import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';

function ServicesCreateNav() {
  const navigate = useNavigate();

  const handleCreateStervice = () => {
    navigate('/dashboard/services/create');
  };
  return (
    <div className="flex w-full justify-center">
      <Button buttonType={BUTTON_TYPES.green} onClick={handleCreateStervice}>
        Nuevo Servicio
      </Button>
    </div>
  );
}

export default ServicesCreateNav;
