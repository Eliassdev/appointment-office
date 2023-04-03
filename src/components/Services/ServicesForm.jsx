import React from 'react';

// Components
import Button from '../../CustomComponents/Button/Button.component';
import InputElement from '../../CustomComponents/Inputs/InputElement.component';

import { BUTTON_TYPES } from '../../CustomComponents/Button/Button.component';

const ServicesForm = () => {
  return (
    <form className="flex h-auto w-full flex-col rounded-md bg-neutral-900 px-10 py-8">
      <div className=" mt-2 grid grid-cols-1">
        <InputElement
          title={'Nombre del Servicio'}
          name={'service_name'}
          id={'service_name'}
          type={'text'}
        />
        <InputElement
          title={'Valor del Servicio'}
          name={'service_price'}
          id={'service_price'}
          type={'number'}
        />
        <InputElement
          title={'Duracion del Servicio'}
          name={'service_duration'}
          id={'service_duration'}
          type={'time'}
        />
        <div className="justify-cente my-4 flex flex-row">
          <div className="flex w-full justify-center">
            <Button buttonType={BUTTON_TYPES.green}>Enviar</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServicesForm;
