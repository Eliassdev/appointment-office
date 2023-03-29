import React from 'react';
import Button from '../../CustomComponents/Button/Button.component';
import DetailElement from '../../CustomComponents/Texts/DetailElement.component';

function OrganizationsDetail({ data }) {
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
        {organizationsDetailElements.map((element) => (
          <DetailElement title={element.title} value={element.value} />
        ))}
      </div>
      <div
        id="organizations_detail_button_container"
        className="flex h-full w-full items-end justify-center"
      >
        <Button buttonType="main">Editar</Button>
        <Button buttonType="warning">Borrar</Button>
      </div>
    </div>
  );
}

export default OrganizationsDetail;
