import React from 'react';

//Components
import Button from '../../CustomComponents/Button/Button.component';
import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';

import { SERVICES_FORM_TYPE } from './ServicesForm';

const ServicesFormNav = ({ handleCancel, formik, formType }) => {
  // Render the correct buttons depending on the form type
  const NavType = () => {
    switch (formType) {
      case SERVICES_FORM_TYPE.create:
        return (
          <div className="flex w-full justify-center">
            <Button buttonType={BUTTON_TYPES.red} onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              buttonType={
                formik.isValid ? BUTTON_TYPES.green : BUTTON_TYPES.disabled
              }
              type={'submit'}
            >
              Crear
            </Button>
          </div>
        );
      case SERVICES_FORM_TYPE.update:
        return (
          <div className="flex w-full justify-center">
            <Button buttonType={BUTTON_TYPES.red} onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              buttonType={
                formik.isValid ? BUTTON_TYPES.green : BUTTON_TYPES.disabled
              }
              type={'submit'}
            >
              Guargar
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="justify-cente my-4 flex flex-row">
      <NavType />
    </div>
  );
};

export default ServicesFormNav;
