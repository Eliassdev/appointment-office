import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteOrganizationMutation } from '../../redux/modular/api/organizations.slice';
import Button from '../../CustomComponents/Button/Button.component';
import DetailElement from '../../CustomComponents/Texts/DetailElement.component';

function OrganizationsDetail({ data }) {
  const [borrar, setBorrar] = useState(false);
  const navigate = useNavigate();
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
  ] = useDeleteOrganizationMutation(organization_id);

  const handleBorrar = () => setBorrar(!borrar);
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
      {!borrar ? (
        <div
          id="organizations_detail_button_container"
          className="flex h-full w-full items-end justify-center"
        >
          <Button buttonType="main">Editar</Button>
          <Button buttonType="warning" onClick={handleBorrar}>
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
            <Button buttonType="green" onClick={handleBorrar}>
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
