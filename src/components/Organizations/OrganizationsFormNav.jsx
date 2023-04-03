import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

//Components
import Button from '../../CustomComponents/Button/Button.component';
import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';

//Constants
import { ORGANIZATIONS_FORM_TYPE } from './OrganizationsForm';

function OrganizationsFormNav({
  formik,
  formType,
  handleEditar,
  handleCancelEdit,
  handleBorrar,
  handleCancelBorrar,
  handleDeleteOrganization,
}) {
  // State for the delete confirmation button
  const [borrarConfirmationButton, setBorrarConfirmationButton] =
    useState(false);

  // Get the path from the URL
  const path = useLocation().pathname;

  // Set "Boton Borrar" to true if path includes "/dashboard/organizations/delete/
  useEffect(() => {
    setBorrarConfirmationButton(false);
    if (path.includes('/dashboard/organizations/delete/')) {
      setBorrarConfirmationButton(true);
    }
  }, [path]);

  // Render the correct button depending on the form type
  const NavType = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.register:
        return (
          <Button
            buttonType={
              formik.isValid ? BUTTON_TYPES.main : BUTTON_TYPES.disabled
            }
            type={'submit'}
          >
            Registrar
          </Button>
        );
      case ORGANIZATIONS_FORM_TYPE.edit:
        return (
          <div className="flex w-full justify-center">
            <Button buttonType={BUTTON_TYPES.main} onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button
              buttonType={
                formik.isValid ? BUTTON_TYPES.green : BUTTON_TYPES.disabled
              }
              type={'submit'}
            >
              Guardar
            </Button>
          </div>
        );
      case ORGANIZATIONS_FORM_TYPE.detail:
        return (
          <div className="flex h-full w-full items-center justify-center">
            {!borrarConfirmationButton ? (
              <div
                id="organizations_detail_button_container"
                className="flex h-full w-full items-end justify-center"
              >
                <Button
                  buttonType={BUTTON_TYPES.main}
                  onClick={handleEditar}
                  type={'button'}
                >
                  Editar
                </Button>
                <Button
                  buttonType={BUTTON_TYPES.red}
                  onClick={handleBorrar}
                  type={'button'}
                >
                  Borrar
                </Button>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <p className="mb-4 text-xl text-purple-500">
                  ¿Esta seguro que desea eliminar esta empresa?
                </p>
                <div
                  id="organizations_detail_button_container"
                  className="flex h-full w-full items-end justify-center"
                >
                  <Button
                    buttonType={BUTTON_TYPES.main}
                    onClick={handleCancelBorrar}
                  >
                    Cancelar
                  </Button>
                  <Button
                    buttonType={BUTTON_TYPES.warning}
                    onClick={handleDeleteOrganization}
                  >
                    Borrar
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
    }
  };
  return <div className="justify-cente my-4 flex flex-row">{<NavType />}</div>;
}

export default OrganizationsFormNav;
