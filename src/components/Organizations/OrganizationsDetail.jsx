import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDeleteOrganizationMutation } from '../../redux/modular/api/organizations.slice';
import Button from '../../CustomComponents/Button/Button.component';
import DetailElement from '../../CustomComponents/Texts/DetailElement.component';

function OrganizationsDetail({ data }) {
  const [borrarConfirmation, setBorrarConfirmation] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const {
    organization_id,
    short_name,
    business_name,
    country,
    state,
    city,
    street,
    address,
    postal_code,
    address_references,
    business_phone,
    email,
  } = data;

  const organizationsDetailElements = [
    {
      title: 'ID',
      value: organization_id,
    },
    {
      title: 'Nombre de la Empresa',
      value: business_name,
    },
    {
      title: 'Nombre Corto',
      value: short_name,
    },
    {
      title: 'Pais',
      value: country,
    },
    {
      title: 'Provincia',
      value: state,
    },
    {
      title: 'Ciudad',
      value: city,
    },
    {
      title: 'Calle',
      value: street,
    },
    {
      title: 'Direccion',
      value: address,
    },
    {
      title: 'Codigo Postal',
      value: postal_code,
    },
    {
      title: 'Referencia',
      value: address_references,
    },
    {
      title: 'Telefono',
      value: business_phone,
    },
    {
      title: 'E-mail',
      value: email,
    },
  ];

  const [
    DeleteOrganization,
    { isSuccess: isSuccessDeletion, isLoading: isLoadingDeletion },
  ] = useDeleteOrganizationMutation();

  console.log('useLocation: ', useLocation());

  // Functionality for /dashboard/organizations/delete/:${id} path

  useEffect(() => {
    if (path.includes('/dashboard/organizations/delete/')) {
      setBorrarConfirmation(true);
    } else {
      setBorrarConfirmation(false);
    }
    console.log('--- borrarConfirmation: ', borrarConfirmation);
  }, [path]);

  const handleBorrarConfirmation = () => {
    const id = organization_id;
    navigate(`/dashboard/organizations/delete/:${id}`);
  };

  const handleCancelBorrar = () => {
    navigate(`/dashboard/organizations`);
  };

  const handleDeleteOrganization = () => {
    const target = { id: organization_id };
    DeleteOrganization(target);
    isSuccessDeletion &&
      localStorage.clear() &&
      setTimeout(() => {
        navigate('/');
      }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="mt-6 text-3xl text-purple-500">
        Detalles de la Empresa -{' '}
        <span className="text-amber-500 underline underline-offset-8">
          {business_name}
        </span>
      </h1>
      <div
        id="organizations_detail_elements_container"
        className="flex h-3/4 w-full flex-col flex-wrap py-8 text-left"
      >
        {organizationsDetailElements.map((element, index) => (
          <DetailElement
            key={`${index}-${element.title}`}
            title={element.title}
            value={element.value}
          />
        ))}
      </div>
      {!borrarConfirmation ? (
        <div
          id="organizations_detail_button_container"
          className="flex h-full w-full items-end justify-center"
        >
          <Button buttonType="main">Editar</Button>
          <Button buttonType="warning" onClick={handleBorrarConfirmation}>
            Borrar
          </Button>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-center">
          <p className="text-purple-500">
            ¿Esta seguro que desea eliminar esta empresa?
          </p>
          <div
            id="organizations_detail_button_container"
            className="flex h-full w-full items-end justify-center"
          >
            <Button buttonType="green" onClick={handleCancelBorrar}>
              Cancelar
            </Button>
            <Button buttonType="warning" onClick={handleDeleteOrganization}>
              Borrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationsDetail;
