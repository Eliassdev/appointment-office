import React from 'react';

import { useNavigate } from 'react-router-dom';

// Components
import InputElement from '../../CustomComponents/Inputs/InputElement.component';
import ServicesFormNav from './ServicesFormNav';

const ServicesForm = () => {
  const navigate = useNavigate();

  // --- Handle functions ---
  // Handle cancel button
  const handleCancel = () => navigate('/dashboard/services');

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
        <ServicesFormNav handleCancel={handleCancel} />
      </div>
    </form>
  );
};

export default ServicesForm;
