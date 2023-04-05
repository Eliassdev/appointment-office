import React from 'react';

//Components
import Button from '../../CustomComponents/Button/Button.component';
import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';

const ServicesFormNav = ({ handleCancel, formik }) => {
  return (
    <div className="justify-cente my-4 flex flex-row">
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
    </div>
  );
};

export default ServicesFormNav;
