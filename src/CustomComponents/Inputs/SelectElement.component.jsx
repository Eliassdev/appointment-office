import InputElement from './InputElement.component';

import { ORGANIZATIONS_FORM_TYPE } from '../../components/Organizations/OrganizationsForm';
import { SERVICES_FORM_TYPE } from '../../components/Services/ServicesForm';

const SelectElement = ({
  title,
  name,
  id,
  formType,
  value,
  defaultValue,
  countries,
  states,
  options,
  onChange,
  onBlur,
  touched,
  errors,
  className,
}) => {
  const SelectType = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.create:
      case ORGANIZATIONS_FORM_TYPE.update:
        return (
          <div className="mb-2 flex flex-col px-4">
            <label className="mb-1 text-neutral-100" htmlFor="country">
              {title}
            </label>
            <select
              name={name}
              id={id}
              className="h-8 w-full rounded border-transparent bg-neutral-700 p-2  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              {id === 'country' ? (
                <>
                  <option defaultValue={defaultValue}>
                    {value === '' ? '--Seleccionar Pais--' : value}
                  </option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
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
      case ORGANIZATIONS_FORM_TYPE.read:
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
      case SERVICES_FORM_TYPE.create:
      case SERVICES_FORM_TYPE.update:
      default:
        return (
          <div className={`mb-2 flex flex-col px-4 ${className}`}>
            <label className="mb-1 text-neutral-100" htmlFor="country">
              {title}
            </label>
            <select
              name={name}
              id={id}
              className="h-8 w-full rounded border-transparent bg-neutral-700 p-2  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              {name === 'branch_id' ? (
                <>
                  <option>
                    {!value ? '--Seleccione una opcion--' : value}
                  </option>
                  {options?.map((option, index) => (
                    <option
                      key={`${option}-${index}`}
                      id={option.branch_id}
                      value={option.branch_name}
                    >
                      {option.branch_name}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  <option>
                    {value === '' ? '--Seleccione una opcion--' : value}
                  </option>
                  {options?.map((option, index) => (
                    <option
                      key={`${option}-${index}`}
                      id={option.stylist_id}
                      value={option.stylist_firstname}
                    >
                      {option.stylist_firstname}
                    </option>
                  ))}
                </>
              )}
            </select>
            {touched && errors ? (
              <span className="text-red-600">{errors}</span>
            ) : null}
          </div>
        );
    }
  };
  return <SelectType />;
};

export default SelectElement;
