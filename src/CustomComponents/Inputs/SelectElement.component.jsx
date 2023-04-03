import React from 'react';

import InputElement from './InputElement.component';

import { ORGANIZATIONS_FORM_TYPE } from '../../components/Organizations/OrganizationsForm';

const SelectElement = ({
  title,
  name,
  id,
  formType,
  value,
  defaultValue,
  countries,
  states,
  onChange,
  onBlur,
  touched,
  errors,
}) => {
  const SelectType = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.register:
      case ORGANIZATIONS_FORM_TYPE.edit:
        return (
          <div className="mb-2 flex flex-col px-4">
            <label className="mb-1 text-neutral-100" htmlFor="country">
              {title}
            </label>
            <select
              name={name}
              id={id}
              className="h-8 w-full rounded border-transparent bg-neutral-700  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              {id === 'country' ? (
                <>
                  <option defaultValue={defaultValue}>
                    {value === '' ? '--Seleccionar Pais--' : value}
                  </option>
                  {countries.map((countrie) => (
                    <option key={countrie.isoCode} value={countrie.name}>
                      {countrie.name}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  <option defaultValue={defaultValue}>
                    {value === '' ? '--Seleccionar Provincia--' : value}
                  </option>
                  {states.length !== 0
                    ? states.map((state) => (
                        <option key={state.isoCode} value={state.name}>
                          {state.name}
                        </option>
                      ))
                    : null}
                </>
              )}
            </select>
            {touched && errors ? (
              <span className="text-red-600">{errors}</span>
            ) : null}
          </div>
        );
      case ORGANIZATIONS_FORM_TYPE.detail:
        return (
          <InputElement
            title={title}
            name={name}
            type={'text'}
            formType={formType}
            id={id}
            value={value}
          />
        );
    }
  };
  return <SelectType />;
};

export default SelectElement;
