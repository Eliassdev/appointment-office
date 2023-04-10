import React from 'react';

// React Router Dom
import { useNavigate } from 'react-router-dom';

//Components
import ServicesForm from './ServicesForm';

const ServicesCreate = () => {
  return (
    <div className=" flex h-full w-full bg-neutral-800 px-12">
      <div className="w-full py-8">
        <h1 className="mb-8 text-center text-2xl font-bold text-purple-500">
          Crear Servicio
        </h1>
        <ServicesForm />
      </div>
    </div>
  );
};

export default ServicesCreate;
