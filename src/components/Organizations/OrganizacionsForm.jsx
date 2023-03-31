import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Redux
import {
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
} from '../../redux/modular/api/organizations.slice';

//Formik
import { useFormik } from 'formik';

//Zod
import { organizationValidation } from '../../schemas/organization.schema';

//Country State City
import { City, Country, State } from 'country-state-city';
import useCountryState from '../../hooks/useCountryState.hook';

//Components
import Button from '../../CustomComponents/Button/Button.component';

export const ORGANIZATIONS_FORM_TYPE = {
  register: 'register',
  edit: 'edit',
};

const OrganizationForm = ({ formType, orgData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const allCountries = Country.getAllCountries();

  // Country State
  const { countries, states, selectedCountry, handleCountryChange } =
    useCountryState();

  // Create Organization Mutation
  const [CreateOrganization, { data, isLoading, isSuccess }] =
    useCreateOrganizationMutation();

  // Update Organization Mutation
  const [UpdateOrganization, { data: dataUpdate, isLoading: isLoadingUpdate }] =
    useUpdateOrganizationMutation();

  // Formik configuration

  // Formik initial values
  const initialFormikValues = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.register:
        return {
          short_name: '',
          business_name: '',
          country: '',
          state: '',
          city: '',
          street: '',
          address: '',
          postal_code: '',
          address_references: '',
          business_phone: '',
          email: '',
          latitude: 39.0,
          longitude: -12.0,
          created_by: 1,
          updated_by: 1,
        };
      case ORGANIZATIONS_FORM_TYPE.edit:
        return {
          ...orgData,
        };
      default:
        return {
          short_name: '',
          business_name: '',
          country: '',
          state: '',
          city: '',
          street: '',
          address: '',
          postal_code: '',
          address_references: '',
          business_phone: '',
          email: '',
          latitude: 39.0,
          longitude: -12.0,
          created_by: 1,
          updated_by: 1,
        };
    }
  };

  // Formik submit function
  const formikSubmit = () => {
    switch (formType) {
      case ORGANIZATIONS_FORM_TYPE.register:
        return async (values) => {
          let body = values;
          let countryName = countries.find(
            (country) => country.isoCode === body.country
          );
          let stateName = states.find((state) => state.isoCode === body.state);
          body.country = countryName.name;
          body.state = stateName.name;
          console.log(body);
          CreateOrganization(body);
          console.log(data);
        };

      case ORGANIZATIONS_FORM_TYPE.edit:
        return async (values) => {
          let body = values;
          let countryName = countries.find(
            (country) => country.isoCode === body.country
          );
          let stateName = states.find((state) => state.isoCode === body.state);
          body.country = countryName.name;
          body.state = stateName.name;
          const request = {
            id: id,
            info: body,
          };
          UpdateOrganization(request);
        };
    }
  };

  const formik = useFormik({
    initialValues: initialFormikValues(),
    onSubmit: formikSubmit(),
    validate: (values) => {
      const result = organizationValidation.safeParse(values);
      if (result.success) return;
      if (result.error.issues) {
        const errors = {};
        result.error.issues.map((err) => {
          errors[err.path[0]] = err.message;
        });
        return errors;
      }
    },
  });

  // Function to extract the number from a string - Basura
  function getNumberFromString(s) {
    // Define the regular expression
    const regex = /(\d+)/;

    // Extract the number from the string
    const match = s.match(regex);

    // Return the number as a string or null if no match was found
    return match ? match[0] : null;
  }

  const handleCancelEdit = () => {
    navigate('/dashboard/organizations');
  };

  useEffect(() => {
    if (formik.values.country !== '') {
      setTimeout(() => {
        handleCountryChange(formik.values.country);
      }, 500);
    }
    if (isSuccess) {
      let id = getNumberFromString(data.message);
      localStorage.setItem('organizationId', id);
      console.log(data);
      setTimeout(() => {
        navigate('/dashboard/');
      }, 1000);
    }
  }, [formik.values.country, isSuccess]);

  return (
    <div className=" flex h-full w-full bg-neutral-800 px-12">
      <div className="w-full py-8">
        <form
          onSubmit={formik.handleSubmit}
          className="flex h-auto w-full flex-col bg-neutral-900 px-10 pt-4 pb-4"
        >
          {formType === ORGANIZATIONS_FORM_TYPE.register ? (
            <legend className="pl-4 text-center text-2xl font-bold text-purple-500">
              Registra tu Empresa
            </legend>
          ) : (
            <legend className="pl-4 text-center text-2xl font-bold text-purple-500">
              Editar datos de tu Empresa
            </legend>
          )}

          <div className=" mt-2 grid grid-cols-2">
            <div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="short_name">
                  Nombre Corto
                </label>
                <input
                  name="short_name"
                  type="text"
                  id="short_name"
                  className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.short_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.short_name && formik.errors.short_name ? (
                  <span className="text-red-600">
                    {formik.errors.short_name}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label
                  className="mb-1 text-neutral-100"
                  htmlFor="business_name"
                >
                  Nombre de la Empresa
                </label>
                <input
                  name="business_name"
                  type="text"
                  id="business_name"
                  className=" h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.business_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.business_name && formik.errors.business_name ? (
                  <span className="text-red-600">
                    {formik.errors.business_name}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="country">
                  Pais
                </label>
                <select
                  name="country"
                  id="country"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue="">--Seleccionar Pais--</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {formik.touched.country && formik.errors.country ? (
                  <span className="text-red-600">{formik.errors.country}</span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="state">
                  Provincia
                </label>
                <select
                  name="state"
                  id="state"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option defaultValue="">--Seleccionar Provincia--</option>
                  {states.length !== 0
                    ? states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))
                    : null}
                </select>
                {formik.touched.state && formik.errors.state ? (
                  <span className="text-red-600">{formik.errors.state}</span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="city">
                  Ciudad
                </label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city ? (
                  <span className="text-red-600">{formik.errors.city}</span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="street">
                  Calle
                </label>
                <input
                  name="street"
                  type="text"
                  id="street"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.street && formik.errors.street ? (
                  <span className="text-red-600">{formik.errors.street}</span>
                ) : null}
              </div>
            </div>
            <div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="address">
                  Direccion
                </label>
                <input
                  name="address"
                  type="text"
                  id="address"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? (
                  <span className="text-red-600">{formik.errors.address}</span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="postal_code">
                  CP
                </label>
                <input
                  name="postal_code"
                  type="text"
                  id="postal_code"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.postal_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.postal_code && formik.errors.postal_code ? (
                  <span className="text-red-600">
                    {formik.errors.postal_code}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label
                  className="mb-1 text-neutral-100"
                  htmlFor="address_references"
                >
                  Otras Referencia
                </label>
                <input
                  name="address_references"
                  type="text"
                  id="address_references"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.address_references}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address_references &&
                formik.errors.address_references ? (
                  <span className="text-red-600">
                    {formik.errors.address_references}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label
                  className="mb-1 text-neutral-100"
                  htmlFor="business _phone"
                >
                  Telefono
                </label>
                <input
                  name="business_phone"
                  type="tel"
                  id="business_phone"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.business_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.business_phone &&
                formik.errors.business_phone ? (
                  <span className="text-red-600">
                    {formik.errors.business_phone}
                  </span>
                ) : null}
              </div>
              <div className="mb-2 flex flex-col px-4">
                <label className="mb-1 text-neutral-100" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="text-red-600">{formik.errors.email}</span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            {formType === ORGANIZATIONS_FORM_TYPE.register ? (
              <Button
                buttonType={!formik.isValid ? 'disabled' : 'main'}
                type={'submit'}
              >
                Registrar
              </Button>
            ) : (
              <div className="flex w-full justify-center">
                <Button buttonType={'green'} onClick={handleCancelEdit}>
                  Cancelar
                </Button>
                <Button
                  buttonType={!formik.isValid ? 'disabled' : 'main'}
                  type={'submit'}
                >
                  Guardar
                </Button>
              </div>
            )}
          </div>
        </form>
        <div
          className={`mt-4 flex h-auto w-full flex-col px-10 pt-4 pb-4 ${
            !isLoading && !isSuccess ? 'transparent' : ' bg-neutral-900'
          }`}
        >
          {isLoading ? <p className="text-yellow-300">Enviando</p> : null}
          {isSuccess ? (
            <p className="text-green-500">Creado con exito</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
