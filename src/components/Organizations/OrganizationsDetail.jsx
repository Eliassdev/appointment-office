import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeleteOrganizationMutation } from '../../redux/modular/api/organizations.slice';
import Button from '../../CustomComponents/Button/Button.component';
import DetailElement from '../../CustomComponents/Texts/DetailElement.component';

function OrganizationsDetail({ orgData }) {
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
  } = orgData;

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

  // Functionality for /dashboard/organizations/delete/:${id} path
  useEffect(() => {
    if (path.includes('/dashboard/organizations/delete/')) {
      setBorrarConfirmation(true);
    }
  }, [path]);

  const handleEditar = () => {
    const id = organization_id;
    navigate(`/dashboard/organizations/update/:${id}`);
  };

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
    if (isSuccessDeletion) {
      localStorage.clear();
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-neutral-900 px-10 pt-4 pb-4">
      <h1 className="flex-1 text-center text-2xl font-bold text-purple-500">
        Detalle de la Empresa -{' '}
        <span className="text-amber-500 underline underline-offset-8">
          {business_name}
        </span>
      </h1>
      <div
        id="organizations_detail_elements_container"
        className="flex h-3/4 w-full flex-1 flex-col flex-wrap py-8 text-left"
      >
        {organizationsDetailElements.map((element, index) => (
          <DetailElement
            key={`${index}-${element.title}`}
            title={element.title}
            value={element.value}
          />
        ))}
      </div>
      <div className="flex-1">
        {!borrarConfirmation ? (
          <div
            id="organizations_detail_button_container"
            className="flex h-full w-full items-end justify-center"
          >
            <Button buttonType="main" onClick={handleEditar}>
              Editar
            </Button>
            <Button buttonType="red" onClick={handleBorrarConfirmation}>
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
    </div>
  );
}

export default OrganizationsDetail;
