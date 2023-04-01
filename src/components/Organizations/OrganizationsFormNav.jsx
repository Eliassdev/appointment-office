import React from 'react';

//Components
import Button from '../../CustomComponents/Button/Button.component';

//Constants
import { ORGANIZATIONS_FORM_TYPE } from './OrganizationsForm';

function OrganizationsFormNav({ formik, formType, handleCancelEdit }) {
  const NavType = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.register:
        return (
          <Button
            buttonType={formik.isValid ? 'main' : 'disabled'}
            type={'submit'}
          >
            Registrar
          </Button>
        );
      case ORGANIZATIONS_FORM_TYPE.edit:
        return (
          <div className="flex w-full justify-center">
            <Button buttonType={'green'} onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button
              buttonType={formik.isValid ? 'main' : 'disabled'}
              type={'submit'}
            >
              Guardar
            </Button>
          </div>
        );
    }
  };
  return <div className="flex flex-row justify-center">{<NavType />}</div>;
}

export default OrganizationsFormNav;
